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

from playwright.sync_api import sync_playwright


ROOT = pathlib.Path(__file__).resolve().parents[1]
ARTIFACT_DIR = ROOT / ".artifacts"


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
    offenders = page.evaluate(
        """width => [...document.querySelectorAll('body *')]
        .map(el => ({tag: el.tagName, className: String(el.className), text: (el.textContent || '').trim().slice(0, 60), rect: el.getBoundingClientRect().toJSON()}))
        .filter(item => item.rect.right > width + 1 || item.rect.left < -1)
        .slice(0, 10)""",
        width,
    )
    assert overflow <= 1, f"horizontal overflow at {width}px: {overflow}px; {offenders}"
    assert page.locator('[data-contact="whatsapp"][data-location="hero"]').is_visible()
    assert page.locator('[data-contact="phone"][data-location="hero"]').is_visible()
    floating = page.locator('[data-location="floating_whatsapp"]')
    assert floating.is_visible()
    assert floating.evaluate("el => getComputedStyle(el).position") == "fixed"
    floating_box = floating.bounding_box()
    assert floating_box and floating_box["width"] >= 56 and floating_box["height"] >= 56
    assert width - (floating_box["x"] + floating_box["width"]) >= 0
    assert height - (floating_box["y"] + floating_box["height"]) >= 0
    assert floating.locator("svg").count() == 1
    floating.focus()
    assert floating.evaluate("el => getComputedStyle(el).outlineStyle") == "solid"
    assert page.evaluate(
        "[...document.querySelectorAll('.person-card')].every(el => el.getBoundingClientRect().height <= 170)"
    )
    if width <= 720:
        for location in ("hero",):
            for method in ("whatsapp", "phone"):
                box = page.locator(
                    f'[data-contact="{method}"][data-location="{location}"]'
                ).bounding_box()
                assert box and box["y"] + box["height"] <= height
        assert page.locator(".mobile-contact").is_visible()
        mobile_box = page.locator(".mobile-contact").bounding_box()
        assert mobile_box and floating_box["y"] + floating_box["height"] < mobile_box["y"]
    else:
        assert not page.locator(".mobile-contact").is_visible()
    page.evaluate("window.scrollTo(0, document.documentElement.scrollHeight)")
    page.wait_for_timeout(50)
    scrolled_box = floating.bounding_box()
    assert scrolled_box and abs(scrolled_box["x"] - floating_box["x"]) <= 1
    assert abs(scrolled_box["y"] - floating_box["y"]) <= 1
    footer_links = page.locator(".footer-nav").bounding_box()
    assert footer_links and not (
        scrolled_box["x"] < footer_links["x"] + footer_links["width"]
        and scrolled_box["x"] + scrolled_box["width"] > footer_links["x"]
        and scrolled_box["y"] < footer_links["y"] + footer_links["height"]
        and scrolled_box["y"] + scrolled_box["height"] > footer_links["y"]
    )
    if width in (390, 1440):
        page.screenshot(
            path=str(ARTIFACT_DIR / f"landing-{width}.png"),
            full_page=True,
        )


