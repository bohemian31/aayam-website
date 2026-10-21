# Developer reference — The House of Aayam

Current source revision: 21 October 2026. Read PROGRESS.md for current scope, CHANGELOG.md for history, and `docs/*-integration.md` for product mappings and validation limits.

## Repository and hosting

- Repository: https://github.com/bohemian31/aayam-website, branch `main`. Preview: https://bohemian31.github.io/aayam-website/preview/index.html.
- Root `index.html`, `styles.css`, `script.js` and `assets/` implement the separate launching-soon site used by Netlify/thehouseofaayam.com. Earring integration does not edit these files or Netlify settings.
- The preview is static HTML/CSS/JavaScript without CMS, backend, accounts or checkout. Serve the repository over HTTP because catalogue JSON is fetched by the browser.
- Current preview CSS/JS/data cache query: `20261021-earrings-1`. Advance it when frontend or catalogue data changes. Asset URLs remain relative to support the GitHub Pages repository prefix.
- Local source photos, pitch, prompts, annotations, excluded attempts and `output/catalogue-images/` are ignored. Only selected WebP exports belong in `catalog/images/{rings,bracelets,earrings}/`.

## File map

| Path | Responsibility |
| --- | --- |
| `catalog/products.sample.json` | Runtime catalogue: 20 Rings + 9 Bracelets + 13 Earrings (enquiry only), 10 Chains + 7 Pendants (sample) |
| `catalog/{rings,bracelets,earrings}.content.json` | Authored names, summaries, descriptions, visual details and source keys |
| `catalog/{rings,bracelets,earrings}.media.json` | Approved PNG and exported WebP hashes/roles |
| `catalog/images/rings/` | 60 selected web views |
| `catalog/images/bracelets/` | 27 selected web views |
| `catalog/images/earrings/` | 38 selected web views; Rion has no alternate |
| `catalog/images/reference/` | September sample reference assets for Chains/Pendants |
| `preview/catalog.js` | Fetch, escaping, card images, hover support and enquiries |
| `preview/collection.js` | Search/filter/sort and category state |
| `preview/product-gallery.js` | Accessible gallery and enquiry-led pages |
| `preview/styles.css` | Shared responsive styles |
| `scripts/build_{ring,bracelet,earring}_catalogue.py` | Approved-master export and category builders (Pillow) |
| `scripts/verify_catalogue.cjs` | Local/deployed browser checks (Playwright) |
| `output/catalogue-images/` | Ignored local masters, provenance, excluded attempts and reports |

## Data contract

There are **59 unique active IDs**: AYM-RG-101–120, AYM-BR-101–109, AYM-ER-101–113, AYM-CH-001–010 and AYM-PD-001–007. Former AYM-RG-001–008 and AYM-BR-001–008 references show an unavailable state; do not reuse their IDs for different products.

Top-level `sampleContent` remains true because 17 Chain/Pendant records retain labelled sample facts. Rings, Bracelets and Earrings use `catalogueStatus=enquiry`, `sampleContent=false`, `pricingStatus=on_enquiry`, `specificationStatus=confirm_on_enquiry`, `weightGrams=null`, `variants=[]` and `sizeOptions=[]`. Descriptions are based on visible form. Do not infer metal, gemstones, purity, sizes, weight, fastening, availability, price or manufacturing method from images.

Enquiry records have `appearanceLabel`, `designTags`, design/finish details, and questions about unverified physical facts. Bracelet fit asks for wrist measurement; Earring fit asks about scale, closure/backing and whether sold singly or as a pair. Explicit gallery arrays set labels and alt text. `images.onBody` points to the worn image for collection hover. Rings use hero/alternate/on-hand; Bracelets hero/diagonal detail/on-wrist; Earrings hero/alternate/on-ear except Rion, whose gallery is hero/on-ear only. Rion's `images.alternate` compatibility field points to its worn view, but no duplicate thumbnail is rendered. `mediaType=generated_illustration` and gallery notes disclose illustrative details and fit.

