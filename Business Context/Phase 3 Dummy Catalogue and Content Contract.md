# Phase 3 — Dummy catalogue and content contract

27 September 2026 · Ready for Gate 3 review · No template or page has been built yet; this is data and rules for Phase 4 to consume.

This document is the Phase 3 deliverable defined in `Implementation Plan and Gates.md`. It does not change `index.html`, the launching-soon page, or any live deployment. Gate 2 was accepted in this session: the founder confirmed the white/pale-grey, charcoal-text, quiet-tone Miansai-style direction from `Phase 2 Visual Specification.md` for the catalogue draft, four separate categories (Rings, Bracelets, Chains, Pendants), original Aayam-style product names, and sample pricing anchored to the founder's own cost/pricing data. The early logo decision was not revisited here and remains as Phase 2 left it (kept for the first draft, to be tested at header sizes during Phase 4).

## 1. Catalogue data file

`catalog/products.sample.json` holds 12 representative dummy products, three per category (Rings, Bracelets, Chains, Pendants), with 36 gold-colour/karat variant combinations in total. It is marked `sampleContent: true` at the file and product level and must not be read as real inventory. Its structure is meant to extend to the ~45-product Phase 5 catalogue without a schema change.

### Product record schema

| Field | Type | Notes |
| --- | --- | --- |
| `id` | string | Stable SKU-style ID, e.g. `AYM-RG-001`. Prefix maps to category: RG/BR/CH/PD. |
| `slug` | string | URL slug for the product page. |
| `name` | string | Invented Aayam style name + material/stone + type, e.g. "Kavi Onyx Signet Ring." Never reuses a Miansai product or collection name. |
| `category` | string | One of the four confirmed categories. |
| `shortDescription` | string | One line, used on cards and previews. |
| `description` | string | Follows the Page Copy Draft template: "[Name] pairs [design detail] with [material/finish]. [A concrete sentence about scale, silhouette or wear]." |
| `weightGrams` | number | Approximate, used only to justify the sample price; not a fabricated certification. |
| `sizeType` | string | "Ring size," "Bracelet length," or "Chain length." |
| `sizeOptions` | array | The explicit offered choices; never assume a full range exists. |
| `sizeHelpText` | string/null | Label for a "the customer doesn't know their size" path; `null` where sizing doesn't apply (e.g. the stretch-fit bead bracelet). |
| `variants` | array of `{goldColour, karat, priceINR}` | An explicit list, not a cross-product. A colour/karat pair not listed is not offered and must not appear as selectable. |
| `details` | object | `composition`, `dimensions`, `fastening`, `includes` — for the Details accordion. |
| `care` | string | For the Fit & Care accordion. Ordinary jewellery-care language; no manufacturer-specific claims. |
| `images` | object | `primary`, `alternate`, `detail`, `onBody` — see §5. All twelve products currently reference the same one shared placeholder photo per category. |
| `imageStatus` | string | Literal traceability note that the image is a shared placeholder pending real photography. |

### Category and variant summary

| Category | Products | Gold colours used | Karats used | Sample price range |
| --- | --- | --- | --- | --- |
| Rings | Kavi Onyx Signet, Arka Plain Band, Veyar Malachite Signet | Yellow, Rose, White | 9K–22K | ₹33,500–₹79,000 |
| Bracelets | Dhruv Cuban Curb, Nirav Rope Chain, Samar Onyx Bead | Yellow, White | 9K–18K | ₹65,000–₹1,01,000 |
| Chains | Ansh Box Chain, Mihir Curb Chain, Kairo Statement Curb Chain | Yellow, Rose, White | 9K–18K | ₹65,000–₹2,43,000 |
| Pendants | Rihan Bar, Ojas Disc, Tavi Arrow | Yellow, Rose, White | 9K–22K | ₹57,000–₹1,39,000 |

No product offers every colour × karat combination; several deliberately restrict to one colour or one karat pair, to exercise the "never imply full availability" rule at the template level. The Kavi Onyx Signet Ring specifically offers 14K/18K in Yellow but only 14K in Rose, so the product template's "disabled — not offered in this combination" state has at least one real case to render (added after Phase 4 testing showed no product exercised it).

## 2. Pricing methodology (sample only)

