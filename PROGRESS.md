# Project progress — The House of Aayam

Last documented: 27 September 2026. Read this first when resuming work. This is a status record, not an instruction to advance phases automatically.

## ⏸ Project on hold (27 September 2026)

The founder has paused the project until they have **real product photography and product data**. Nothing in Phase 6 should be attempted before then — everything currently in `catalog/` and `preview/` is dummy/sample content by explicit design.

What "resuming" looks like: the founder returns with actual product photos, names, materials, and prices (and, ideally, confirmed WhatsApp/email destinations and any care/policy specifics). At that point, read `Business Context/Implementation Plan and Gates.md`, and Phase 6 replaces the dummy catalogue with the real one.

Gate 5 (reviewing the completed Phase 5 draft) was never formally given — the founder moved on to infrastructure questions (git, hosting, static-vs-webapp) instead, then paused. Gate 5 is still open whenever they want to give feedback on the dummy catalogue's tone/content, but it is *not* the thing blocking a resume; the missing real product data is.

## Current state

- **Website being served from this folder:** a static “Launching Soon” page in `index.html`, `styles.css`, `script.js`, and `assets/`. It is separate from the planned full catalogue and has not been touched since Phase 2 — Phases 3 through 5 all built in isolated locations (`catalog/`, `preview/`).
- **Full website:** a complete Phase 5 draft exists at `preview/` — Home, All Jewellery (all 45 products, filters/sort/search), one dynamic Product template (works against any catalogue record via `?id=`), Contact, Our Story, Materials & Care, and mobile navigation. No cart/checkout, per plan; no service pages (shipping/returns/warranty), since none are confirmed. Not deployed to the live domain.
- **Workflow gate:** Gate 1 accepted. Gate 2 accepted 27 September 2026. Gate 3 accepted 27 September 2026. Gate 4 accepted 27 September 2026 (founder said "Go ahead to Phase 5" without raising changes). Phase 5 is complete; Gate 5 was never formally given (see above). Phase 6 is blocked on real product data, independent of Gate 5.
- **Architecture decision (27 September 2026):** the founder confirmed the site stays fully static going forward — no CMS, no accounts, no checkout — after a walkthrough of what would actually force a move to a backend+database (payments, real-time inventory, non-developer editing). None of those apply yet. Revisit only if/when checkout becomes real scope.
- **Version control:** this folder **is now a Git repository** (initialized 27 September 2026), with a single commit pushed to a public GitHub remote. See "Repository and hosting" below.
- **Deployment:** the founder bought the domain at GoDaddy and configured Netlify DNS (documented in earlier conversation, not re-verified in this workspace). Netlify continues to serve **only** the launch page — this has not changed and was not touched by the GitHub/git work below. Verify Netlify/DNS/certificate state directly with those services when deployment work resumes.

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

## Repository and hosting (added 27 September 2026)

- **Git/GitHub:** this folder was initialized as a Git repo and pushed to a public GitHub repository the founder created: `https://github.com/bohemian31/aayam-website`, branch `main`. One commit so far (`ca6cc01`, "Initial commit: launching-soon page, Phase 1-5 catalogue draft").
- **What's excluded from the repo (`.gitignore`):** `.DS_Store`; `.claude/` (this session's local tooling config, not part of the deliverable); `Business Context/The House of Aayam - iSPROUTE'26.pdf` (the investor pitch deck — market sizing, competitive analysis, founder details); `Business Context/Visual Specifications - Screenshots/` (screenshots of Miansai's live site, a competitor). These were excluded because the repo is **public**, and this material is either business-sensitive or a competitor's copyrighted content, not because it isn't useful — both stay on the founder's machine.
- **Residual disclosure to be aware of:** `Business Context/Phase 3 Dummy Catalogue and Content Contract.md` (which *is* tracked and public) describes the pricing *methodology* derived from the excluded pitch deck — an implied gold rate and a roughly 15% markup. It doesn't include the deck's market-sizing, competitive landscape, or GTM content. The founder was told this and chose to leave it as-is; revisit only if they change their mind.
- **GitHub Pages:** the founder enabled GitHub Pages on `main`, serving from the repo root. This gives two URLs, both public but only discoverable if someone has the link:
  - `https://bohemian31.github.io/aayam-website/` — mirrors the launch page (same content as the live domain).
  - `https://bohemian31.github.io/aayam-website/preview/index.html` — the dummy catalogue prototype, previously only viewable via a local server. This is a **read-only preview channel**, separate from and in addition to Netlify; it does not replace or affect the live domain in any way.
- **Netlify/the real domain are unchanged.** `thehouseofaayam.com` still serves only the root-level launch page via Netlify, exactly as before this session's git/GitHub work. Moving the real catalogue onto the live domain is a deliberate, separate decision at Gate 6 — never a side effect of committing code or enabling GitHub Pages.
- **Git author identity note:** the initial commit's author was auto-detected from the machine as "Parth Katrodiya" (this Mac's configured username), not explicitly set. Revisit with `git config user.name`/`user.email` plus `git commit --amend --reset-author` before the next commit if a different author identity is wanted on the public repo.

## Immediate resume instructions

Do not resume phase work until the founder has real product photography and product data — see "Project on hold" above. When they do:

1. Read `Business Context/Implementation Plan and Gates.md`, this file, and `DEVELOPER_REFERENCE.md` to reload context.
2. `git pull` (or check `git status`/`git log`) before editing anything, since the folder is now a tracked repo with a GitHub remote — don't lose or silently diverge from what's pushed.
3. Optionally address any Gate 5 feedback the founder gives on the dummy catalogue's tone/content (independent of the real-data blocker).
4. Begin Phase 6: replace dummy products/images/prices in `catalog/products.sample.json` (and `preview/`'s image references) with real data, verify the WhatsApp number and email, and prepare the release/deployment checklist.
5. Stop again at Gate 6 before anything is published to the live domain. Preserve the current launch page (`index.html`/`styles.css`/`script.js` at the project root) throughout — it stays live on Netlify until the founder explicitly approves the domain switch at Gate 6.
6. Commit and push Phase 6 work to the same GitHub repo as it progresses, same exclusions as established in `.gitignore`.

For a compact change history, read `CHANGELOG.md`. For file roles, local preview, data expectations, and release checks, read `DEVELOPER_REFERENCE.md`.
