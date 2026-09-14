# Analytics and consent setup

The confirmed identifiers are GTM container `GTM-TS9MQX78` and GA4 Measurement ID `G-H5N8JSM0SS` for `https://beylikduzuyazilim.com.tr/`. Both are recorded centrally, but external analytics is not active yet. Recording the GA4 ID does not configure GTM, publish its container, or send data to GA4.

The required completed privacy information is not present, so the existing activation gate prevents the consent panel and GTM loader from activating. GA4, Google Ads tags, and campaigns are not installed or published by this repository change.

## Configuration location

All future browser-side analytics configuration is in `analytics-config.js`:

```js
window.ANALYTICS_CONFIG = Object.freeze({
  gtmContainerId: "GTM-TS9MQX78",
  ga4MeasurementId: "G-H5N8JSM0SS",
  privacyPolicyUrl: "",
  consentStorageKey: "am_analytics_consent_v1"
});
```

`ga4MeasurementId` is documentation/configuration input for the GTM workspace. Site code does not read it to load `gtag.js` or send events directly. The only measurement loader is the consent-aware GTM loader in `script.js`.

External analytics stays disabled unless both of these checks pass:

- `gtmContainerId` is a syntactically valid real GTM container ID.
- `privacyPolicyUrl` is an absolute HTTP(S) URL to completed privacy information.

With either value absent or invalid, the site does not load GTM, does not show a meaningless cookie banner, and does not queue behavioural events for later replay.

Current status: the GTM ID is configured, while `privacyPolicyUrl` remains empty because no completed privacy document exists in the repository. Do not insert a placeholder URL to bypass this gate. Add the approved public privacy URL only after the content is complete.

## Exact dataLayer event contract

Events are pushed only after a visitor grants analytics consent. Parameters use stable identifiers and never include contact destinations, user-written messages, email addresses, phone numbers, or query strings.

| Event | Exact parameters and values | Code trigger |
| --- | --- | --- |
| `contact_click` | `contact_method`: `whatsapp`, `phone`, or `email`; `cta_location`: `navigation`, `hero`, `service_web`, `service_mobile`, `service_software`, `team`, `final`, `footer`, `mobile_sticky`, or `floating_whatsapp`; `language`: `tr` or `en` | A click on an element with `data-contact`. |
| `portfolio_click` | `project_id`: `zamok-bim`, `firmen-logo-druck`, `3a-jewellery`, `mybonus-berlin`, or `preismenu`; `language`: `tr` or `en` | A click on a portfolio image or text link with `data-project`. |
| `service_interest` | `service_id`: `web`, `mobile`, or `custom_software`; `language`: `tr` or `en` | A click on a service enquiry link with `data-service`. The same link is also a WhatsApp contact action, so it deliberately emits one `service_interest` and one `contact_click`, not duplicate copies of either event. |
| `language_change` | `from_language`: `tr` or `en`; `language`: the newly selected `tr` or `en` | A click that actually changes the language. Clicking the already-selected language emits nothing. |
| `video_engagement` | `video_id`: `web_interface` or `mobile_development`; `action`: `play`; `language`: `tr` or `en` | The first actual `play` event for that video during the page view. Pause/resume does not emit another event. |

The website sends each event through `dataLayer.push()` only. Do not also send the same action directly with `gtag('event', ...)`.

`contact_click` is an intent signal. It does not prove that a WhatsApp message was sent, a call was answered, an email was delivered, or a qualified lead was created. Do not map it directly to a confirmed-lead label without a separate, verifiable downstream signal.

## GTM workspace build sheet

These are manual workspace instructions unless the completion report explicitly says authenticated GTM edits were made. Create them in the web container `GTM-TS9MQX78`; do not publish until privacy/consent approval and end-to-end Preview testing are complete.

### 1. Data Layer Variables

In **Variables > User-Defined Variables > New > Data Layer Variable**, use Data Layer Version 2 and create these exact variables:

| GTM variable name | Data Layer Variable Name |
| --- | --- |
| `DLV - contact_method` | `contact_method` |
| `DLV - cta_location` | `cta_location` |
| `DLV - project_id` | `project_id` |
| `DLV - service_id` | `service_id` |
| `DLV - from_language` | `from_language` |
| `DLV - language` | `language` |
| `DLV - video_id` | `video_id` |
| `DLV - action` | `action` |

### 2. Custom Event triggers

In **Triggers > New > Custom Event**, create one **All Custom Events** trigger for each exact, case-sensitive event name:

| Trigger name | Custom event name |
| --- | --- |
| `CE - contact_click` | `contact_click` |
| `CE - portfolio_click` | `portfolio_click` |
| `CE - service_interest` | `service_interest` |
| `CE - language_change` | `language_change` |
| `CE - video_engagement` | `video_engagement` |

Do not add GTM click triggers for these interactions. The site already pushes the events; click triggers would create a second measurement path.

### 3. One Google tag

Create exactly one tag:

- Name: `Google tag - GA4 - G-H5N8JSM0SS`
- Tag type: **Google tag**
- Tag ID: `G-H5N8JSM0SS`
- Trigger: **Initialization - All Pages**
- Advanced Settings > Consent Settings: review the built-in checks and require `analytics_storage` as an additional condition for this basic-consent implementation.

Keep the default automatic page view. Do not create a GA4 Event tag named `page_view`, a second Google tag, a legacy GA4 Configuration tag, or a standalone `gtag.js` snippet. GA4 sends the initial `page_view` automatically; manually sending another one would duplicate it. This site is a single static document and its language/hash interactions are not virtual page views.

