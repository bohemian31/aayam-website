# Bracelet catalogue integration — 21 October 2026

## Scope and implementation

The founder requested the generated bracelet sets on the existing GitHub Pages preview, with authored product content and the same hero-to-worn hover as Rings. This authorizes use of all eight batch-001 sets alongside the already approved crimson sample. It does not verify physical product construction.

1. Copied the selected masters to nine approved/bracelets/ folders, preserving exact images, hashes, prompts, source evidence and the noted construction limitations.
2. Authored nine names, summaries, descriptions, appearance labels and design/finish details in catalog/bracelets.content.json. Kept prices, composition, karat, weights, dimensions, fit, fastening and availability unconfirmed.
3. Exported 27 native 1254 × 1254 WebPs at quality 90 and recorded their approved-master/export hashes in catalog/bracelets.media.json. Public assets are under catalog/images/bracelets/. Local PNGs, source photos and generation prompts remain ignored.
4. Replaced the eight old placeholder bracelet records with nine new IDs AYM-BR-101–109; old AYM-BR-001–008 references now show the unavailable state. Preserved all 20 rings, 10 chains and 7 pendants. Total: 46 products. Removed the eight unused old public bracelet reference exports.
5. Reused the existing 360ms collection hover dissolve with images.onBody pointing to the third/worn asset. Desktop pointer hover and keyboard focus reveal the decoded worn image; touch retains hero, reduced motion skips animation, and a missing worn image leaves hero usable.
6. Made enquiry pages category-aware: Bracelets breadcrumb, wrist sizing and fastening guidance, Hero / Detail / On wrist labels, indicative-image note, and WhatsApp/email product identity. Updated the homepage bracelet tile, category intro, category-specific design tags and preview notices. Bracelet pages do not expose dummy material, karat, size or price controls.
7. Checked all 29 enquiry product routes and 87 gallery assets, filters/search/sorting, hover/focus/reduced-motion/failure behaviour, retired IDs, sample-category behaviour, homepage links, noindex and 375px touch layouts. Static integrity checks also confirm the other 37 records are unchanged. Local browser verification passed; evidence is under output/catalogue-images/integration-review/bracelets/.

## Product mapping

| ID | Product | Approved source key |
| --- | --- | --- |
| AYM-BR-101 | Rudra Oval Link Bracelet | textured-oval-link-bracelet |
| AYM-BR-102 | Arka Geometric Line Bracelet | rose-geometric-accent-bracelet |
| AYM-BR-103 | Nirav Curb Link Bracelet | dark-curb-link-bracelet |
| AYM-BR-104 | Tejas Chevron Link Bracelet | graphite-chevron-link-bracelet |
| AYM-BR-105 | Zaal Angular Link Bracelet | two-tone-angular-link-bracelet |
| AYM-BR-106 | Ravik Crimson Weave Bracelet | crimson-woven-link-bracelet |
| AYM-BR-107 | Ravik Indigo Weave Bracelet | blue-woven-link-bracelet |
| AYM-BR-108 | Kavi Mosaic Link Bracelet | two-tone-mosaic-link-bracelet |
| AYM-BR-109 | Ansh Interlock Cord Bracelet | olive-interlocking-link-cord-bracelet |

## Rebuild and verification

Run python3 scripts/build_bracelet_catalogue.py with Pillow and the local approved bracelet masters available. The script checks approvals, selected hashes and dimensions before export and changes only bracelet records. Delivery assets total 4.14 MB. No API or image generation is part of this build.

Run node scripts/verify_catalogue.cjs against a local HTTP server, or pass the deployed preview base URL. Playwright is required; BROWSER_EXECUTABLE can select an installed Chromium browser. scripts/verify_ring_catalogue.cjs remains a compatibility entry point to the full checks.

## Unverified facts

Arka, Tejas, Zaal and Ansh have limited rear/closure evidence. Zaal plate overlap and Kavi tiny accents need clearer source detail for exact physical verification. Generated fine geometry and on-wrist proportions remain indicative. Public copy describes visible forms and asks for confirmed specifications; it does not assert alloys, gemstones, purity, dimensions, service, availability or prices. Only the LEFT interlocking-link cord bracelet from b8.jpg is used. The right screw-clasp design is excluded.

The preview remains public and noindex. The root launching-soon site and Netlify/domain deployment are outside this release.
