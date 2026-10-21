# Developer reference — The House of Aayam

Current source revision: 21 October 2026. Read PROGRESS.md for current scope, CHANGELOG.md for history and docs/rings-integration.md and docs/bracelets-integration.md for implementation sequences and mappings.

## Repository and hosting

- Public Git repository: https://github.com/bohemian31/aayam-website, main branch. Pages preview: https://bohemian31.github.io/aayam-website/preview/index.html.
- The root index.html, styles.css, script.js and assets/ implement the separate launching-soon site used by Netlify/thehouseofaayam.com. The ring/bracelet integrations do not edit those files or Netlify settings.
- The preview is static HTML/CSS/JavaScript with no build step, CMS, backend, account or checkout. Run a local HTTP server from the repository root because catalogue JSON is fetched over HTTP.
- Preview CSS, frontend modules and catalogue JSON use cache query 20261021-bracelets-1. Advance them for later runtime data or frontend changes. Keep all asset URLs relative so they work beneath the GitHub Pages repository prefix.
- Local source photos, pitch, competitor screenshots and output/catalogue-images/ are ignored. Only approved delivery exports belong in catalog/images/rings/ and catalog/images/bracelets/. Do not publish annotations, deferred photos, unfinished alternative attempts or raw image-production output.

## File map

| Path | Responsibility |
| --- | --- |
| catalog/products.sample.json | Runtime catalogue: 20 rings + 9 bracelets with enquiry-only facts, plus 17 sample reference products |
| catalog/rings.content.json | Authored ring names, descriptions, design tags and source keys |
| catalog/rings.media.json | Product/role mapping and hashes of approved PNGs and WebP exports |
| catalog/images/rings/<key>/ | Three web images per approved ring: 01-hero, 02-alternate, 03-worn |
| catalog/bracelets.content.json | Authored bracelet names, descriptions, design tags and source keys |
| catalog/bracelets.media.json | Bracelet role mapping and approved-master/export hashes |
| catalog/images/bracelets/<key>/ | Three web images per bracelet: 01-hero, 02-detail, 03-worn |
| catalog/images/reference/ | September reference assets used by Chains/Pendants |
| preview/catalog.js | Fetch, escaping, image/card helpers, unknown-price handling and enquiries |
| preview/collection.js | Collection search/filter/sort and URL state |
| preview/product-gallery.js | Accessible gallery and enquiry-led product rendering |
| preview/product.html | Product route and existing sample variant/size flow |
| preview/styles.css | Shared responsive presentation |
| scripts/build_ring_catalogue.py | Local approved-master export and catalogue builder (Pillow) |
| scripts/build_bracelet_catalogue.py | Approved-master bracelet export and catalogue builder (Pillow) |
| scripts/verify_catalogue.cjs | Shared browser checks; prior ring script is a compatibility entry point |
| output/catalogue-images/ | Ignored local approved masters, source records, prompts, queues and reports |

## Data contract

There are **46 unique active IDs**: AYM-RG-101–120, AYM-BR-101–109, AYM-CH-001–010 and AYM-PD-001–007. Former AYM-RG-001–008 and AYM-BR-001–008 references are retired and show unavailable. New IDs prevent old references from silently changing design.

The top-level sampleContent flag remains true because the 17 chain/pendant records retain sample facts. Rings and Bracelets set catalogueStatus=enquiry, sampleContent=false, pricingStatus=on_enquiry, specificationStatus=confirm_on_enquiry, weightGrams=null, variants=[] and sizeOptions=[]. Do not infer physical materials, gemstones, weights, prices, purity, size, fastening, availability or manufacturing method from imagery.

Both enquiry categories have image-led descriptions, appearanceLabel, designTags and details.design/finish. Composition, dimensions, weight and (for bracelets) fastening are confirmation prompts. Bracelet fitGuidance requests wrist measurements and preferred fit without inventing lengths or adjustment ranges. No sample variant selectors appear on these pages.

Images.primary/alternate/detail map to three distinct files and images.onBody aliases the third/worn file for hover. Rings use hero / alternate / on-hand roles. Bracelets use hero / diagonal detail / on-wrist roles, even though the compatibility field for the second image remains images.alternate. Explicit gallery labels/alt text determine their visible names. mediaType=generated_illustration and gallery notes disclose that fine geometry and worn fit remain illustrative. Bracelet hidden closures are not asserted as verified construction.

Chains and Pendants retain sample variants, weights, sizes, care and single-photo mapping. Repeated galleries remain labelled and their sample selection flow still works. The runtime filename products.sample.json stays stable for existing consumers.

## Frontend behaviour