### 4. Five GA4 Event tags

Create exactly these **Google Analytics: GA4 Event** tags. Use Measurement ID `G-H5N8JSM0SS`, attach the matching Custom Event trigger, and under Advanced Settings > Consent Settings require `analytics_storage`.

| Tag name / Event name / Trigger | Event parameters |
| --- | --- |
| `GA4 Event - contact_click` / `contact_click` / `CE - contact_click` | `contact_method` = `{{DLV - contact_method}}`; `cta_location` = `{{DLV - cta_location}}`; `language` = `{{DLV - language}}` |
| `GA4 Event - portfolio_click` / `portfolio_click` / `CE - portfolio_click` | `project_id` = `{{DLV - project_id}}`; `language` = `{{DLV - language}}` |
| `GA4 Event - service_interest` / `service_interest` / `CE - service_interest` | `service_id` = `{{DLV - service_id}}`; `language` = `{{DLV - language}}` |
| `GA4 Event - language_change` / `language_change` / `CE - language_change` | `from_language` = `{{DLV - from_language}}`; `language` = `{{DLV - language}}` |
| `GA4 Event - video_engagement` / `video_engagement` / `CE - video_engagement` | `video_id` = `{{DLV - video_id}}`; `action` = `{{DLV - action}}`; `language` = `{{DLV - language}}` |

Do not rename `contact_click` to `generate_lead`, mark it as a key event, or connect it to Ads without an approved measurement decision. It records click intent only.

### 5. Preview and GA4 reporting

In GTM Preview / Tag Assistant, verify the Google tag fires once and each custom push fires only its matching GA4 Event tag once. In GA4 DebugView/Realtime, verify the event names and parameter values before considering publication. If the custom parameters are needed in standard reports, create event-scoped custom dimensions for the exact parameter names after collection is verified; do not create duplicate definitions for `language` per event.

## Consent boundary

The prepared implementation uses a basic consent approach:

- GTM does not load before an affirmative choice.
- Consent defaults are queued before the container is loaded, then updated for the granted choice.
- Accepting analytics grants only `analytics_storage`; `ad_storage`, `ad_user_data`, and `ad_personalization` remain denied.
- Rejected visitors are not tracked.
- Pre-consent interactions are discarded rather than replayed after acceptance.
- The footer preference control lets a visitor reject after previously accepting. The denial update prevents further site events from being pushed.
- Storage access is wrapped so blocked or unavailable `localStorage` does not break navigation or contact links.

Before activation, choose and configure an appropriate consent management platform (CMP) or complete a legal review of the custom preference UI. Google recommends consent defaults before measurement commands and consent updates when the visitor changes their choice. For GTM-managed consent, use GTM consent APIs or a suitable CMP template rather than Custom HTML consent commands.

Official references (checked 2026-09-14):

- [Set up Google Analytics in Tag Manager](https://support.google.com/tagmanager/answer/9442095)
- [Set up Google Analytics events in Tag Manager](https://support.google.com/tagmanager/answer/13034206)
- [Custom Event trigger](https://support.google.com/tagmanager/answer/7679219)
- [Measure pageviews](https://developers.google.com/analytics/devguides/collection/ga4/views)
- [Create event-scoped custom dimensions](https://support.google.com/analytics/answer/14239696)
- [Set up consent mode on websites](https://developers.google.com/tag-platform/security/guides/consent)
- [Consent mode overview](https://developers.google.com/tag-platform/security/concepts/consent-mode)
- [Tag Manager consent mode support](https://support.google.com/analytics/answer/10718549)
- [The data layer](https://developers.google.com/tag-platform/tag-manager/datalayer)

## Phase 2 account setup

The following real, user-owned items are required:

1. A Google account with appropriate business ownership and access.
2. The configured GTM web container for `beylikduzuyazilim.com.tr` (`GTM-TS9MQX78`).
3. The GA4 property and web data stream for the canonical HTTPS domain, using Measurement ID `G-H5N8JSM0SS`, with agreed data-retention, Google Signals, and ads-personalisation settings.
4. A Google Ads account only if advertising will run, with billing, conversion goals, campaign geography, language, budget, and final URLs reviewed by the owner. No campaign or spend is part of phase 1.
5. A Search Console domain property verified through a DNS record controlled by the domain owner; then submit `https://beylikduzuyazilim.com.tr/sitemap.xml`.
6. Completed privacy/cookie information at a stable public URL, including the actual controller/contact details, tools used, purposes, legal basis, retention, recipients/transfers, and visitor rights as approved by the responsible legal adviser.
7. A selected CMP or approved consent design, consent categories, regional behaviour, withdrawal flow, and retention period for the preference record.
8. GTM tags, variables, custom-event triggers, consent checks, environments, and publishing access. Preview and approve the container before any production publication.
9. A measurement plan deciding which click-intent events, if any, become GA4 key events or Google Ads conversions. Confirmed leads require a separate CRM or server-side outcome source.

The real GTM container and GA4 Measurement IDs are already recorded. Merely storing them does not activate measurement. After the privacy content and consent review are complete, add only the approved privacy URL to `analytics-config.js`. Configure GA4 inside GTM using the build sheet above; do not add a second direct Google tag for the same events.

## Manual end-to-end verification

Run these checks in a clean browser profile and repeat at 360 px, 768 px, and 1440 px widths:

1. With the privacy URL blank, confirm no consent banner appears and the Network panel has no requests to `googletagmanager.com`, `google-analytics.com`, or Google Ads measurement endpoints.
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
