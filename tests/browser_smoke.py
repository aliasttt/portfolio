"""Focused browser checks for the static landing page.

Run from the repository root with:
    python tests/browser_smoke.py

Requires Playwright's Python package and Chromium browser.
"""

from __future__ import annotations

import contextlib
import http.server
import json
import pathlib
import socketserver
import threading
import tempfile

from playwright.sync_api import sync_playwright


ROOT = pathlib.Path(__file__).resolve().parents[1]


class QuietHandler(http.server.SimpleHTTPRequestHandler):
    def log_message(self, _format: str, *_args: object) -> None:
        return


@contextlib.contextmanager
def local_site():
    handler = lambda *args, **kwargs: QuietHandler(*args, directory=ROOT, **kwargs)
    with socketserver.TCPServer(("127.0.0.1", 0), handler) as server:
        thread = threading.Thread(target=server.serve_forever, daemon=True)
        thread.start()
        try:
            yield f"http://127.0.0.1:{server.server_address[1]}"
        finally:
            server.shutdown()
            thread.join()


def assert_layout(page, base_url: str, width: int, height: int) -> None:
    page.set_viewport_size({"width": width, "height": height})
    page.goto(base_url, wait_until="networkidle")
    overflow = page.evaluate("document.documentElement.scrollWidth - document.documentElement.clientWidth")
    assert overflow <= 1, f"horizontal overflow at {width}px: {overflow}px"
    assert page.locator('[data-contact="whatsapp"][data-location="hero"]').is_visible()
    assert page.locator('[data-contact="phone"][data-location="hero"]').is_visible()
    if width <= 720:
        for location in ("hero",):
            for method in ("whatsapp", "phone"):
                box = page.locator(
                    f'[data-contact="{method}"][data-location="{location}"]'
                ).bounding_box()
                assert box and box["y"] + box["height"] <= height
        assert page.locator(".mobile-contact").is_visible()
    else:
        assert not page.locator(".mobile-contact").is_visible()
    if width in (360, 1440):
        page.screenshot(
            path=str(pathlib.Path(tempfile.gettempdir()) / f"am-landing-{width}.png"),
            full_page=True,
        )


def main() -> None:
    with local_site() as base_url, sync_playwright() as playwright:
        browser = playwright.chromium.launch()

        no_js = browser.new_context(java_script_enabled=False)
        page = no_js.new_page()
        page.goto(base_url)
        assert page.locator('[data-location="hero"][data-contact="whatsapp"]').get_attribute("href").startswith(
            "https://wa.me/905340382335?text="
        )
        assert page.locator('[data-location="hero"][data-contact="phone"]').get_attribute("href") == "tel:+905340382335"
        assert page.locator('[data-location="team"][data-contact="email"]').get_attribute("href") == "mailto:aliasadi3853@gmail.com"
        no_js.close()

        context = browser.new_context()
        google_requests: list[str] = []
        page = context.new_page()
        page.on("request", lambda request: google_requests.append(request.url) if "google" in request.url else None)
        for width, height in ((360, 800), (768, 1024), (1440, 1000)):
            assert_layout(page, base_url, width, height)
        for image in page.locator("img").all():
            image.scroll_into_view_if_needed()
            image.evaluate("element => element.decode()")
        assert page.evaluate("[...document.images].every(image => image.complete && image.naturalWidth > 0)")
        assert page.evaluate(
            "[...document.querySelectorAll('[data-project][target=_blank]')].every(link => link.rel.includes('noopener') && link.rel.includes('noreferrer'))"
        )
        assert page.evaluate(
            "['tr','en'].every(lang => [...document.querySelectorAll('[data-i18n]')].every(el => typeof copy[lang][el.dataset.i18n] === 'string'))"
        )
        assert page.evaluate(
            "['tr','en'].every(lang => [...document.querySelectorAll('[data-i18n-aria-label]')].every(el => typeof copy[lang][el.dataset.i18nAriaLabel] === 'string'))"
        )
        assert page.evaluate(
            "['tr','en'].every(lang => [...document.querySelectorAll('[data-i18n-alt]')].every(el => typeof copy[lang][el.dataset.i18nAlt] === 'string'))"
        )
        assert not page.locator("[data-consent]").is_visible()
        assert google_requests == [], f"unexpected Google request with blank config: {google_requests}"
        page.locator('[data-lang="en"]').click()
        assert page.locator("h1").inner_text() == "We build websites and software for your business."
        assert "Hello%2C%20I%20would%20like" in page.locator('[data-location="hero"][data-contact="whatsapp"]').get_attribute("href")
        page.locator('[data-lang="tr"]').click()
        assert page.locator("h1").inner_text() == "İşletmeniz için web sitesi ve yazılım geliştiriyoruz."
        context.close()

        consent_context = browser.new_context()
        consent_page = consent_context.new_page()
        consent_page.add_init_script(
            "document.addEventListener('click', e => { if (e.target.closest('a')) e.preventDefault(); }, true);"
        )
        consent_page.route(
            "**/analytics-config.js",
            lambda route: route.fulfill(
                content_type="application/javascript",
                body=(
                    "window.ANALYTICS_CONFIG={gtmContainerId:'GTM-ABC123',"
                    "privacyPolicyUrl:'https://example.test/privacy',"
                    "consentStorageKey:'smoke_consent'};"
                ),
            ),
        )
        consent_page.route("https://www.googletagmanager.com/**", lambda route: route.fulfill(body=""))
        consent_page.goto(base_url)
        assert consent_page.locator("[data-consent]").is_visible()
        consent_page.locator('[data-location="hero"][data-contact="whatsapp"]').click()
        assert consent_page.evaluate("window.dataLayer") is None
        consent_page.locator("[data-consent-accept]").click()
        assert consent_page.locator("#google-tag-manager").count() == 1
        behavioural = "window.dataLayer.filter(item => item && item.event)"
        assert consent_page.evaluate(behavioural) == []
        consent_page.locator('[data-location="hero"][data-contact="whatsapp"]').click()
        events = consent_page.evaluate(behavioural)
        assert [event["event"] for event in events] == ["contact_click"]
        assert events[0] == {
            "event": "contact_click",
            "contact_method": "whatsapp",
            "cta_location": "hero",
            "language": "tr",
        }
        consent_page.locator('[data-lang="en"]').click()
        consent_page.locator('[data-lang="tr"]').click()
        consent_page.locator('[data-lang="en"]').click()
        assert len(consent_page.evaluate("window.dataLayer.filter(item => item && item.event === 'language_change')")) == 3
        consent_page.locator('[data-service="web"]').click()
        events = consent_page.evaluate(behavioural)
        assert len([event for event in events if event["event"] == "service_interest"]) == 1
        assert len([event for event in events if event["event"] == "contact_click"]) == 2
        consent_page.locator("[data-consent-settings]").click()
        consent_page.locator("[data-consent-reject]").click()
        before = len(consent_page.evaluate(behavioural))
        consent_page.locator('[data-location="hero"][data-contact="phone"]').click()
        assert len(consent_page.evaluate(behavioural)) == before
        consent_context.close()

        browser.close()
        print(json.dumps({"status": "ok", "widths": [360, 768, 1440], "analytics": "consent-gated"}))


if __name__ == "__main__":
    main()
