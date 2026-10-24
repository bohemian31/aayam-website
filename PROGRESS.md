# Project progress — The House of Aayam

Last updated: 24 October 2026. See CHANGELOG.md for the history and DEVELOPER_REFERENCE.md for the current build contract.

## Live-domain release

A separate production bundle is prepared at ignored `dist/`, with a matching ZIP under `output/aayam-live-site-2026-10-24.zip`. It is built from the checked 60-product catalogue by `scripts/build_live_site.py` and passed `scripts/verify_live_site.cjs` locally. It uses the founder's real WhatsApp number **+91 94294 32142**, serves the catalogue at the domain root, removes preview-only copy and indexing blocks, and keeps product details on enquiry. The founder uploaded it to the existing Netlify project `zippy-pasca-aa1745` on 24 October 2026. Netlify marked deploy `6adca8b686491da2a1fb3e81` **Published**. The live apex and `www` route show the catalogue; the 60-piece grid, a three-image product page, WhatsApp/email enquiry destinations, contact page and `robots.txt` were checked in-browser. `docs/live-deployment.md` gives rebuild and rollback steps.

## Current preview

The GitHub Pages preview source contains **60 enquiry-only products**: 20 Rings, 9 Bracelets, 13 Earrings, 5 Kada, 2 Chains, 7 Cufflinks and 4 Accessories. The 10 older Chain and 7 Pendant reference listings and their sample prices/specifications have been removed from the active catalogue. The warm oval Chain remains deferred. The graphite bridged-link Chain was included at the founder's direction. The 6 difficult deferred Rings remain outside the catalogue. The root launching-soon source remains in Git as a rollback reference; the Netlify live domain now serves the separate production build.

Each active listing has visual descriptions, product-specific questions for enquiry, a price-on-enquiry state and a selected illustrated gallery. The new Chain, Cufflink and Accessory listings add 49 image views, for **183 selected gallery views** overall. Custom Monogram Cufflinks combines the script, DN and NG examples as one product; **NG is worn-view only**. The racket and ball band charms are separate products, each with silver/beige and gold/black illustrated looks. These looks switch all three product images and carry the selected label into the enquiry message.

The homepage “Shop by category” row is back to four featured tiles: Rings, Bracelets, Earrings and Kada. Chains, Cufflinks and Accessories remain in the navigation, footer, all-jewellery category filter and featured collection. Product cards on All Jewellery dissolve from hero to worn on fine-pointer hover; touch retains the hero. The site keeps a visible preview notice and `noindex`, but GitHub Pages is public.

## Product and media limits

The images are generated illustrations informed by source photos of intended products, not verified production photographs. In particular, cufflink backings, chain clasps and link construction, charm attachment and device/frame compatibility, materials, purity, dimensions, weight, pricing, stock, and worn scale are not established. A customer enquiry must confirm the finished piece and ordering terms. The GitHub Pages preview still shows the demo WhatsApp number (+91 7265000916); the live production build uses +91 94294 32142. The email is thehouseofaayam@gmail.com. There is no checkout or contact form.

Selected PNG masters, source photos, attempts and manifests stay in the ignored `output/catalogue-images/` production archive. The website uses quality-90 square WebP exports under `catalog/images/`. The new export map is `catalog/new-collection.media.json`; its authoring data is `catalog/new-collection.content.json`. No source or rejected attempt belongs in the public export. See `docs/new-collection-integration.md` for the mapping and exceptions. Earlier category-specific mapping remains in `docs/{rings,bracelets,earrings,kada}-integration.md`.

## Verification and remaining work

The local Playwright check covers all 60 product routes, 183 gallery views, category counts, search, image paths, enquiry identity, illustrated options, retired IDs, four homepage tiles, noindex and desktop/mobile overflow. The production build passed its own local browser check before upload; the new builder checks every PNG hash and native 1254 × 1254 dimensions. The published site has been spot-checked in-browser; a full 60-route test against the live domain has not been run. Business and finished-product facts remain to be confirmed on enquiry.
