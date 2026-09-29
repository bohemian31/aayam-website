# Developer reference — The House of Aayam

Current as of 29 September 2026. Read PROGRESS.md for status and CHANGELOG.md for historical changes. This file describes the current implementation, not the earlier 45-product state.

## Repository, runtime and hosting

- Public repository: https://github.com/bohemian31/aayam-website, branch main. GitHub Pages serves the repository root. The preview entry point is https://bohemian31.github.io/aayam-website/preview/index.html.
- The live domain thehouseofaayam.com is served separately through Netlify. Root index.html, styles.css, script.js and assets/ are the Launching Soon site; do not replace them until a separate live-domain release is approved.
- This is a fully static project. There is no package.json, bundler, CMS, backend, checkout or account system. Serve the directory over HTTP because preview/catalog.js fetches JSON. For local development, run python3 -m http.server 8123 from the repository root and open http://localhost:8123/preview/index.html.
- No secrets or environment variables are needed. .gitignore excludes the local originals in Products Images/, the investor pitch PDF, local tooling and competitor screenshots. Selected normalized copies under catalog/images/reference/ are deliberately included in the public GitHub Pages preview.
- Relative URLs are intentional. A preview page is one level below the repo root; product images are stored as catalog/images/reference/NAME.jpg in JSON and converted to ../catalog/images/reference/NAME.jpg at render time. This works locally and beneath GitHub Pages' /aayam-website/ prefix.
- Preview HTML loads styles.css and catalog.js with a 20260929 cache-busting query. Change that version if those shared files are later revised and browser caching impedes rollout.

## Current file map

| Path | Responsibility |
| --- | --- |
| index.html, styles.css, script.js, assets/ | Live-domain launch page; untouched by the current catalogue update |
| catalog/products.sample.json | Active 33-item reference-image catalogue and sample product data |
| catalog/images/reference/ | One normalized JPEG per active preview product; these copies are public when pushed |
| Products Images/ | Founder-supplied original downloaded references; kept locally, ignored by Git |
| catalog/images/placeholders/ | Historical four-category placeholder set; retained for provenance, no longer used by active products |
| preview/index.html | Full-site home with existing campaign pair, featured products and new category tiles |
| preview/all-jewellery.html | Searchable, filterable, sortable collection; category URLs use the category query parameter |
| preview/product.html | Single dynamic product template using the id query parameter |
| preview/catalog.js | Catalogue fetch, grid cards, formatting, WhatsApp link, navigation and search helpers |
| preview/styles.css | Shared responsive design system, gallery, collection and editorial styles |
| preview/our-story.html, materials-care.html, contact.html | New editorial content pages with current preview caveats |
| Business Context/ | Historical blueprint, visual specification, original copy draft and phase contract |
| PROGRESS.md, CHANGELOG.md, DEVELOPER_REFERENCE.md | Status, history and current engineering handoff |

## Catalogue contract and exact mapping

catalog/products.sample.json has sampleContent: true. Active IDs are AYM-RG-001–008, AYM-BR-001–008, AYM-CH-001–010, and AYM-PD-001–007. The visible names and short/long visual descriptions were rewritten for the reference photos; these are provisional and are not product facts. Retained records preserve their original weightGrams, sizeType, sizeOptions, sizeHelpText, variants, details and care values from the 45-product sample catalogue. These values may conflict with the photograph. The _readme and imageStatus fields, notice bar, cards and product page identify the preview state. Do not remove sample labelling until every displayed claim is checked.

Each normalized reference file corresponds to a source photo in alphabetic filename order within its category's original folder:

| Category | Source folder | Used source positions | Target files and IDs |
| --- | --- | --- | --- |
| Rings | Products Images/Men_s Rings/ | 3–10 of 10 | ring-01.jpg–ring-08.jpg → AYM-RG-001–008 |
| Bracelets | Products Images/Men_s bracelets/ | 1–8 of 8 | bracelet-01.jpg–bracelet-08.jpg → AYM-BR-001–008 |
| Chains | Products Images/Men_s chains/ | 1–10 of 10 | chain-01.jpg–chain-10.jpg → AYM-CH-001–010 |
| Pendants | Products Images/Men_s Pendants/ | 1–6 and 8 of 8 | pendant-01.jpg–pendant-07.jpg → AYM-PD-001–007 |

Held composite sources are Rings/download (1).jpg, Rings/download (10).jpg and Pendants/download (2).jpg. They are not copied to the public preview. The other 12 old dummy IDs have been removed from the active JSON; old data can be recovered from Git history. Product detail URLs for unknown or removed IDs display an unavailable-preview message. The HTML does not claim that a source photo represents an actual Aayam SKU.

Images.primary, images.alternate and images.detail all point to the same file for each product. No physical duplicate files were created; images.onBody remains null. The product gallery renders three positions and says explicitly that they repeat one reference photo. The home category tiles use the first image in each category. Existing campaign images in preview/images/ are unchanged.

## Frontend behaviour

- preview/catalog.js loads ../catalog/products.sample.json. All Jewellery builds its cards from this data and supports category, gold-colour and karat filters, search, price sort and active-filter chips. Four homepage featured cards take the first record of each category.
- Product pages use product.html?id=SKU. The variant selector reads each record's explicit sample variants; it does not invent colour/karat combinations. Selected sample price changes with the variant. Size selection or the sizing-help path enables the enquiry link.
- The enquiry link opens a prepared wa.me URL to demo number +91 7265000916, containing product name, ID, selected colour/karat/size and the product URL. The visitor chooses whether to send it. Contact lists the demo number and thehouseofaayam@gmail.com. No form or checkout exists.
- Header, mobile drawer and footer markup are duplicated across the six preview HTML files. Keep them consistent when changing navigation or notice copy. The editorial pages use shared CSS classes; Materials & Care retains the #fit anchor used by Find your size.
- The preview pages have noindex metadata and a visible notice. Root robots.txt currently disallows crawlers. These do not make the GitHub Pages preview private.
- The visual direction is white/pale-grey with restrained charcoal typography and rules, based on the Phase 2 Miansai audit. Use Aayam's own copy and assets, and do not ship competitor screenshots.

## Current editorial boundaries

Our Story uses broad brand positioning drawn from the local pitch: everyday self-expression, considered design and clarity in choosing. It intentionally omits founder names, the family business, manufacturing history and future service promises. Materials & Care gives general education but states that preview product compositions, sizes, karats, care and prices are samples. Contact provides WhatsApp and email actions, with the WhatsApp number visibly marked as demo. Do not add unverified hallmarking, alloy, stone, sizing, warranty, exchange, shipping, stock or response-time claims.

## Verification and release

For a preview change, check JSON parses; exactly 33 active IDs and 33 files exist; category counts remain 8/8/10/7; all image references resolve; titles/slugs are unique; retained sample fields remain intact unless intentionally changed; and node --check preview/catalog.js passes. Check home, all four categories, search/filter/sort, a product with variants and size, an unknown ID, the three repeated gallery positions, prepared WhatsApp URL, #fit anchor and the editorial pages at desktop and mobile widths. Inspect git diff --check before committing.

Pushing main updates the public GitHub Pages preview. Verify that URL after the Pages build. A GitHub push does not deploy to Netlify. Before a live-domain release, replace reference imagery with photos Aayam may publish and verify every product price, weight, metal, stone, colour/karat pairing, dimension, fit, care and availability; confirm business contact and ordering information; review page copy; then approve a separate Netlify/domain switch.
