# Developer reference — The House of Aayam

Current source revision: 24 October 2026. Read PROGRESS.md for status, CHANGELOG.md for history, and `docs/*-integration.md` for image provenance and limits.

## Hosting and boundaries

Repository: https://github.com/bohemian31/aayam-website (`main`). Preview: https://bohemian31.github.io/aayam-website/preview/index.html. The root `index.html`, `styles.css`, `script.js` and `assets/` are the separate Netlify launching-soon site; this catalogue release does not change them or the live domain. GitHub Pages preview is public even with its visible notice and `noindex`. There is no backend, CMS, account or checkout. Serve this repository over HTTP because the preview fetches JSON.

Frontend cache key: `20261024-full-catalogue-1` in `preview/*.html` and `preview/catalog.js`. Increment it when changing frontend/data. Relative paths support the GitHub Pages repository prefix.

## Active data and files

`catalog/products.sample.json` is the stable runtime filename despite its historical name. It now has 60 unique active IDs and no sample listings: AYM-RG-101–120, AYM-BR-101–109, AYM-ER-101–113, AYM-KD-101–105, AYM-CH-101–102, AYM-CL-101–107 and AYM-AC-101–104. Old AYM-CH-001–010, AYM-PD-001–007 and earlier Ring/Bracelet IDs must show the unavailable state, never map to another piece.

Every active record has `catalogueStatus=enquiry`, `sampleContent=false`, `pricingStatus=on_enquiry`, `specificationStatus=confirm_on_enquiry`, `weightGrams=null`, `variants=[]` and `sizeOptions=[]`. Keep numeric price, purity, metal, gemstone, dimensions, weight, fastening, availability and fit claims out until verified. `appearanceLabel`, `designTags`, description, details, fit/care and gallery notes describe visible form or ask for confirmation. `images.onBody` supplies the collection-card hover view. A `gallery` array specifies the actual selected views; it need not contain exactly three.

The new product prose is authored in `catalog/new-collection.content.json`; `catalog/new-collection.media.json` records source and export hashes. `scripts/build_new_collection.py` checks approved local manifests and 1254×1254 PNG hashes before exporting WebPs into `catalog/images/{chains,cufflinks,accessories}/` and merging records. **Run it last** if rebuilding older categories, because their historical builders still write previous catalogue-level category/sample metadata. Earlier category sources and builders live under `catalog/{rings,bracelets,earrings,kada}.*.json` and `scripts/build_{ring,bracelet,earring,kada}_catalogue.py`. Do not run the new builder without ignored local approved masters, or replace approved images with review attempts.

Selected masters, source photographs, prompts and rejected/deferred variants live under ignored `output/catalogue-images/`. No raw sources or full production folder should be committed. `docs/new-collection-integration.md` maps the selected Chain, Cufflink and Accessory sets; the older `docs/*-integration.md` files map prior categories.

## UI behavior

`preview/catalog.js` loads data, renders cards, and builds WhatsApp/email messages. `preview/collection.js` handles categories, design filters, search and sorting. `preview/product-gallery.js` renders variable galleries and switches the two illustrated band-charm looks. The custom monogram has seven views: three script, three DN and one NG worn view. It must not acquire an NG hero or alternate. The two band-charm records each own two three-view `visualOptions`; default silver/beige is used on the grid and the selected option updates gallery and enquiry links on the product page.

Collection cards fade hero into the worn image on fine-pointer hover and focus after decoding; touch keeps hero and a failed worn image leaves the hero. Prices stay “Price on enquiry”. Gold-colour/karat and price-sort controls are absent or hidden because there are no verified options/prices. The homepage category row shows only Rings, Bracelets, Earrings and Kada; all seven categories are in the drawer/footer and filter.

## Checks and release

With Pillow and approved masters present, run `python3 scripts/build_new_collection.py`. Serve the repo over HTTP, then run `node scripts/verify_catalogue.cjs` with Playwright available. On this machine use the bundled Node module path (`NODE_PATH=/Users/kp/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules`) and `BROWSER_EXECUTABLE=/Applications/Brave Browser.app/Contents/MacOS/Brave Browser`. The browser check also accepts a deployed preview base URL. It checks all 60 product routes, 183 gallery slots, counts, search, options, enquiries, removed IDs, homepage and responsive overflow. Run `git diff --check`, review the changed files, publish only the preview/catalogue change to `main`, then verify GitHub Pages. Live-domain release is a separate decision requiring confirmed product/business facts and a real contact number.
