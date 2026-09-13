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

The smoke test covers 360 px, 768 px, and 1440 px layouts; no-JavaScript contact links; TR/EN switching; local image loading; safe outbound links; analytics-disabled network behavior; consent gating; event duplication; and withdrawal.

## GitHub Pages Deployment

In your GitHub repository:

```text
Repository -> Settings -> Pages -> Deploy from branch -> main -> /root
```

## Deployment

GitHub Pages is configured manually from the `main` branch and repository root. Feature branches do not represent a production deployment. Review and merge deliberately; do not enable a separate production workflow for a feature branch.

## Content and assets

Team images live in:

```text
assets/ali.webp
assets/mahsun.webp
```

Portfolio screenshots in `assets/projects/` are optimized captures of the confirmed public project pages. Project descriptions describe the public products and do not claim responsibility for individual features or results.

## Analytics

Analytics is intentionally disabled. Future IDs belong only in `analytics-config.js`; do not add placeholder IDs or direct Google tags. See [`docs/analytics-setup.md`](docs/analytics-setup.md) for the event contract, consent boundary, phase 2 requirements, and verification checklist.
