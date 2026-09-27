# Project progress — The House of Aayam

Last documented: 27 September 2026. Read this first when resuming work. This is a status record, not an instruction to advance phases automatically.

## Current state

- **Website being served from this folder:** a static “Launching Soon” page in `index.html`, `styles.css`, `script.js`, and `assets/`. It is separate from the planned full catalogue and has not been touched since Phase 2 — Phases 3 through 5 all built in isolated locations (`catalog/`, `preview/`).
- **Full website:** a complete Phase 5 draft exists at `preview/` — Home, All Jewellery (all 45 products, filters/sort/search), one dynamic Product template (works against any catalogue record via `?id=`), Contact, Our Story, Materials & Care, and mobile navigation. No cart/checkout, per plan; no service pages (shipping/returns/warranty), since none are confirmed. Not deployed anywhere; local preview only.
- **Workflow gate:** Gate 1 accepted. Gate 2 accepted 27 September 2026. Gate 3 accepted 27 September 2026. Gate 4 accepted 27 September 2026 (founder said "Go ahead to Phase 5" without raising changes). Phase 5 is complete and awaiting Gate 5 review. Do not start Phase 6 until the founder signals it.
- **Version control:** this folder is not currently a Git repository (`git status` returned “not a git repository”). Preserve and inspect existing files before edits.
- **Deployment:** the founder bought the domain at GoDaddy and discussed Netlify DNS configuration. This workspace does not prove the current Netlify deployment, DNS, certificate, or live-domain state. Verify those from their respective services when deployment work resumes.

## Confirmed business and product decisions

The House of Aayam is a men's fine jewellery brand. The business pitch in `Business Context/The House of Aayam - iSPROUTE'26.pdf` frames the opportunity around understated everyday expression, versatile styling, credible material information, and trust. The pitch includes strategic concepts and projected pricing tiers; those are not evidence that any specific product, service, certification, or operational policy exists today.

For the **first full website**, the founder wants Miansai to be the main reference for layout, build-up, product discovery, and visual styling. Use Aayam's own brand identity, original copy, and accurate imagery. The first release is a browse-and-enquire catalogue. Checkout is for a later project phase. Approximately 40–50 products across 3–4 categories are anticipated. The founder says product photos exist, but the actual catalogue photos are not in this project folder at the time of this handoff.

The range was described as mostly gold fine jewellery with yellow/gold, rose-gold, and white-gold colours and 9K, 14K, 18K, and 22K options. No per-product colour, karat, size, or price combinations have been supplied. Never assume a product comes in every combination.

The founder explicitly authorised **dummy categories, photographs, prices, and other product details for the draft**. Use labels that make the preview status clear. Replace or explicitly approve every sample claim and asset before public release.

Enquiry direction in the plan: WhatsApp as the primary product action, preparing a message that includes product ID/name, selected options, and URL. The founder supplied **+91 7265000916 for demo use** and **thehouseofaayam@gmail.com** as the business email. Email should appear on Contact. Confirm both destinations before public release; the number was explicitly described as a demo number.

No full-site launch deadline was set. The original Monday 28 September 2026, 8:00 AM IST date belongs to the launching-soon countdown. The founder wants it to stay at zero afterward, with no automatic redirect, form, notification, or other action.

## Phase history and gate status

| Phase | Status | Deliverable | Founder gate |
| --- | --- | --- | --- |
| Initial launching-soon page | Built locally; prior conversation reported desktop/mobile checks | Static site files at project root | Publishing state unverified here |
| Phase 1: scope and workflow | Complete | `Business Context/Implementation Plan and Gates.md`, `Website Blueprint v1.md`, `Page Copy Draft v1.md` | Accepted; founder said to commence and then clarified Phase 2 |
| Phase 2: Miansai visual audit | Complete | `Business Context/Phase 2 Visual Specification.md` | Accepted 27 September 2026 |
| Phase 3: dummy catalogue/content contract | Complete | `Business Context/Phase 3 Dummy Catalogue and Content Contract.md`, `catalog/products.sample.json`, `catalog/images/placeholders/` | Accepted 27 September 2026 |
| Phase 4: three core working templates | Complete | `preview/` (Home, All Jewellery, Product, Contact, mobile nav, coming-soon stub) | Accepted 27 September 2026 |
| Phase 5: complete draft catalogue | Complete | 45-product `catalog/products.sample.json`; `preview/our-story.html`, `preview/materials-care.html` | **Pending review** (Gate 5) |
| Phase 6: real data and release preparation | Not started | Planned verified release candidate | Not reached |

The phase plan explicitly stops at every gate for a short founder review. The current hold applies to phase work; documentation requested in this turn is permitted.

## Phase 2 findings that changed the design

Miansai's live India storefront was visually inspected at desktop and mobile sizes. The current homepage opens with **two campaign photographs side by side, captions beneath**. It does not start with a large overlaid headline. The collection uses a continuous pale-grey product grid: four columns on desktop and two on mobile, with labels above product images on desktop and below them on mobile. Product pages pair a large gallery with compact selection controls, a prominent action, and ruled accordions. On mobile, the gallery and information stack vertically.

The Phase 2 specification supersedes the earlier headline-led homepage layout in `Website Blueprint v1.md` and `Page Copy Draft v1.md`. It proposes Aayam-specific values for colour, typography, spacing, breakpoints, navigation, photography, and enquiry placement. The reference audit notes which aspects were directly observed and which were proposed. It does not establish rights to Miansai's imagery or font files.

Local reference captures have appeared under `Business Context/Visual Specifications - Screenshots/`. There are nine PNG files dated 26 September 2026. Their descriptive filenames are timestamps only; inspect each image before citing it as proof of a specific layout. They are reference material, not Aayam site assets.

## Gate 2 — accepted 27 September 2026

The founder confirmed: the paired photography-led homepage opening; white/pale-grey surfaces with charcoal-grey text and controls as the catalogue base style (the launch page keeps its own ivory/gold treatment); four separate categories (Rings, Bracelets, Chains, Pendants); original Aayam-style product naming; and sample pricing anchored to the founder's own investor-deck cost data. The early-logo question was not revisited — `assets/logo.png` stays for the first draft, to be tested at header sizes in Phase 4.

## Gate 3 — accepted 27 September 2026

The founder said "Goto phase 4," taken as accepting the Phase 3 catalogue and content contract as written, with no changes requested.

## Gate 4 — accepted 27 September 2026

The founder said "Go ahead to Phase 5," taken as accepting the Phase 4 prototype as-is, with no changes requested.

## Gate 5 decision now pending

The founder needs to review the complete draft at `preview/` (open `preview/index.html` through a local server, not via `file://`):