Sample prices are not a pricing policy. They are anchored to the founder's own investor-deck figures (`Business Context/The House of Aayam - iSPROUTE'26.pdf`, page 6) so the draft catalogue feels plausible rather than arbitrary:

1. The deck's stated costs (9K ~4g ring ≈ ₹29,100 total cost; 14K ~4g ring ≈ ₹44,200; 9K ~15g chain ≈ ₹1,06,000; 14K ~15g chain ≈ ₹1,60,900) imply a consistent rate of about ₹15,650 per gram of pure (24K) gold plus roughly 17–24% making/other costs.
2. That rate was used to estimate gold cost for 18K and 22K, and for the assumed weights of bracelets (8g) and pendants (7g), which the deck doesn't price directly.
3. A retail price was then derived at roughly cost × 1.15, matching the deck's own "value-based pricing" example (Everyday 14K Ring: cost ≈ ₹44,200 → selling price ₹51,000), and rounded to a clean figure.
4. Results land mostly in the deck's "Core" tier (₹28,000–₹1,50,000, 9K/14K gold), with the heavier 18K/22K chain and bracelet pieces reaching into "Aspirational" (₹1,50,000+), and the lighter 9K rings near the bottom of Core. No Entry-tier (silver/vermeil) items are included, since the confirmed range is gold-only.

This is a deliberately simple, explainable estimate — not a costing model. Real prices must come from the founder or Payal Jewellers before any public release, and this methodology note should be deleted once they do.

## 3. Display rules

### Product cards (collection grid)

- Desktop: name, material (gold colour + karat of the *first/default* variant), sample price — centred, above the image. Mobile: image first, then the same three lines below it, left-aligned. This matches the directly observed Miansai pattern in `Phase 2 Visual Specification.md`.
- The price shown on a card is always the lowest-priced variant, prefixed "From" only when more than one price exists for the product (e.g., "From ₹51,000"); a single-variant product shows its one price directly.
- The material line names one real gold colour and karat; it must never say or imply "Available in multiple metals" without linking to where that's true.
- Cards never show a colour swatch or thumbnail for a variant not actually offered.

### Filters

- Filter groups: **Category**, **Gold colour**, **Karat**. Each filter option is only shown if at least one visible product currently offers it — an unavailable combination is not listed as a dead filter.
- Selecting Gold colour + Karat together must intersect correctly against each product's explicit `variants` list, not assume every product offers every combination.
- "Clear all" resets every active filter and restores the full 12-product set (45 at Phase 5).
- Empty result copy (from `Page Copy Draft v1.md`, unchanged): "No pieces match these choices." / "Try another combination or clear your filters to see the full collection."

### Sort

- Options: **Featured** (catalogue order below) and **Price: low to high / high to low**, sorted by each product's lowest listed variant price.
- No "Best selling" or "Most popular" sort — there is no real sales data behind either claim yet.

### Search

- Matches on product name and category name only (no fabricated tag/keyword data in Phase 3).
- Results label and empty state follow `Page Copy Draft v1.md` verbatim: "[Count] results for '[query]'." / "No pieces found for '[query]'." / "Try a product name, category or material."

### Product detail page

- Selecting a gold colour narrows the karat options to only those the product actually offers in that colour, and vice versa; an unavailable pairing is shown disabled with the text "Not offered in this combination," never hidden silently (so the customer understands why, per the Phase 2 spec's disabled-state rule).
- The price shown updates immediately to match the selected variant.
- Sizing: if `sizeHelpText` is set, show it as a secondary link/checkbox next to the size selector; selecting it is treated as a valid enquiry state ("Size: I need guidance") rather than blocking the enquiry button.
- The primary action is always labelled **Enquire about this piece** and is enabled once colour, karat, and (if applicable) size or the sizing-help option are chosen.

## 4. Enquiry message contract

Unchanged from `Page Copy Draft v1.md` and `DEVELOPER_REFERENCE.md`, restated here as the binding template for Phase 4:

> Hello, I'm interested in [product name] ([SKU]). My selection is [gold colour], [karat], [size/length or "I need guidance"]. Please share availability and ordering details. [Product URL]

- Destination: WhatsApp to the demo number **+91 7265000916**, via a `wa.me` link with the message URL-encoded. This prepares the message; the visitor sends it themselves. Do not auto-send.
- Email (`thehouseofaayam@gmail.com`) stays reachable from Contact, not from the product page enquiry button.
- Both destinations are demo/unverified and must be re-confirmed at Gate 6 before public release.

## 5. Image direction (placeholder set actually sourced this phase)

Per §8 of `Phase 2 Visual Specification.md`, a small shared placeholder set — not one photo per product — is sufficient for this stage. Four category placeholder photos were sourced from Unsplash (free tier, no attribution required per Unsplash's licence) and saved to `catalog/images/placeholders/`:

| File | Category | Source |
| --- | --- | --- |
| `ring.jpg` | Rings | `images.unsplash.com/photo-1708222169835-6329be77bee6` |
| `bracelet.jpg` | Bracelets | `images.unsplash.com/photo-1602173574767-37ac01994b2a` |
| `chain.jpg` | Chains | `images.unsplash.com/photo-1585711715631-1e6bf224f092` |
| `pendant.jpg` | Pendants | `images.unsplash.com/photo-1779238226276-79d6cc60fdb1` |

Limits, read before Phase 4 uses these:
- None of the four are true pale-grey studio product shots on Miansai's exact tile background — they're the cleanest single-item, non-worn photos found within Unsplash's free (non-Unsplash+) tier for each category. `bracelet.jpg` in particular sits on a warm editorial background, not neutral grey. Phase 4 should either crop/treat them to sit inside a pale-grey tile, or replace them if a better free source turns up.
- Every product in a category currently points to the *same* file for primary/alternate/detail. This is intentional for Phase 3 (one shared placeholder per category, per spec) and is visibly repetitive once real templates render — expected until real photography arrives.
- No `onBody` image exists yet for any product; that field is `null` throughout.
- These images carry no rights to be used past the sample/preview stage and must not appear on the public release; swap for the founder's own product photography before Gate 6.
- The religious-medal and Virgin Mary pendant results that came up in the same searches were deliberately excluded.

## 6. Sample-content labelling

Every page built from this catalogue must show the preview notice from `Phase 2 Visual Specification.md` §4: "Design preview — sample products and prices." in the slim announcement area, plus this file's own `sampleContent: true` flag should gate any future real-data import so dummy and real records are never silently mixed.

## 7. Copy contract

`Page Copy Draft v1.md` was re-read against the quiet, restrained Miansai tone confirmed at Gate 2. Its existing homepage, collection, product, and enquiry copy already matches that register (short lines, no exclamation, no unverified claims) and needs no rewrite. Two small additions for Phase 4:

- Category page intros stay empty by default (per the blueprint's "let photographs lead" rule) — do not draft generic category paragraphs for Rings/Bracelets/Chains/Pendants; the product grid carries the page.
- Card "From ₹X" price-prefix wording (§3 above) is a Phase 3 addition to the existing copy draft, needed because Phase 3 introduced multi-variant pricing that the original draft didn't yet specify.

## 8. Phase 5 expansion note

To reach ~45 products, repeat this exact schema per new record; no field needs to change shape. When real product data replaces sample data (Phase 6), keep `id`/`slug` stable so any links or bookmarks made during preview keep resolving, and remove `sampleContent`/`imageStatus` only once every field on that record is real.

**Update, 27 September 2026 — Phase 5 complete:** the catalogue now holds 45 products (12 Rings, 11 Bracelets, 11 Chains, 11 Pendants; 122 variant combinations; ₹33,500–₹2,97,000), all using the schema above unchanged. The 33 new records reuse the same four category placeholder photos described in §5 — no new photography was sourced, since none exists yet. The counts and price range quoted earlier in this document (12 products / 36 variants) describe the Phase 3/4 state and are left as-is for history; `catalog/products.sample.json` is the current source of truth for totals.

## 9. Gate 3 review

Founder checks:
1. Do the provisional category names, and this batch of 12 product names/descriptions, feel right in tone?
2. Does the sample price spread (₹33,500–₹2,43,000, mostly Core-tier) feel like a reasonable illustrative range?
3. Is the enquiry message wording and WhatsApp-first flow still correct?
4. Any objection to the four sourced placeholder photos, given the licensing/quality caveats in §5?

Open items carried forward: real product photography, real pricing, final logo decision at header scale, and verification of both contact destinations remain outstanding, as recorded in `PROGRESS.md`.
