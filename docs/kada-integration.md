# Kada catalogue integration — 22 October 2026

The founder approved five image sets for the existing public GitHub Pages preview. K1's gold- and silver-toned pieces are separate linked colourway listings. The k4 worn selection is the **second revised option** shown in the final correction round (`03-worn.png` in the approved master, archived earlier attempts under the ignored review folder). The root Netlify launch page and live domain are outside this change.

| ID | Public working name | Source | Selected views |
| --- | --- | --- | --- |
| AYM-KD-101 | Veyar Cutout Kada — Gold Tone | k1 gold foreground | Hero, clasp/detail, on wrist |
| AYM-KD-102 | Veyar Cutout Kada — Silver Tone | k1 silver background | Hero, clasp/detail, on wrist |
| AYM-KD-103 | Samar Tri-Tone Kada | k2-1 through k2-4 | Hero, alternate, on wrist |
| AYM-KD-104 | Rudra Scrollwork Kada | k3 | Hero, engraving detail, on wrist |
| AYM-KD-105 | Arka Twin-Line Kada | k4 | Hero, alternate, on wrist |

## Implementation

Selected 1254 × 1254 PNG masters, source provenance, hashes and approval manifests live under ignored `output/catalogue-images/approved/kada/`. Earlier revisions and generated attempts remain ignored under `review/kada/`. `scripts/build_kada_catalogue.py` checks all selected hashes, approval status and dimensions before exporting 15 quality-90 WebPs to `catalog/images/kada/`. `catalog/kada.media.json` records master/export hashes; `catalog/kada.content.json` records image-grounded product copy. The builder changes only Kada catalogue records and can be rerun without duplicating them.

The five catalogue entries are enquiry-only: no sample price, karat, weight, size, material or availability claims. Product pages have three distinct labelled views, wrist-fit questions and product-specific WhatsApp/email messages. Veyar's two pages link to each other through illustrated colourway controls; these are visual options rather than verified metal specifications. The collection card's third image supplies the existing hero-to-worn hover dissolve. Kada appears in the category filter, homepage tile, navigation, footer and fit guidance.

## Verification and limits

Run the builder from a checkout with the ignored approved masters, serve the repository over HTTP, then run `node scripts/verify_catalogue.cjs` with Playwright. Local and deployed GitHub Pages browser checks pass for 47 enquiry routes and 140 selected gallery views, desktop/mobile layouts, filters, search, hover/focus/touch behaviour, enquiries, colourway links, sample-category flow and unavailable retired IDs. Screenshots and reports are under ignored `output/catalogue-images/integration-review/kada/`. The published category is `https://bohemian31.github.io/aayam-website/preview/all-jewellery.html?category=Kada`.

K1's source photo cuts off part of both pieces and overlaps the silver one. The complete forms and hidden construction shown in the illustrations are interpretations. K3 and k4 have one source view each. K3's worn view hides its coiled ends behind the wrist; k4's revised worn fit remains illustrative. Confirm actual metal, colour, dimensions, opening/closure, finish, weight, price and availability before making these claims or moving to the live domain. Source photographs, prompts, provenance and rejected images are not exported publicly.