1. The expanded catalogue: 45 products, 12/11/11/11 across Rings/Bracelets/Chains/Pendants, all still built from the same schema and reusing the four Phase 3 placeholder photos (no new photography exists, so every product in a category still looks the same in preview — expected, not a bug).
2. Whether the new product names/descriptions keep the same tone as the original 12.
3. The real Our Story and Materials & Care pages — specifically, whether the visibly flagged "to confirm before release" placeholders (a founder bio; Aayam's specific alloy/hallmarking/sizing/care policy) are the right things to leave open rather than draft further.
4. Confirm the decision to add no shipping/returns/warranty pages at this stage, since none of those policies are confirmed yet.
5. Whether browsing a category via `all-jewellery.html?category=X` (rather than a separate URL per category) is acceptable, or whether Phase 6 should give each category its own address.

No specific Gate 4 feedback needed applying, since the founder raised none.

Recommended model for Phase 6 from the plan: **GPT-6 Sol, Medium reasoning** for data integration and verification; **Astra, Medium**, for one final visual critique if the reference match still needs judgement. Model choice is advisory, not a technical dependency in this session.

## Immediate resume instructions

When the founder resumes, first read `Business Context/Implementation Plan and Gates.md` and open `preview/index.html` via the local server. Incorporate any Gate 5 feedback into the `preview/` files and `catalog/products.sample.json`. Then, if the founder authorises Phase 6, replace all dummy products/images/prices with real data, verify the WhatsApp number and email, and prepare the release/deployment checklist. Stop again at Gate 6 before anything is published. Preserve the current launch page (`index.html`/`styles.css`/`script.js` at the project root) throughout — it stays live until the founder explicitly approves the domain switch at Gate 6.

For a compact change history, read `CHANGELOG.md`. For file roles, local preview, data expectations, and release checks, read `DEVELOPER_REFERENCE.md`.
