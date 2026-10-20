# Project progress — The House of Aayam

Last updated: 21 October 2026. CHANGELOG.md preserves the historical sequence; this file describes the current source revision.

## Current website

The browse-and-enquire GitHub Pages preview contains **45 products: 20 rings, 8 bracelets, 10 chains and 7 pendants**. All eight former ring listings have been retired. The 20 approved ring designs each have a hero, alternate and worn illustration (60 square media assets). Product names, summaries, descriptions and design/finish details are derived from the approved images. Numeric prices, weights, dimensions, ring sizes and specific metal/stone/karat options have not been supplied for these rings; their pages ask visitors to confirm those facts on enquiry. No dummy ring specifications are presented as product facts.

New ring IDs are AYM-RG-101–120. Retired AYM-RG-001–008 URLs show the unavailable-product state so a shared old reference never silently changes design. The catalogue has searchable image-led copy, a ring-design filter, labelled three-view galleries, WhatsApp/email enquiry links with product name/reference, and an updated homepage ring tile. Price sorting puts unknown prices after sample-priced products; Rings uses featured or alphabetical sorting. Product images are delivered as native-size 1254 × 1254 WebP files. The original PNG masters remain local.

The other 25 category records are unchanged September references with clearly labelled sample prices and specifications. Their repeated-image galleries remain labelled. The global preview notice distinguishes illustrated rings from other sample categories. Preview pages retain noindex; the repository and GitHub Pages URL are public. WhatsApp remains the visibly identified demo contact +91 7265000916; email is thehouseofaayam@gmail.com.

The source revision is locally verified. All 20 product routes and all 60 gallery image loads were checked, alongside enquiries, filters, search, sorting, sample-category behaviour, old-ID handling, homepage links, and desktop/mobile layouts. Detailed local reports/screenshots live under output/catalogue-images/integration-review/. The publication target is https://bohemian31.github.io/aayam-website/preview/all-jewellery.html?category=Rings. The root launching-soon page and Netlify/domain configuration are separate from this update.

## Approved media and remaining work

The source library is /Users/kp/Documents/PJC/New Images. The sample and batches 001–004 are approved: **20 ring designs** in output/catalogue-images/approved/rings/. The newest batch contributed six circled rings from no-4, no-8, no-9, no-10, no-11 and no-12. The canonical production log has been reconciled with approved manifests; stale duplicate and planned entries do not determine website scope.

All six deferred source photos have been curated into **output/catalogue-images/deferred/rings/to-do/** with a README, manifest and relevant annotations. no-1/2/3 need a target selection (and a duplicate check for no-3); no-5/6/7 need clearer or additional views. No deferred or unfinished alternate render is used on the site. Original source files, annotation copies, exact generation prompts, review attempts and approved masters are kept locally in the ignored output tree.

Generated angles and on-hand scale remain interpretations rather than verified physical facts. Use the built-in image generator with the included allowance; additional paid tools have not been authorized. The three-image square schema remains hero, distinct alternate and worn. The four mock-for-ring references are permitted hand/pose inputs only. Other product folders remain for later production; this release integrates Rings only.

## Developer entry points

- docs/rings-integration.md: implementation sequence, product mapping, validation scope.
- catalog/rings.content.json: authored ring names/copy and approved source keys.
- catalog/products.sample.json: active mixed-stage runtime catalogue.
- catalog/rings.media.json: approved-master/export hashes and the 60-view mapping.
- scripts/build_ring_catalogue.py: repeatable local export/build using approved masters.
- scripts/verify_ring_catalogue.cjs: meaningful browser checks against local or deployed preview.
- DEVELOPER_REFERENCE.md: runtime/data contracts and release instructions.

## Historical scope and content boundaries

September phases 1–5 established the static Miansai-inspired structure and a 45-item dummy catalogue. The 29 September image-backed revision used 33 single-photo reference listings. October ring production and this integration supersede the eight Rings in that revision; its other 25 listings remain intact. CHANGELOG.md and Git history retain prior phase details.

Our Story, Materials & Care and Contact retain the editorial work completed in September. Public copy omits unconfirmed founder/manufacturing history and future services. No checkout, form, account system, support hours, availability or lead-time promises have been added. A full-domain release requires a separate instruction plus confirmed product and contact facts.
