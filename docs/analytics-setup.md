# Analytics and consent setup

Phase 1 prepares an analytics boundary but does not connect to Google. No Google Tag Manager (GTM), Google Analytics 4 (GA4), Google Ads, or Search Console account currently exists, and the repository contains no placeholder measurement ID.

## Configuration location

All future browser-side analytics configuration is in `analytics-config.js`:

```js
window.ANALYTICS_CONFIG = Object.freeze({
  gtmContainerId: "",
  privacyPolicyUrl: "",
  consentStorageKey: "am_analytics_consent_v1"
});
```

External analytics stays disabled unless both of these checks pass:

- `gtmContainerId` is a syntactically valid real GTM container ID.
- `privacyPolicyUrl` is an absolute HTTP(S) URL to completed privacy information.

With either value absent or invalid, the site does not load GTM, does not show a meaningless cookie banner, and does not queue behavioural events for later replay.

## dataLayer event contract

Events are pushed only after a visitor grants analytics consent. Parameters use stable identifiers and never include contact destinations, user-written messages, email addresses, phone numbers, or query strings.

| Event | Parameters | Meaning |
| --- | --- | --- |
| `contact_click` | `contact_method`: `whatsapp`, `phone`, or `email`; `cta_location`; `language` | The visitor deliberately clicked a contact action. |
| `portfolio_click` | `project_id`; `language` | The visitor deliberately opened a portfolio link. |
| `service_interest` | `service_id`: `web`, `mobile`, or `custom_software`; `language` | The visitor clicked a service-specific enquiry action. |
| `language_change` | `from_language`; `language` | The visitor deliberately changed the site language. |

The website sends each event through `dataLayer.push()` only. Do not also send the same action directly with `gtag('event', ...)`.

`contact_click` is an intent signal. It does not prove that a WhatsApp message was sent, a call was answered, an email was delivered, or a qualified lead was created. Do not map it directly to a confirmed-lead label without a separate, verifiable downstream signal.

## Consent boundary

The prepared implementation uses a basic consent approach:

- GTM does not load before an affirmative choice.
- Consent defaults are queued before the container is loaded, then updated for the granted choice.
- Rejected visitors are not tracked.
- Pre-consent interactions are discarded rather than replayed after acceptance.
- The footer preference control lets a visitor reject after previously accepting. The denial update prevents further site events from being pushed.
- Storage access is wrapped so blocked or unavailable `localStorage` does not break navigation or contact links.

Before activation, choose and configure an appropriate consent management platform (CMP) or complete a legal review of the custom preference UI. Google recommends consent defaults before measurement commands and consent updates when the visitor changes their choice. For GTM-managed consent, use GTM consent APIs or a suitable CMP template rather than Custom HTML consent commands.

Official references:

- [Set up consent mode on websites](https://developers.google.com/tag-platform/security/guides/consent)
- [Consent mode overview](https://developers.google.com/tag-platform/security/concepts/consent-mode)
- [The data layer](https://developers.google.com/tag-platform/tag-manager/datalayer)

## Phase 2 account setup

The following real, user-owned items are required:

1. A Google account with appropriate business ownership and access.
2. A GTM web container for `beylikduzuyazilim.com.tr` and its real `GTM-...` container ID.
3. A GA4 property and web data stream for the canonical HTTPS domain, including the real measurement ID and agreed data-retention, Google Signals, and ads-personalisation settings.
4. A Google Ads account only if advertising will run, with billing, conversion goals, campaign geography, language, budget, and final URLs reviewed by the owner. No campaign or spend is part of phase 1.
5. A Search Console domain property verified through a DNS record controlled by the domain owner; then submit `https://beylikduzuyazilim.com.tr/sitemap.xml`.
6. Completed privacy/cookie information at a stable public URL, including the actual controller/contact details, tools used, purposes, legal basis, retention, recipients/transfers, and visitor rights as approved by the responsible legal adviser.
7. A selected CMP or approved consent design, consent categories, regional behaviour, withdrawal flow, and retention period for the preference record.
8. GTM tags, variables, custom-event triggers, consent checks, environments, and publishing access. Preview and approve the container before any production publication.
9. A measurement plan deciding which click-intent events, if any, become GA4 key events or Google Ads conversions. Confirmed leads require a separate CRM or server-side outcome source.

After those items exist, add only the real GTM container ID and completed privacy URL to `analytics-config.js`. Configure GA4 and Ads inside GTM; do not add a second direct Google tag for the same events.

## Manual end-to-end verification

Run these checks in a clean browser profile and repeat at 360 px, 768 px, and 1440 px widths:

1. With blank configuration, confirm no consent banner appears and the Network panel has no requests to `googletagmanager.com`, `google-analytics.com`, or Google Ads measurement endpoints.
2. Confirm WhatsApp, phone, and email links navigate even when JavaScript or storage access is blocked.
3. Add a non-production GTM container and a valid test privacy URL. Confirm the preference UI appears before any Google request.
4. Reject consent. Confirm GTM does not load and contact navigation still works.
5. Clear the stored preference, accept, and confirm the GTM container loads once.
6. In GTM Preview / Tag Assistant, click each action once and verify one matching event with only the documented parameters.
7. Switch TR → EN → TR several times, then repeat contact and project clicks. Confirm listeners and events are not duplicated.
8. Confirm accepting consent does not replay clicks made before acceptance.
9. Reopen cookie preferences, reject, and confirm no further behavioural events are pushed.
10. Validate consent states and tag consent requirements in GTM Preview before publishing the container.

Production activation must also include a legal/privacy content review and an owner-approved GTM publication. Neither is performed in phase 1.
