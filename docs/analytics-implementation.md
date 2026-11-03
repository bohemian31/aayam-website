# Aayam analytics implementation handoff

Status (2026-11-03): the consent-gated analytics bundle was uploaded to the existing Netlify site and verified at `https://thehouseofaayam.com/`. GTM was subsequently published by the owner. Tag Assistant Preview confirmed `page_view` on home, `page_view` plus `view_item` for `AYM-RG-101` (Rings), and `page_view`, `view_item_list`, and `search` on `all-jewellery.html?q=ring`. The search query was absent from the reported `page_location`; search sent only a result count. Rejecting analytics left GTM unloaded; accepting loaded GTM. GA4 reporting checks and remaining interaction event QA are pending.

Status of regional update: published to the existing Netlify site on 3 November 2026 as production deploy `6aea111aacaba67a8a395df9`. The live `/analytics-region` endpoint returned HTTP 200, `Cache-Control: no-store`, and `automatic` from the test connection. A fresh live browser session showed no banner, requested GTM once, and stored no fictitious acceptance. Turning analytics off through the privacy page saved `rejected` and prevented GTM from loading on the next page. EEA/UK/Swiss/unknown and failed lookup paths were tested locally with simulated country codes/responses, not from physical locations in each region.

## IDs and separation

- GA4 web stream: `G-RVEJ9VNVVM`
- GTM web container: `GTM-MDNMX5FG`
- Search Console Domain property: verified by owner at GoDaddy.
- `scripts/build_live_site.py` adds `analytics.js`, `analytics.css`, and `privacy.html` to `dist/`. The GitHub Pages `preview/` has no GTM code. Only the `dist/` bundle is intended for the live domain.

## Consent and privacy

The regional update calls the Netlify Edge Function at `/analytics-region` before a new visitor can load GTM. It returns `choice` for the EEA, UK, Switzerland, and unknown/invalid country codes; `automatic` elsewhere. A failed lookup also shows the choice banner. The endpoint sends `Cache-Control: no-store` so one visitor's region is never served to another from a shared cache. A previously saved acceptance or rejection continues to take precedence everywhere. Automatic loading does not save a fictitious acceptance. Visitors can turn analytics off through the privacy page; an off choice survives reloads. The choice is stored in `localStorage` under `aayam-analytics-consent-v1`. If local storage is unavailable, the site asks on each page instead of starting analytics automatically. Rejecting after analytics was loaded reloads the page and stops future tracking. Browser settings may be needed to clear cookies already set. The founder should review privacy wording before publication.

## GTM configuration and release

The web code pushes `event: aayam_event` and `analytics_event: <GA4 event name>` to `dataLayer`. The published container has a Google tag, a GA4 event tag, a custom trigger, and variables. The following is a configuration reference; check the current container before changing it.

1. Add a **Google tag** with tag ID `G-RVEJ9VNVVM`, firing on **All Pages**. Set `send_page_view` to `false`. The site sends its own `page_view` after dynamic content loads. Do not add a second Google tag/gtag snippet directly to the website.
2. Set the Google tag's `page_location` configuration value to a GTM Custom JavaScript variable returning `window.AayamAnalytics.safeUrl(location.href)`. Set `page_referrer` to one returning `window.AayamAnalytics.safeUrl(document.referrer)`. These strip the raw search query (`q`) from URLs before reporting. Do not allow an automatic page view to bypass this setting.
3. Make Data Layer Variables (Version 2) for `analytics_event`, `page_title`, `item_id`, `item_name`, `item_category`, `item_list_name`, `items`, `result_count`, `channel`, `image_position`, `option_name`, `filter_type`, and `filter_value`. GTM names can be descriptive; the Data Layer Variable Name must match exactly. Use the two Custom JavaScript variables from step 2 for `page_location` and `page_referrer`.
4. Make one **Custom Event** trigger for `aayam_event` (all custom events of that exact name).
5. Make one **Google Analytics: GA4 Event** tag with Measurement ID `G-RVEJ9VNVVM`, Event Name set to the `analytics_event` variable, and the custom event trigger above. Map each available data-layer parameter to an event parameter with the same name. `items` must remain an array, not a string. Map `page_location` and `page_referrer` from the sanitized Custom JavaScript variables for every event; map `page_title` for `page_view`.
6. In GA4, disable **Enhanced measurement → Site search** if enabled, because the site sends its own `search` event. Mark `enquiry_click` as a key event after it appears in GA4. Do not mark it as a confirmed lead.
7. Use GTM Preview and GA4 DebugView to confirm accepted-consent traffic, event parameters, and exactly one `page_view` per page. Publish the GTM container only after these checks.

GA4 events: `page_view`, `view_item_list`, `select_item`, `view_item`, `search`, `filter_use`, `gallery_view`, `option_select`, `enquiry_click`, `contact_click`. No search terms or message text are sent. Search carries only a result count. Product views and selections carry the item ID and name; enquiry clicks also carry the channel.

## Release check

For future releases, run `python3 scripts/build_live_site.py` and review `dist/`. Deploy the `dist/` directory **together with** `netlify/edge-functions/analytics-region.js` from the repository root using Netlify CLI or a connected Git build. The dashboard ZIP upload cannot deploy this Edge Function. Run `scripts/verify_analytics_region.cjs` locally. On a draft deploy, test an EEA country, GB, CH, a country outside those regions, an unknown location, and a failed `/analytics-region` request. Confirm the banner and GTM request behavior, saved accept/reject, product and search events, and privacy choice changes. Then publish to the **existing** Netlify site and check the live domain. The GitHub Pages preview remains separate.