- Collection image hover crossfades to the distinct worn/third view in 360ms and returns on exit. The overlay is decorative, decoded before reveal, and enabled only with fine-pointer hover support; keyboard focus also reveals it. Touch devices, missing images and records without a distinct worn view retain the hero. Reduced motion disables the animation. Home cards do not receive an overlay.

- Rings and Bracelets display category-specific design tags, featured/alphabetical sorting and Price on enquiry. Unconfirmed gold/karat filters and sample variant selectors are hidden on these category routes. Switching categories clears incompatible filter state. In a mixed collection price sort, unknown prices appear after priced sample records in either direction.
- Search covers product name, ID, category, design description and tags. Active-filter text is escaped before insertion. Empty results support clearing filters.
- Enquiry gallery buttons expose aria-pressed, descriptive labels, updated image alt text and an announced caption. Ring hero/alternate/on-hand and bracelet hero/detail/on-wrist images are distinct. Native details elements expose the ring description, visible details, fit/care and enquiry information.
- Enquiry WhatsApp/email links contain the correct product name, ID and product URL and request confirmed facts. Bracelet messages include wrist sizing, length, fastening and adjustment; ring messages retain karat/sizing guidance. No outgoing message is sent automatically. The sample-category flow still takes a sample variant plus size/help selection. WhatsApp +91 7265000916 remains visibly demo; email is thehouseofaayam@gmail.com.
- Four homepage featured cards select the first record per category. The Rings tile points at the approved Kavi hero and the Bracelets tile at Ravik Crimson Weave. Campaign assets are unchanged.
- Preview pages retain noindex and visible preview notice; these do not make the public Pages site private. Keep header/footer/drawer changes consistent across the six HTML pages.

## Media approvals and deferred queue

Nine bracelet sets are approved for website preview use under output/catalogue-images/approved/bracelets/: crimson sample 002 and eight batch-001 sets. The founder’s implementation request accepted batch 001 for this website use; it did not verify physical construction. V2 specifications lock 80–85% hero width, straight diagonal detail and permitted wrist references. Source filenames mock-for-bracalet-# have durable normalised copies mock-for-bracelet-# under _references/bracelets/. Sample 001 is historical. The blue/crimson variants remain separate; only the left interlocking-link cord design in b8.jpg is included.

Source evidence, exact prompts, hashes and source-specific limitations remain local. The rose-geometric, graphite-chevron, two-tone-angular and olive-interlocking groups lack full rear/closure evidence. Angular overlaps and mosaic tiny accents need clearer source detail; all dimensions and worn fit remain indicative. Public copy describes visible forms and asks for final fastening/specification confirmation. Do not replace those prompts with inferred physical facts. Only the selected 27 approved WebP exports and authored data are published.

Twenty canonical ring folders are approved: the green-inlay sample and batches 001–004. Batch 004 approval covers the six previously selected circled designs only. The latest production state is reconciled from approved manifests; stale planned folders and alternative names in review history are not extra approved products.

All remaining sources are together in output/catalogue-images/deferred/rings/to-do/ with original copies, applicable annotations, hashes and next steps. no-1/2/3 need selection; no-3 may duplicate an approved design. no-5 is obscured at low resolution, no-6 has limited low-resolution construction evidence and no-7 shows a front-only view. Do not use them without further source/selection work. The old no-12 source copy outside to-do has already been processed and is provenance only.

## Build, checks and release

Run python3 scripts/build_ring_catalogue.py for the 20 Rings, or python3 scripts/build_bracelet_catalogue.py for the nine Bracelets, with Pillow and the respective local approved masters present. Each builder updates only its category and media map. Bracelet export verifies selected master hashes and produces 27 native 1254 × 1254 WebPs at quality 90, about 4.14 MB. Ring delivery assets total about 6.18 MB. No paid API or generation calls are part of the builders.

Serve the repository over HTTP and run node scripts/verify_catalogue.cjs with Playwright available. Optional argument: deployed preview base URL. BROWSER_EXECUTABLE can select an installed Chromium browser. scripts/verify_ring_catalogue.cjs forwards to these shared checks. Latest local checks passed 29 enquiry routes and all 87 gallery images, WhatsApp/email identity, category copy and design filters, search/sort, hover in bracelet/mixed grids, return/focus/reduced motion, missing worn-image fallback, retired IDs, remaining sample flow, homepage/noindex, and 375px touch layouts. Reports/screenshots: output/catalogue-images/integration-review/bracelets/. Static checks confirm all 37 non-bracelet records are unchanged and all selected exports match recorded hashes.

Push main for the requested GitHub Pages preview, then verify the deployed catalogue IDs, assets and frontend. A separate live-domain release still needs confirmed business/product facts and an explicit Netlify/domain instruction. The pitch remains local; avoid unverified founder, manufacturing, alloy, gemstone, hallmarking, policy, availability or service promises in customer copy.