Chains/Pendants retain sample variants, weights, sizes, care and repeated single-photo galleries. Their sample selection flow remains. The runtime filename `products.sample.json` is deliberately stable.

## Frontend behaviour

- Collection cards with a distinct worn view crossfade hero to worn in 360ms on fine-pointer hover and keyboard focus, after image decode; exit restores hero. Touch keeps hero; reduced motion skips animation; missing worn images leave hero usable. Homepage cards do not have this overlay.
- Enquiry categories show design filters and “Price on enquiry”; unconfirmed gold/karat filters and variant selectors are hidden. Mixed-category price sorts put unknown prices after priced sample listings. Search covers name, ID, category, descriptions and tags; user-visible filter text is escaped.
- Gallery controls expose `aria-pressed`, labels, image alt and announced captions. The product page includes category-aware description, fit/care and enquiry sections. Earring messages request confirmed dimensions, closure/backing, and single/pair availability; bracelet messages ask about fit/fastening; ring messages ask about sizing/karat. WhatsApp/email links include correct product name, ID and URL. No message is sent automatically. WhatsApp +91 7265000916 is visibly demo; email is thehouseofaayam@gmail.com.
- Homepage featured tiles now cover Rings, Bracelets, Earrings, Chains and Pendants. Preview pages retain `noindex` and visible preview notice; Pages remains a public site. Keep navigation/footer/drawer consistent across the six HTML pages.

## Media approvals and limits

All 13 selected Earring sets are approved under `output/catalogue-images/approved/earrings/`: Avir sample, four batch-001, three batch-002 and five batch-003. Avir's small hero is about 49% of its original linear framing; the template keeps an earring hero small and centred, with a larger alternate and natural ear/jaw worn crop. The dropped Aarav design stays under local `excluded/earrings/` and is absent from the website.

Batch-003's final Kiaan and Ayaan alternate selections are the **earlier front-facing versions with a thin top detail**. Later bar-less versions are archived in `_attempts/` and excluded from exports. Ayaan and Rion worn images were reduced about 20–25%. Rion is an explicit two-image exception: `01-hero.png` and `03-worn.png`; its alternate is archived only. These choices are recorded in selected manifests and `catalog/earrings.media.json` hashes. Original sources, exact prompts, SHA256s and contact sheets remain in ignored local review folders. Fine motifs, rear construction, closure and exact on-ear scale are interpretations requiring physical verification.

Nine Bracelet sets and 20 Ring sets remain approved. Bracelet heroes occupy roughly 80–85% of canvas width; detail images follow a straight diagonal; Ring heroes, distinct angles and worn views retain their earlier specification. The six difficult Ring sources remain under `output/catalogue-images/deferred/rings/to-do/`. Do not publish raw sources, annotations, deferred photos or rejected attempts.

## Build, checks and release

Run `python3 scripts/build_earring_catalogue.py` with Pillow and approved local masters to validate selected hashes, native 1254 × 1254 PNG dimensions and export 38 quality-90 WebPs. The Ring and Bracelet builders work similarly for their own categories. No image-generation or paid API call is part of these builders.

Serve the repository over HTTP and run `node scripts/verify_catalogue.cjs` with Playwright available; pass an optional base URL to test the deployed preview. `BROWSER_EXECUTABLE` can select Chromium. The old ring verifier forwards to these shared checks. Latest local checks cover 42 enquiry routes, 125 gallery images, card hover/focus/touch/reduced motion/fallback, search/filters/sort, enquiry identity, sample-category flow, retired IDs, homepage, noindex and responsive layouts. Reports/screenshots are under `output/catalogue-images/integration-review/earrings/`. Static checks should verify that all 46 prior non-earring records are unchanged and excluded files never enter public exports.

Push `main` to update the requested GitHub Pages preview, then verify deployed IDs, assets and frontend. A separate live-domain release needs confirmed business/product facts and explicit Netlify/domain instruction. The pitch remains local; avoid unverified founder, alloy, gemstone, hallmarking, policy, service, availability or fulfilment claims.
