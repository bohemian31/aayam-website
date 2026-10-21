# Project progress — The House of Aayam

Last updated: 21 October 2026. CHANGELOG.md preserves the historical sequence; this file describes the current source revision.

## Current website — Rings and Bracelets

The GitHub Pages preview source now contains **46 products: 20 rings, 9 bracelets, 10 chains and 7 pendants**. All eight prior bracelet placeholders are retired. The nine approved bracelet designs each have a distinct hero, straight diagonal detail and worn illustration (27 square delivery assets). Names, descriptions and design/finish details are authored from the approved imagery. Materials, karat, price, weight, dimensions, fastening, sizes and availability remain to be confirmed on enquiry. No dummy bracelet facts are presented as product specifications.

New bracelet IDs are AYM-BR-101–109; older AYM-BR-001–008 links show an unavailable-product state. Product pages use Bracelets breadcrumbs, wrist-fit and care guidance, fastening confirmation, and labelled Hero / Detail / On wrist galleries. WhatsApp/email links include the correct product name, reference and URL. Collection hover uses the same 360ms dissolve from hero to worn as Rings, with decoded-image readiness, keyboard focus, reduced-motion and missing-image handling. Touch devices retain the hero. Category filters show design tags instead of unconfirmed gold/karat choices for Rings and Bracelets.

All 20 ring records and their 60 images are preserved. The remaining 17 chain/pendant reference listings retain clearly labelled sample facts. The homepage bracelet tile, preview notice and frontend/data cache versions are updated. The public preview retains noindex. WhatsApp remains the demo +91 7265000916 and email is thehouseofaayam@gmail.com.

Local browser checks passed for all 29 enquiry routes and 87 gallery image switches, enquiries, filters/search/sort, hover in bracelet and mixed grids, return/focus/reduced-motion behaviour, a failed worn-image fallback, retired IDs, sample-category flow, homepage/noindex, and desktop/375px touch layouts. Integrity checks verify the 27 native 1254 × 1254 exports and preservation of all 37 non-bracelet records. Screenshots and reports: output/catalogue-images/integration-review/bracelets/. The release target is the existing GitHub Pages preview; deployment verification is recorded separately in the same local report folder. Root launch-page and Netlify settings are unchanged.

## Approved bracelet media

All nine selected designs are approved for website preview use. The eight new batch-001 sets were accepted through the founder’s implementation request and copied byte-for-byte beside the previously approved crimson sample under output/catalogue-images/approved/bracelets/. PNG masters, exact prompts, original source copies, hashes and construction notes remain local. The v2 template locks square images, 80–85% hero width, diagonal detail and permitted bracelet wrist references. The b3 design uses the new framing; the earlier sample 001 remains history. Crimson and blue weave variants remain distinct. The founder selected only the left interlocking-link cord design from b8.jpg.

Arka, Tejas, Zaal and Ansh lack full rear/closure evidence. Zaal plate overlap and Kavi fine accents need sharper references for exact physical accuracy. Website acceptance does not verify these facts; illustrations and fit remain indicative. See docs/bracelets-integration.md for mapping, implementation, rebuild and validation instructions.

## Approved media and remaining work

The source library is /Users/kp/Documents/PJC/New Images. The sample and batches 001–004 are approved: **20 ring designs** in output/catalogue-images/approved/rings/. The newest batch contributed six circled rings from no-4, no-8, no-9, no-10, no-11 and no-12. The canonical production log has been reconciled with approved manifests; stale duplicate and planned entries do not determine website scope.

All six deferred source photos have been curated into **output/catalogue-images/deferred/rings/to-do/** with a README, manifest and relevant annotations. no-1/2/3 need a target selection (and a duplicate check for no-3); no-5/6/7 need clearer or additional views. No deferred or unfinished alternate render is used on the site. Original source files, annotation copies, exact generation prompts, review attempts and approved masters are kept locally in the ignored output tree.

Generated angles and on-hand scale remain interpretations rather than verified physical facts. Use the built-in image generator with the included allowance; additional paid tools have not been authorized. Rings use hero, distinct alternate and worn; Bracelets use hero, straight diagonal detail and worn. The four mock-for-ring references are permitted hand/pose inputs only. Other product folders remain for later production; the current website integrates Rings and Bracelets.

## Developer entry points

- docs/rings-integration.md and docs/bracelets-integration.md: category implementation sequences, mappings and validation scope.
- catalog/rings.content.json and catalog/bracelets.content.json: authored names/copy and approved source keys.
- catalog/products.sample.json: active mixed-stage runtime catalogue.
- catalog/rings.media.json and catalog/bracelets.media.json: approved-master/export hashes and 87-view mappings.
- scripts/build_ring_catalogue.py and scripts/build_bracelet_catalogue.py: repeatable category export/build using approved masters.
- scripts/verify_catalogue.cjs: browser checks against local or deployed preview (old ring script forwards here).
- DEVELOPER_REFERENCE.md: runtime/data contracts and release instructions.

## Historical scope and content boundaries

September phases 1–5 established the static Miansai-inspired structure and a 45-item dummy catalogue. The 29 September image-backed revision used 33 single-photo reference listings. October ring and bracelet production supersede that revision’s eight Rings and eight Bracelets; its 17 chain/pendant listings remain intact. CHANGELOG.md and Git history retain prior phase details.

Our Story, Materials & Care and Contact retain the editorial work completed in September. Public copy omits unconfirmed founder/manufacturing history and future services. No checkout, form, account system, support hours, availability or lead-time promises have been added. A full-domain release requires a separate instruction plus confirmed product and contact facts.
