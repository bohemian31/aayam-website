# Earring catalogue integration — 21 October 2026

The founder approved 13 earring designs for the public GitHub Pages preview. The local selected masters and rejected attempts remain ignored; only approved delivery WebPs are exported. The root launch page/Netlify domain is outside this change.

## Product mapping

| ID | Product | Approved source key | Views |
| --- | --- | --- | --- |
| AYM-ER-101 | Avir Curve Hoop Earring | rounded-tapered-warm-hoop-earring | Hero + alternate + worn |
| AYM-ER-102 | Nirav Disc Stud | plain-warm-disc-stud | Hero + alternate + worn |
| AYM-ER-103 | Rihan Framed Disc Stud | warm-meander-dark-disc-stud | Hero + alternate + worn |
| AYM-ER-104 | Kavi Matte Disc Stud | matte-black-disc-stud | Hero + alternate + worn |
| AYM-ER-105 | Arka Petal Crescent Hoop | petal-engraved-crescent-hoop | Hero + alternate + worn |
| AYM-ER-106 | Ojas Ball-End Hoop | silver-ball-ended-horseshoe-hoop | Hero + alternate + worn |
| AYM-ER-107 | Samar Accent Hoop | dark-accented-hoop | Hero + alternate + worn |
| AYM-ER-108 | Tejas Facet Hoop | faceted-dark-hoop | Hero + alternate + worn |
| AYM-ER-109 | Rion Ball Stud | small-warm-ball-stud | Hero + worn |
| AYM-ER-110 | Kiaan Flat Hoop | plain-dark-flat-hoop | Hero + alternate + worn |
| AYM-ER-111 | Ayaan Bevel Hoop | warm-bevelled-hoop | Hero + alternate + worn |
| AYM-ER-112 | Devan Fine Hoop | fine-silver-tone-hoop | Hero + alternate + worn |
| AYM-ER-113 | Neer Slim Hoop | slim-dark-round-hoop | Hero + alternate + worn |

## Selection and implementation

- Kiaan Flat Hoop and Ayaan Bevel Hoop use the penultimate alternate images **with a thin top detail**. The later bar-less versions remain under local `_attempts/` and are absent from public exports.
- Ayaan and Rion worn images reflect the founder-requested smaller on-ear scale. Rion has no alternate; its rejected alternate is kept only in local history. The dropped Aarav Round-Front Hoop is entirely excluded.
- `scripts/build_earring_catalogue.py` validates approvals, selected PNG hashes and 1254 × 1254 dimensions, then exports 38 square WebPs at quality 90. `catalog/earrings.media.json` records approved/export hashes; `catalog/earrings.content.json` holds authored text. The runtime catalogue contains AYM-ER-101–113.
- Product pages have visually descriptive copy, fit/care notes, explicit gallery labels and enquiry prompts for dimensions, closure/backing and singly/pair configuration. Materials, karat, stones, weight, price, size and availability remain unconfirmed.
- Collection cards dissolve from hero to worn on desktop hover and keyboard focus. The worn image is decoded before reveal; reduced-motion, touch and missing-image cases retain a usable hero. Rion uses its second view for hover.
- The homepage, category links, search/filter labels and visible preview notice include Earrings. All 46 prior products remain in their previous order and data. Campaign imagery and the live-domain launch page are unchanged.

## Verification and limits

Run `python3 scripts/build_earring_catalogue.py` from a checkout with the ignored approved masters, then serve the repo over HTTP and run `node scripts/verify_catalogue.cjs` with Playwright. The browser checks cover 42 enquiry routes, 125 gallery views, correct enquiry identities, product/category links, hover/focus/fallback, sample-category flow, noindex and mobile layouts. Local screenshots and reports are in `output/catalogue-images/integration-review/earrings/`.

The generated images are illustrations based on curated design photos. Unseen reverse geometry, hoop closures, fine motifs and on-ear scale cannot be verified from the available one-view sources. Confirm physical specifications and whether a design is sold singly or as a pair before presenting those as facts or moving this collection to the live domain.
