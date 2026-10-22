# Project progress — The House of Aayam

Last updated: 22 October 2026. CHANGELOG.md preserves the historical sequence; this file describes the current source revision.

## Current website preview

The GitHub Pages preview source contains **64 products**: 20 Rings, 9 Bracelets, 13 Earrings, 5 Kada, 10 Chains and 7 Pendants. Rings, Bracelets, Earrings and Kada use image-led, enquiry-only records. The 17 Chain/Pendant reference listings still have clearly labelled sample facts. The public preview retains a notice and `noindex`, which do not make it private. The root launching-soon page, Netlify deployment and live domain are unchanged.

All five Kada image sets are approved for the preview: the k1 gold and silver looks are linked pictured colourways, k2 uses the selected symmetrical hero and first revised worn view, k3 has the stray worn-view curl removed, and k4 uses the founder's second revised worn option. Their 15 WebPs are under `catalog/images/kada/`; the local masters and source evidence remain ignored under `output/catalogue-images/approved/kada/`. See `docs/kada-integration.md` for mapping and limitations.

All 13 Earrings are approved for the preview: Avir sample, four batch-001, three batch-002 and five batch-003 designs. The selected local masters are under `output/catalogue-images/approved/earrings/`; 38 exported square WebP views are under `catalog/images/earrings/`. Each design has hero, alternate and worn, except Rion Ball Stud, which has **hero and worn only** at the founder's direction. The earlier Kiaan and Ayaan alternate views **with the thin top detail** were selected; later versions without that detail are archived locally. Ayaan and Rion worn earrings were reduced roughly 20–25% in their images. The dropped Aarav design remains excluded.

The Earring pages have visually descriptive copy, product-specific enquiry prompts, fit/care guidance, and explicit gallery labels. The All Jewellery grid dissolves from hero to worn on hover/focus, including Rion, with a safe fallback if the worn image fails. Touch retains the hero. The homepage links to Earrings. No unverified material, karat, stones, weight, size, closure, price, availability or single/pair configuration is claimed. WhatsApp remains visibly a demo number (+91 7265000916); email is thehouseofaayam@gmail.com.

The 20 approved Rings retain 60 views; the 9 approved Bracelets retain 27; the 13 Earrings retain 38; the 5 Kada add 15, for **140 selected enquiry-product views**. Old AYM-RG-001–008 and AYM-BR-001–008 links display unavailable rather than opening a different design. The 17 Chain/Pendant samples remain intact. All category images and on-body scale are generated illustrations; physical-product details must be confirmed before a live-domain launch.

## Verification and limits

Local browser checks cover 47 enquiry routes, 140 selected gallery images, enquiries, search/filter/sort, collection hover/focus/reduced motion/failure fallback, retired IDs, sample-category behaviour, homepage/noindex and desktop/mobile layouts. Reports and screenshots are under ignored `output/catalogue-images/integration-review/kada/`. The builder verifies every selected master hash and 1254 × 1254 dimensions before exporting. The public exports are the selected approved images only; source photos, prompts, rejected attempts and annotated references stay in the ignored production archive.

Some source photos reveal only a single perspective. K1 is partly cropped and overlapped, and k3/k4 have one source angle each; their hidden construction and worn fit remain illustrative. Rion's unseen back, hoop closures, Devan/Neer's isolated profiles, fine motifs and exact worn scale remain interpretations. Those uncertainties are reflected in the customer copy as questions to confirm, not product facts. There are no more earring designs in the agreed source scope beyond the explicitly excluded Aarav. Six difficult Rings remain in `output/catalogue-images/deferred/rings/to-do/` and require selection or stronger source evidence. Other product categories await later production.

## Developer entry points

- `docs/rings-integration.md`, `docs/bracelets-integration.md`, `docs/earrings-integration.md`, `docs/kada-integration.md`: mappings, implementation and limitations.
- `catalog/products.sample.json`: active runtime catalogue.
- `catalog/{rings,bracelets,earrings,kada}.content.json`: authored product names and copy.
- `catalog/{rings,bracelets,earrings,kada}.media.json`: selected-master and export hashes.
- `scripts/build_{ring,bracelet,earring,kada}_catalogue.py`: repeatable exports from approved local masters.
- `scripts/verify_catalogue.cjs`: browser checks against a local or deployed preview.
- `DEVELOPER_REFERENCE.md`: runtime data contract, file map and release notes.

September phases 1–5 established the static structure and 45-item dummy catalogue. The 29 September revision used 33 single-photo reference listings. October Ring and Bracelet production superseded their earlier placeholders; Earrings and Kada have since been added. Our Story, Materials & Care and Contact retain the editorial work completed in September. Public copy omits unconfirmed founder/manufacturing history and future services. No checkout, form, account system, support hours, availability or lead-time promises have been added.
