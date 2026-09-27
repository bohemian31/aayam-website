# Phase 2 — Miansai audit and Aayam visual specification

26 September 2026 · Ready for Gate 2 review · Website implementation has not begun.

This document supersedes the earlier headline-led homepage proposal. It specifies a close visual adaptation of the reference for Aayam's catalogue and enquiry model. Measurements in the Aayam specification are proposed implementation values, not claims that Miansai uses those exact dimensions.

## 1. Reference evidence

Inspected the live India storefront in the browser. Desktop screenshots were reviewed at approximately 1414 × 827 and 1440 × 900; mobile at 390 × 844. Read rendered content and selected computed styles. The site initially displayed automatic security verification and then loaded normally.

Reference pages:
- [Homepage](https://www.miansai.com/en-in)
- [Men's rings collection](https://www.miansai.com/en-in/collections/men-rings)
- [Lennox Jasper product detail](https://www.miansai.com/en-in/collections/men-rings/products/lennox-jasper-ring-sterling-silver)

### Direct observations

| Surface | Desktop observation | Mobile observation |
| --- | --- | --- |
| Header | Narrow announcement strip; white navigation row; wordmark left; primary categories centred; search/bag right. Header remains visible in the scrolled homepage view. | Search left, wordmark centred, bag and menu right. Announcement remains above. |
| Homepage opening | Two equally sized campaign images side by side, with generous outer margins and a gutter. Short centred captions sit below the pictures. Photography leads; there is no large headline over this opening pair. | The pair remains two columns, with taller portrait crops and captions below. It does not become a conventional single-image hero. |
| Homepage progression | Product recommendations load below the opening pair; a broad editorial photograph and a category-image row continue the page. The first rapid scroll occurred before recommendation loading completed. | Two recommendation cards visible together, followed by a caption/link and editorial imagery. |
| Collection | Four adjacent light-grey tiles across the viewport. Product name, material and price appear near the top of each tile, above the product image. White rules divide tiles. A large editorial image occupies two columns in the next row. | Two tiles across. Product image appears above name/material/price. The editorial insert spans both columns. Refine and Sort remain compact in a row above the grid. |
| Product detail | Approximately equal gallery and information halves. Large pale image field on the left; compact, left-aligned information block inset into the right half. Square size buttons, dark selected state, grey disabled states, broad rectangular action and ruled detail accordions. | Gallery first, then title/material/price, selectors, size guide and full-width action. Information is stacked. |
| Mobile menu | Not applicable. | White panel below the header; large primary links, smaller account/contact/about links lower down. Close icon replaces menu icon. A newsletter field sits near the bottom. |
| Footer | Source lists grouped experience/help/service links, newsletter and social links. | The same content is rearranged vertically in the rendered structure. The complete mobile footer was not visually audited. |

### Direct style readings

- Body declares `SuisseIntl-Light, HelveticaNeue, "Helvetica Neue", Helvetica, Arial, sans-serif`.
- Measured body text colour: `rgb(73, 77, 81)` / `#494D51`.
- Measured body background: `rgb(253, 253, 253)` / `#FDFDFD`.
- Sampled desktop navigation links declare 16px, font-weight 400. Their light appearance comes from the declared font face.
- Screenshots show square edges, restrained rules, neutral surfaces, fine line icons and very little decorative framing.

### Limits of the audit

- Desktop top-level navigation was observed; the attempted accessibility expansion did not expose its dropdown visually. Category hierarchy is available in source, but exact dropdown dimensions and hover timing are unverified.
- Mobile menu opened successfully after stabilising the browser viewport. An automatic country-shipping notice appeared over it; that notice is not a design pattern to reproduce.
- Gallery controls and accordions were visually inspected, but zoom, swipe physics and all transition timings were not measured. No checkout action was performed.
- Computed family declarations do not establish font licensing or prove which fallback rendered every glyph. Aayam must use fonts it can lawfully host.
- These are observations of the current live pages, not a complete audit of every template or campaign.

## 2. Recommended Aayam direction

Three defining features should carry through:

1. Photography-led paired opening, with captions outside the images.
2. A continuous pale-grey product grid, preserving the different desktop/mobile label order.
3. A generous gallery paired with quiet product information and one clear enquiry action.

Use white and very pale grey surfaces with charcoal-grey text. Let the jewellery supply the gold colour. Keep corners square and avoid decorative gold frames, heavy shadows or large marketing headlines in the opening view.

This is the proposed adaptation of Miansai's styling. The copy, wordmark, product range and campaign imagery belong to Aayam.

## 3. Proposed design values

| Element | Aayam specification |
| --- | --- |
| Main background | `#FDFDFD` |
| Product image/tile field | Start at `#F2F2F2`; tune to the actual image backgrounds so rectangles do not appear around the photographs |
| Main text and primary action | `#494D51`; action text white |
| Secondary text | Start at `#64686B`; verify readable contrast in the prototype |
| Rules | `#DDDFE0` on white; 1px white divisions between grey tiles |
| Typeface | Neutral light/regular sans serif. Prototype with `"Helvetica Neue", Helvetica, Arial, sans-serif`; compare against the reference in rendered screens. Use licensed Suisse only if the founder supplies or elects to license it. |
| Body | 16px / 1.5; regular enough to remain readable |
| Desktop navigation | 15–16px; normal case; restrained spacing |
| Campaign captions | 28px desktop, 18px mobile; centred; normal case |
| Product title | 20–22px desktop, 18–20px mobile |
| Grid text | Name 16px desktop / 14px mobile; material and price 13–14px |
| Header | 64px navigation row; optional 28px preview notice above. Sticky, with a fine bottom rule. |
| Main gutters | 24px desktop; 12px mobile for campaign pairs. Product grids run full width. |
| Spacing units | 4, 8, 12, 16, 24, 32, 48, 64px |
| Corners and shadows | Square surfaces; no card shadows |
| Interactive hit areas | At least 44px for small icon controls and selectable options, while retaining visually fine icons |
| Motion | Brief opacity/colour transitions around 150–200ms; menu transition about 200ms. Respect reduced motion. No automatic hero slideshow. |

Breakpoints are Aayam choices: desktop at 1024px and above; tablet 768–1023px; mobile below 768px. Verify 390px and a narrow 360px case during implementation. Do not infer Miansai's exact breakpoint from these targets.

## 4. Header and navigation

### Desktop

Left: Aayam logo. Centre: Jewellery · Our Story · Materials & Care · Contact. Right: Search.

Jewellery opens a simple white dropdown containing View All, Rings, Bracelets, Chains and Pendants. These are provisional categories. For this smaller catalogue, a single organised panel is sufficient. Open on click and keyboard activation; pointer hover may also open it. Escape closes it and returns focus. Indicate the active category with a subtle underline.

### Mobile

Search on the left, Aayam logo centred, menu on the right. Use a full-height white drawer below the header with 24px primary category links. Place Our Story, Materials & Care and Contact below at 16px. Avoid a deeper nested tree for four categories. Close button, Escape, focus management and background scroll lock are required.

### Logo recommendation

Keep the provided `assets/logo.png` for the first draft, preserving its proportions. Test its legibility in a box no wider than about 150px on desktop and 135px on mobile. Inspect its transparent padding during implementation before deciding on header sizing. Do not stretch it or replace it with a Miansai-like script. If the early mark is illegible at these sizes, bring a compact Aayam wordmark option to review.

### Preview notice

Use the slim announcement area for: “Design preview — sample products and prices.” This keeps demo status visible without placing implementation details inside each product description. Remove only after real content passes the release gate.

## 5. Homepage specification

The page sequence below replaces the original full-width hero headline proposal.

| Order | Composition | Aayam content / action |
| --- | --- | --- |
| 1 | Two equally sized campaign panels; captions below | **The first collection** → All Jewellery; **Everyday signatures** → a curated subset |
| 2 | A quiet strip of four featured products on desktop, two visible on mobile | 4–6 selected sample products; small heading **Selected pieces**; link **View the collection** |
| 3 | Wide editorial image, followed by a centred category caption | **Chains & Pendants** → matching category/edit |
| 4 | Three adjacent category images on desktop; horizontally scrollable on mobile with a visible next item | **Rings**, **Bracelets**, **Pendants**; direct category links |
| 5 | Brief brand statement with a detail photograph | **A personal signature.** / Fine jewellery for men. An expression of your own. / **Our story** |
| 6 | Quiet grouped footer | Jewellery; The House; Contact; applicable policies |

Opening panel ratio: approximately 1.1:1 desktop, 2:3 mobile. Use purpose-made crops for each breakpoint. Both panels feature men's styling: one neck/torso composition and one wrist/hand detail. Keep the photographs related in light, clothing and colour treatment. Avoid identical images in both panels.

No newsletter is included. The brand statement is an Aayam addition and should be short enough to preserve the reference's browsing rhythm.

## 6. Collection specification

Desktop: compact breadcrumb/category row on the left, Refine and Sort on the right; then four flush columns. Tablet: three columns. Mobile: two columns with a compact category identifier and controls above.

Each desktop tile contains centred product name, material and sample price at the top, with the photograph below. On mobile the photograph comes first, then those labels. Reserve predictable image and text areas so names that wrap do not disturb the row alignment.

Use one editorial tile spanning two columns after the first row on desktop and after four products on mobile. It links to a real category in the demo. A small category with only a few pieces should omit the insert rather than dominate the listing.

Proposed interactions:
- Tile image and title link to product detail.
- Desktop hover may crossfade to a second real image; keep the primary image when no second image exists.
- Refine opens a panel for Category, Gold colour and Karat. Display applied filters and Clear all.
- Sort supports Featured and sample price ascending/descending. Do not claim “Best selling” for fictional data.
- Product counts, empty states and selected filters remain clear at mobile sizes.
- Keep the browse state when returning from a product detail page.

## 7. Product detail specification

### Desktop composition

Gallery left, approximately 50% width; information right, approximately 50%. Use a square or nearly square pale-grey gallery with a generous product scale. Inset the information block by about 64–96px on wide desktop screens; cap its usable width near 500px. Avoid pushing the primary action below the fold through unnecessary vertical spacing.

### Information order

1. Product name.
2. Selected karat and gold colour, then sample INR price.
3. Gold colour controls: visible text labels, with optional colour swatches as a supplement.
4. Karat controls for the actual offered values.
5. Applicable size/length choices and “Find your size”. Allow “I need sizing help”.
6. Full-width charcoal-grey button: **Enquire about this piece**.
7. Short supporting line: “Ask us about sizing, availability or a detail you would like to know.”
8. Ruled accordions: Description, Details, Fit & Care, Ordering.

Use square outlined selectors. Selected choices have dark fill and white text. Unavailable combinations are visibly disabled with an explanation; never infer a full colour × karat × size cross-product.

### Mobile composition

Full-width gallery first, then the information block with 18–20px side padding. Product labels and selectors remain in the same order. Main button height about 48px. Use a swipeable gallery with explicit previous/next controls and an image count; accessible controls must work without swipe.

### Enquiry flow

The action opens a prepared WhatsApp message addressed to the demo number. It contains product name/ID, selected colour/karat/size and the page link. The customer sends the message themselves. Test prepared URLs without sending a message during QA. Keep email on Contact; no green floating bubble is needed for the first draft.

## 8. Image direction and Phase 3 asset needs

- Two related campaign photographs: a men's torso/neck composition and a hand/wrist composition.
- One wide editorial crop, plus a tall mobile crop.
- Three category still-life images with related surfaces and light.
- A small shared placeholder set sufficient for 8–12 sample products. Use category-appropriate images; a ring photograph must not stand in for a chain.
- Product images need consistent neutral backgrounds and object scale. Preserve visible gold, rose-gold and white-metal colour. Do not apply a monochrome filter that hides variant differences.
- Natural skin texture, understated clothing and directional soft light for campaign images. Use the reference's restrained mood, while keeping the actual jewellery readable.
- No Miansai photography or commercial font files are downloaded into Aayam's site as part of this audit.

## 9. Handoff and review checks

The specification is ready for Gate 2. In Phase 3, populate dummy content to these requirements; do not begin the website build until its gate.

Founder checks:
1. Confirm the paired campaign opening and captions below, replacing the earlier headline-led hero.
2. Confirm white/pale grey, fine sans-serif text and charcoal-grey controls as the base styling.
3. Confirm the provided early logo should remain for the first draft.

Default fidelity priorities: campaign composition, continuous product grid, and product-page proportions. The founder may replace these with other reference details at Gate 2.

Next model: **GPT-6 Luna, Medium reasoning**, for the small dummy catalogue and content contract. Use Sol only if a new structural decision arises.