def main() -> None:
    ARTIFACT_DIR.mkdir(exist_ok=True)
    with local_site() as base_url, sync_playwright() as playwright:
        browser = playwright.chromium.launch()

        no_js = browser.new_context(java_script_enabled=False)
        page = no_js.new_page()
        page.goto(base_url)
        whatsapp_links = page.locator('[data-contact="whatsapp"]')
        phone_links = page.locator('[data-contact="phone"]')
        email_links = page.locator('[data-contact="email"]')
        assert whatsapp_links.count() == 9
        assert all(link.get_attribute("href").startswith("https://wa.me/905340382335?text=") for link in whatsapp_links.all())
        assert page.locator('[data-location="floating_whatsapp"]').get_attribute("aria-label") == "WhatsApp ile iletişime geç"
        assert all(link.get_attribute("href") == "tel:+905340382335" for link in phone_links.all())
        assert all(link.get_attribute("href") == "mailto:aliasadi3853@gmail.com" for link in email_links.all())
        no_js.close()

        context = browser.new_context()
        google_requests: list[str] = []
        video_requests: list[str] = []
        page = context.new_page()
        page.on("request", lambda request: google_requests.append(request.url) if "google" in request.url else None)
        page.on("request", lambda request: video_requests.append(request.url) if request.url.endswith(".mp4") else None)
        for width, height in ((360, 800), (390, 844), (768, 1024), (1440, 1000)):
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
        assert page.locator("[data-project-image]").count() == 5
        assert page.evaluate(
            "[...document.querySelectorAll('.project-media img, .video-stage > img')].every(el => getComputedStyle(el).filter === 'none')"
        )
        assert page.evaluate(
            "document.querySelector('#services').compareDocumentPosition(document.querySelector('#experiences')) & Node.DOCUMENT_POSITION_FOLLOWING"
        )
        assert page.locator(".person-avatar").count() == 2
        assert page.evaluate(
            "[...document.querySelectorAll('.person-avatar')].every(el => Math.abs(el.getBoundingClientRect().width - el.getBoundingClientRect().height) <= 1)"
        )
        assert video_requests == [], f"video downloaded before playback: {video_requests}"
        assert not page.locator("[data-consent]").is_visible()
        assert google_requests == [], f"unexpected Google request with blank config: {google_requests}"
        page.locator('[data-lang="en"]').click()
        assert page.locator("h1").inner_text() == "We build websites and software for your business."
        assert page.locator('[data-location="floating_whatsapp"]').get_attribute("aria-label") == "Contact us on WhatsApp"
        three_a_card = page.locator('.project-card:has(.project-media[data-project="3a-jewellery"])')
        three_a_type = three_a_card.locator(".project-type").text_content()
        assert three_a_type == "Product showcase", f"unexpected EN 3A type: {three_a_type!r}"
        assert "WhatsApp" in three_a_card.locator('[data-i18n="project3a"]').inner_text()
        assert page.evaluate("new URL(document.querySelector('[data-location=hero][data-contact=whatsapp]').href).searchParams.get('text')") == "Hello, I would like to discuss a project and get a quote. My requirements: "
        assert all(link.get_attribute("href").startswith("https://wa.me/905340382335?text=") for link in page.locator('[data-contact="whatsapp"]').all())
        assert all(link.get_attribute("href") == "tel:+905340382335" for link in page.locator('[data-contact="phone"]').all())
        assert all(link.get_attribute("href") == "mailto:aliasadi3853@gmail.com" for link in page.locator('[data-contact="email"]').all())
        page.locator('[data-lang="tr"]').click()
        assert page.locator("h1").inner_text() == "İşletmeniz için web sitesi ve yazılım geliştiriyoruz."
        assert three_a_card.locator(".project-type").text_content() == "Ürün vitrini"
        assert page.evaluate("new URL(document.querySelector('[data-location=hero][data-contact=whatsapp]').href).searchParams.get('text')") == "Merhaba, bir proje hakkında bilgi ve teklif almak istiyorum. İhtiyacım: "
        assert all(link.get_attribute("href").startswith("https://wa.me/905340382335?text=") for link in page.locator('[data-contact="whatsapp"]').all())
        assert all(link.get_attribute("href") == "tel:+905340382335" for link in page.locator('[data-contact="phone"]').all())
        assert all(link.get_attribute("href") == "mailto:aliasadi3853@gmail.com" for link in page.locator('[data-contact="email"]').all())

        for index, broken_image in enumerate(page.locator("[data-project-image]").all()):
            broken_image.evaluate(
                "(image, index) => { image.loading = 'eager'; image.src = `/missing-project-image-${index}.webp`; }",
                index,
            )
            broken_image.wait_for(state="hidden")
            assert broken_image.locator("xpath=preceding-sibling::*[contains(@class, 'project-image-fallback')]").is_visible()

        videos = page.locator("[data-video]")
        assert videos.count() == 2
        page.locator("[data-video-play]").first.click()
        videos.first.wait_for(state="visible")
        page.wait_for_function("video => !video.paused", arg=videos.first.element_handle())
        assert video_requests == [f"{base_url}/assets/videos/web-interface.mp4"]
        page.locator("[data-video-play]").nth(1).click()
        videos.nth(1).wait_for(state="visible")
        page.wait_for_function("video => !video.paused", arg=videos.nth(1).element_handle())
        assert videos.first.evaluate("video => video.paused")
        assert video_requests == [
            f"{base_url}/assets/videos/web-interface.mp4",
            f"{base_url}/assets/videos/mobile-development.mp4",
        ]
        page.locator("#top").scroll_into_view_if_needed()
        page.wait_for_function("video => video.paused", arg=videos.nth(1).element_handle())
        context.close()

        failure_context = browser.new_context()
        failure_page = failure_context.new_page()
        failure_page.goto(base_url)
        for index in range(2):
            failure_page.locator("[data-video]").nth(index).evaluate(
                "(video, index) => { video.dataset.src = `assets/videos/missing-${index}.mp4`; }",
                index,
            )
            failure_page.locator("[data-video-play]").nth(index).click()
            failure_page.locator("[data-video-error]").nth(index).wait_for(state="visible")
            assert failure_page.locator("[data-video-poster]").nth(index).is_visible()
            assert not failure_page.locator("[data-video]").nth(index).is_visible()
        failure_context.close()

        reduced_context = browser.new_context(reduced_motion="reduce")
        reduced_page = reduced_context.new_page()
        reduced_page.goto(base_url)
        reduced_page.locator("[data-video-play]").first.click()
        reduced_page.locator("[data-video]").first.wait_for(state="visible")
        assert reduced_page.locator("[data-video]").first.evaluate("video => video.paused")
        reduced_context.close()

        touch_context = browser.new_context(viewport={"width": 390, "height": 844}, has_touch=True, is_mobile=True)
        touch_page = touch_context.new_page()
        touch_page.goto(base_url, wait_until="networkidle")
        assert touch_page.evaluate(
            "[...document.querySelectorAll('.project-media img, .video-stage > img')].every(el => getComputedStyle(el).filter === 'none')"
        )
        touch_context.close()

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
        assert not consent_page.locator('[data-location="floating_whatsapp"]').is_visible()
        consent_page.locator('[data-location="hero"][data-contact="whatsapp"]').click()
        assert consent_page.evaluate("window.dataLayer") is None
        consent_page.locator("[data-consent-accept]").click()
        assert consent_page.locator("#google-tag-manager").count() == 1
        assert consent_page.locator('[data-location="floating_whatsapp"]').is_visible()
        behavioural = "window.dataLayer.filter(item => item && item.event)"
        assert consent_page.evaluate(behavioural) == []
        consent_page.locator('[data-location="floating_whatsapp"]').click()
        events = consent_page.evaluate(behavioural)
        assert events == [{
            "event": "contact_click",
            "contact_method": "whatsapp",
            "cta_location": "floating_whatsapp",
            "language": "tr",
        }]
        consent_page.locator('[data-location="hero"][data-contact="whatsapp"]').click()
        events = consent_page.evaluate(behavioural)
        assert [event["event"] for event in events] == ["contact_click", "contact_click"]
        assert events[1] == {
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
        assert len([event for event in events if event["event"] == "contact_click"]) == 3
        consent_page.locator("[data-consent-settings]").click()
        assert not consent_page.locator('[data-location="floating_whatsapp"]').is_visible()
        consent_page.locator("[data-consent-reject]").click()
        assert consent_page.locator('[data-location="floating_whatsapp"]').is_visible()
        before = len(consent_page.evaluate(behavioural))
        consent_page.locator('[data-location="hero"][data-contact="phone"]').click()
        assert len(consent_page.evaluate(behavioural)) == before
        consent_context.close()

        browser.close()
        print(json.dumps({
            "status": "ok",
            "widths": [360, 390, 768, 1440],
            "analytics": "consent-gated",
            "previews": [str(ARTIFACT_DIR / "landing-390.png"), str(ARTIFACT_DIR / "landing-1440.png")],
        }))


if __name__ == "__main__":
    main()
