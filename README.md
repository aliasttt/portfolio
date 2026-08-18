# A&M Software Landing Page

Static one-page landing website for a two-person software engineering team. It uses only HTML, CSS and vanilla JavaScript, with no build step.

## Running Locally

Open `index.html` directly in a browser.

For local testing with a simple static server, you can also run:

```text
python -m http.server 8000
```

Then open `http://localhost:8000`.

## GitHub Pages Deployment

In your GitHub repository:

```text
Repository -> Settings -> Pages -> Deploy from branch -> main -> /root
```

## Profile Images

Replace these files with optimized WebP portrait images:

```text
assets/ali.webp
assets/mahsun.webp
```

The layout is already configured for portrait photos with `object-fit: cover`.

## Contact Details

Edit the `CONFIG` object at the top of `script.js`:

```javascript
const CONFIG = {
  brandName: "A&M Software",
  whatsappNumber: "905XXXXXXXXX",
  email: "hello@example.com"
};
```

All WhatsApp, email, GitHub and LinkedIn links are generated from this configuration.

## Google Tag Manager

Replace every `GTM-XXXXXXX` placeholder in `index.html` with the real GTM container ID.

Configure analytics through Google Tag Manager:

1. Add the GTM container ID.
2. Configure GA4 inside Google Tag Manager.
3. Configure Google Ads Conversion Tracking inside GTM.
4. Create triggers from the custom `dataLayer` events.

Tracked events include:

```text
generate_lead
whatsapp_click
email_click
phone_click
project_cta_click
portfolio_click
language_change
```

UTM parameters and `gclid` are stored in `sessionStorage` and included with conversion events when available.

The consent banner is available but disabled by default. Set `consentEnabled: true` in `script.js` when you are ready to connect consent behavior to your GTM setup.

## Custom Domain

When moving from the placeholder domain, update:

```text
index.html canonical URL
Open Graph URL and image URL
sitemap.xml
robots.txt sitemap URL
CNAME, if GitHub Pages uses a custom domain
```

## Contact Form

No fake form submission is enabled. If a form is needed later, configure `contactFormEndpoint` in `script.js` and connect a real endpoint such as Formspree, Web3Forms or a custom backend.
