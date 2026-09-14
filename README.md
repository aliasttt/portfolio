# A&M Software — Beylikdüzü Landing Page

Conversion-focused, Turkish-first landing page for `beylikduzuyazilim.com.tr`. It uses HTML, CSS, and vanilla JavaScript with no build step or runtime dependencies.

## Running Locally

Open `index.html` directly in a browser.

For local testing with a simple static server, you can also run:

```text
python -m http.server 8000
```

Then open `http://localhost:8000`.

## Focused browser validation

With the Playwright Python package and Chromium installed:

```text
python tests/browser_smoke.py
```

The smoke test covers 360 px, 768 px, and 1440 px layouts; the bilingual privacy page; no-JavaScript contact links; local image loading; safe outbound links; analytics-disabled network behavior; consent ordering; event duplication; persistence; cookie cleanup; withdrawal/reload; and re-acceptance.

## GitHub Pages Deployment

In your GitHub repository:

```text
Repository -> Settings -> Pages -> Deploy from branch -> main -> /root
```

## Deployment

GitHub Pages is configured manually from the `main` branch and repository root. Feature branches do not represent a production deployment. Review and merge deliberately; do not enable a separate production workflow for a feature branch.

## Content and assets

Team cards use compact HTML/CSS initial avatars. No portrait is presented without an authentic portrait asset.

Portfolio screenshots in `assets/projects/` are optimized captures of the confirmed public project pages. Project descriptions describe the public products and do not claim responsibility for individual features or results.

Illustrative promotional clips and poster images live in `assets/videos/`. Their item-specific source and licence records are documented in [`docs/media-sources.md`](docs/media-sources.md). Video sources are attached only after a visitor activates playback.

## Analytics

Analytics uses a basic-consent implementation. The site loads GTM only after an affirmative analytics choice; denial and withdrawal leave Google measurement fully unloaded after a controlled reload. The confirmed GTM container and GA4 Measurement ID are recorded in `analytics-config.js`, but the GA4 ID is reference-only: GA4 must be configured, previewed and published inside GTM. Do not add a standalone `gtag.js` installation. See [`privacy.html`](privacy.html) and [`docs/analytics-setup.md`](docs/analytics-setup.md) for the public notice, exact event contract, consent boundary and remaining GTM steps.
