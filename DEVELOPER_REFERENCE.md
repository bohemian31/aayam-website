# Developer reference — The House of Aayam

Current source revision: 21 October 2026. Read PROGRESS.md for current scope, CHANGELOG.md for history and docs/rings-integration.md for the implementation sequence and 20-product mapping.

## Repository and hosting

- Public Git repository: https://github.com/bohemian31/aayam-website, main branch. Pages preview: https://bohemian31.github.io/aayam-website/preview/index.html.
- The root index.html, styles.css, script.js and assets/ implement the separate launching-soon site used by Netlify/thehouseofaayam.com. The current ring integration does not edit those files or Netlify settings.
- The preview is static HTML/CSS/JavaScript with no build step, CMS, backend, account or checkout. Run a local HTTP server from the repository root because catalogue JSON is fetched over HTTP.
- Preview asset/JSON cache queries use 20261021-rings-1. Advance them for later runtime data or frontend changes. Keep all asset URLs relative so they work beneath the GitHub Pages repository prefix.
- Local source photos, pitch, competitor screenshots and output/catalogue-images/ are ignored. Only approved delivery exports belong in catalog/images/rings/. Do not publish annotations, deferred photos, unfinished alternative attempts or raw image-production output.

## File map

| Path | Responsibility |
| --- | --- |
| catalog/products.sample.json | Runtime catalogue: 20 enquiry-led rings plus 25 sample reference products |
| catalog/rings.content.json | Authored ring names, descriptions, design tags and source keys |
| catalog/rings.media.json | Product/role mapping and hashes of approved PNGs and WebP exports |
| catalog/images/rings/<key>/ | Three web images per approved ring: 01-hero, 02-alternate, 03-worn |
| catalog/images/reference/ | September reference assets used by the other categories |
| preview/catalog.js | Fetch, escaping, image/card helpers, unknown-price handling and enquiries |
| preview/collection.js | Collection search/filter/sort and URL state |
| preview/product-gallery.js | Accessible gallery and enquiry-led product rendering |
| preview/product.html | Product route and existing sample variant/size flow |
| preview/styles.css | Shared responsive presentation |
| scripts/build_ring_catalogue.py | Local approved-master export and catalogue builder (Pillow) |
| scripts/verify_ring_catalogue.cjs | Browser checks (Playwright) with optional deployed preview URL |
| output/catalogue-images/ | Ignored local approved masters, source records, prompts, queues and reports |

## Data contract

There are **45 unique active IDs**: AYM-RG-101–120, AYM-BR-001–008, AYM-CH-001–010 and AYM-PD-001–007. The former eight AYM-RG-001–008 listings are retired; unknown/removed IDs show an unavailable page. New IDs prevent old shared references from silently changing design.

The top-level sampleContent flag remains true because the non-ring categories still use sample facts. Each ring explicitly sets catalogueStatus=enquiry, sampleContent=false, pricingStatus=on_enquiry, specificationStatus=confirm_on_enquiry, weightGrams=null, variants=[] and sizeOptions=[]. Do not infer available sizes, alloys, gemstones, weights, prices, purity, availability or manufacturing method from a photograph. Numeric ring facts await confirmation.

Rings have image-led short/long descriptions, appearanceLabel, designTags and details.design/finish. Details.composition, dimensions and weight are confirmation prompts, not invented specifications. Names such as Kavi Verdant Inlay Band describe the design direction and remain editable authored copy.

Images.primary/alternate/detail point to distinct hero/alternate/worn WebPs; images.onBody aliases the worn image for compatibility. The gallery array labels the three roles and supplies meaningful alt text. mediaType=generated_illustration and the gallery note disclose that product views are generated illustrations and worn scale is indicative.

The other 25 product records preserve their prior sample weights, variants, dimensions, sizes, care and photo mappings. Their primary/alternate/detail fields repeat a single reference photo and the gallery continues to say so. Keep their sample labels until facts are verified. The root catalogue filename remains products.sample.json to avoid breaking existing consumers.

## Frontend behaviour

- Rings displays image-based design filters, featured/alphabetical sorting and Price on enquiry. Unconfirmed gold/karat filters and sample variant selectors are not presented on ring-only routes. Switching categories clears incompatible filter state. In a mixed collection price sort, unknown prices appear after priced sample records in either direction.
- Search covers product name, ID, category, design description and tags. Active-filter text is escaped before insertion. Empty results support clearing filters.
- Ring gallery buttons expose aria-pressed, descriptive labels, updated image alt text and an announced caption. Hero, alternate and on-hand images are distinct. Native details elements expose the ring description, visible details, fit/care and enquiry information.
- Ring WhatsApp/email links contain the correct product name, ID and product URL and request confirmed price/material/karat/size/weight/availability. No outgoing message is sent automatically. The sample-category flow still takes a sample variant plus size/help selection. WhatsApp +91 7265000916 remains visibly demo; email is thehouseofaayam@gmail.com.
- Four homepage featured cards select the first record per category. The Rings tile points at the approved Kavi hero. Campaign assets are unchanged.
- Preview pages retain noindex and visible preview notice; these do not make the public Pages site private. Keep header/footer/drawer changes consistent across the six HTML pages.

## Media approvals and deferred queue

Twenty canonical ring folders are approved: the green-inlay sample and batches 001–004. Batch 004 approval covers the six previously selected circled designs only. The latest production state is reconciled from approved manifests; stale planned folders and alternative names in review history are not extra approved products.

All remaining sources are together in output/catalogue-images/deferred/rings/to-do/ with original copies, applicable annotations, hashes and next steps. no-1/2/3 need selection; no-3 may duplicate an approved design. no-5 is obscured at low resolution, no-6 has limited low-resolution construction evidence and no-7 shows a front-only view. Do not use them without further source/selection work. The old no-12 source copy outside to-do has already been processed and is provenance only.

## Build, checks and release

Run python3 scripts/build_ring_catalogue.py with Pillow and the approved PNG folders present. It exports native-size 1254 × 1254 WebPs at quality 90, rebuilds only ring records and writes the media hash map; the other category records remain intact. The 60 delivery images total about 6.18 MB. Do not put paid API calls in this path.

Serve the repository over HTTP and run node scripts/verify_ring_catalogue.cjs with Playwright available. An optional argument is the preview base URL, e.g. https://bohemian31.github.io/aayam-website/preview/. BROWSER_EXECUTABLE can select an installed browser. Detailed reports/screenshots are saved in the ignored output/catalogue-images/integration-review/ folder. Current local checks passed for all 20 ring routes and all 60 gallery views, contact payloads, filter/search/sort, old-ID handling, sample-product flow, home links/noindex, desktop and 375px layouts. Inspect git diff --check and source asset counts before publishing.

Push main for the requested GitHub Pages preview, then verify the deployed catalogue IDs, assets and frontend. A separate live-domain release still needs confirmed business/product facts and an explicit Netlify/domain instruction. The pitch remains local; avoid unverified founder, manufacturing, alloy, gemstone, hallmarking, policy, availability or service promises in customer copy.
