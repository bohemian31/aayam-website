# Rings catalogue integration — 21 October 2026

## Scope and sequence

1. Approve the six selected batch-004 sets. Canonical approved masters now cover 20 ring designs and 60 independently generated views.
2. Curate six outstanding source photos into the local `output/catalogue-images/deferred/rings/to-do/` queue with their annotations, reasons and next steps. Source no-1/2/3 need selection; no-5/6/7 need clearer or additional photographs. Keep incomplete alternative renders out of the catalogue.
3. Author names, summaries, descriptions and visible design details in `catalog/rings.content.json`. Use image-based colour and finish language. Prices, composition, karat, weight, dimensions, availability and size options remain to be confirmed on enquiry.
4. Export approved masters as square WebP assets under `catalog/images/rings/<product-key>/`. Replace all eight previous ring listings with 20 new records. Use new IDs AYM-RG-101–120 so old product references cannot silently change identity. Keep the other 25 category records intact.
5. Update collection cards, homepage ring tile, filters, price sorting, three-view galleries, accessible gallery labels and ring-specific WhatsApp/email enquiries. Show that ring imagery is illustrative. Keep the demo contact designation and site preview metadata.
6. Check all 60 assets and 20 product pages, card/search/filter results, image switching, enquiry content, removed-ID state, and desktop/mobile layouts. Check non-ring behaviour too.
7. Commit the reviewed website assets, content, frontend and developer notes; push the existing GitHub Pages preview and verify the deployed revision. Root launch-page assets and Netlify configuration are outside this change.

## Sources and regeneration

`catalog/rings.content.json` holds the authored copy and source keys. Run `python3 scripts/build_ring_catalogue.py` locally with Pillow and the approved masters available at `output/catalogue-images/approved/rings/`. It writes ring records and delivery assets only. Production originals, annotations, prompts and deferred photos remain in the ignored local output tree.

The new records have `catalogueStatus: enquiry`, no numeric prices, no invented variants or size ranges, and a three-role gallery. `catalog/rings.media.json` records public ID/asset mapping and source/export hashes. This integration does not establish physical product specifications from generated imagery.

## Product mapping

| ID | Product | Approved source key |
| --- | --- | --- |
| AYM-RG-101 | Kavi Verdant Inlay Band | green-inlay-band |
| AYM-RG-102 | Rudra Scrollwork Band | ornate-charcoal-floral-band |
| AYM-RG-103 | Arka Tri-tone Hammered Band | tri-tone-hammered-band |
| AYM-RG-104 | Kiaan Mosaic Accent Band | mosaic-inlay-square-accent-band |
| AYM-RG-105 | Vana Leafwork Band | charcoal-leaf-interior-band |
| AYM-RG-106 | Dhruv Segmented Band | segmented-rose-gold-stone-band |
| AYM-RG-107 | Zaal Channel Accent Band | two-tone-channel-accent-band |
| AYM-RG-108 | Aum Twin Rail Ring | twin-rail-gold-white-accent-ring |
| AYM-RG-109 | Tejas Faceted Rail Band | faceted-two-tone-r1-band |
| AYM-RG-110 | Nirav Textured Curve Band | textured-center-silver-band |
| AYM-RG-111 | Rang Mosaic Band | multicolor-mosaic-stripe-band |
| AYM-RG-112 | Samar Woven Facet Band | woven-tritone-faceted-band |
| AYM-RG-113 | Neer Green Line Band | green-double-inlay-band |
| AYM-RG-114 | Veyar Hammered Facet Band | faceted-two-tone-wide-band |
| AYM-RG-115 | Bhanu Hammered Band | hammered-faceted-gold-band |
| AYM-RG-116 | Kairo Angular Inlay Band | angular-rose-inlay-silver-band |
| AYM-RG-117 | Rihan Contour Band | dark-two-tone-contour-band |
| AYM-RG-118 | Tarun Twin Line Band | double-rose-rail-brushed-band |
| AYM-RG-119 | Aarav Edge Band | rose-edge-brushed-band |
| AYM-RG-120 | Mihir Tri-tone Band | tritone-stripe-band |

## Validation record

Local browser verification passed on 21 October 2026 for every ring route and all 60 image switches, enquiry messages, filters/search/sort, the sample-category flow, removed-ID state and desktop/375px layouts. Screenshots and the detailed report are in the ignored `output/catalogue-images/integration-review/` folder. The web image exports total approximately 6.18 MB; approved PNG masters remain local. Use the verification script with the GitHub Pages base URL after deployment.
