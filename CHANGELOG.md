# Project changelog

This records decisions and artifacts visible in the project and conversation. All entries are dated 26 September 2026 unless a date is explicitly part of a launch target. It is a handoff history, not proof that a remote service or deployed site was verified.

## Initial launch page

- Created a static launch page using `index.html`, `styles.css`, and `script.js`.
- Used the supplied early logo as `assets/logo.png` and a sourced jewellery photograph as `assets/hero.jpg` for the launch-page layout. The source/licence record for the hero image is not stored in this folder; verify it before reusing the image outside the placeholder page.
- Implemented a countdown targeting **2026-09-28 08:00:00 +05:30**. The timer clamps at zero and stops updating there. It does not redirect or reveal a new section.
- Styled the launch page in ivory, dark text, and thin gold details with desktop and mobile layouts. It has no enquiry form, email signup, or notification action.
- Added `robots.txt` with `Disallow: /`. This affects crawlers if deployed and must be revisited before an indexed full-site release.
- Prior conversation reported local browser checks of the launch page. No automated test suite is present, and this documentation turn did not rerun visual testing.

## Domain and deployment discussions

- Founder purchased `thehouseofaayam.com` through GoDaddy and discussed attaching it to Netlify.
- Guidance was given on the `www` CNAME to the Netlify subdomain and apex `@` A record using the exact Netlify DNS instruction. A commonly used Netlify apex IP was discussed, but the current domain configuration is **not verified by this repository**.
- Netlify “Pending External DNS verification” was explained as a DNS validation state. No confirmed propagation, certificate issuance, or live-site verification is recorded in project files.

## Brand context and reference research

- Read the 9-page business pitch under `Business Context/`. The strategic direction: men's everyday fine jewellery, understated expression, styling confidence, and transparent material/trust information.
- Reviewed several jewellery and adjacent editorial sites. The founder chose **Miansai** as the primary direction for layout and visual styling.
- Founder described the intended full catalogue as roughly 40–50 products in 3–4 categories, with gold colours and 9K/14K/18K/22K options. Product-level catalogue data was not yet provided.
- Founder chose browse-and-enquire for the initial full site; checkout will come later. The founder approved dummy catalogue content for the draft and provided a demo WhatsApp number plus business email.

## Phase 1 — scope and gated implementation plan

- Added `Business Context/Website Blueprint v1.md` and `Business Context/Page Copy Draft v1.md` for proposed structure and initial copy.
- Added `Business Context/Implementation Plan and Gates.md` defining six phases with founder review gates after each.
- Gate 1 was accepted and the founder explicitly instructed commencement of Phase 2.

## Phase 2 — visual audit and design specification

- Inspected the live Miansai homepage, a men's rings collection, one ring product page, and mobile navigation in a browser at desktop and mobile widths.
- Added `Business Context/Phase 2 Visual Specification.md`, distinguishing observed Miansai patterns from proposed Aayam values.
- Revised planning documents to place the large headline later in the page: the proposed Aayam homepage now opens with two campaign photographs and captions.
- Documented the pale-grey four-column desktop/two-column mobile product grid, large product gallery, compact selectors, and a WhatsApp enquiry adaptation.
- Marked Phase 2 complete in the implementation plan and left Gate 2 awaiting founder review.
- Reference screenshots are present in `Business Context/Visual Specifications - Screenshots/`; they have not been repurposed as site assets.

## Current hold and next change (26 September 2026)

- Founder instructed the team to hold phase work and create detailed progress, changelog, and developer-reference files. `PROGRESS.md`, this file, and `DEVELOPER_REFERENCE.md` were added for that purpose.
- No Phase 3 dummy catalogue or full-site implementation has started. The next implementation change requires the founder's Gate 2 signal and should be recorded here when it happens.

## Phase 3 — dummy catalogue and content contract (27 September 2026)

- Founder gave the Gate 2 signal and confirmed, ahead of the phase: the quiet Miansai-style white/pale-grey direction for the catalogue (launch page keeps its separate ivory/gold look); four separate categories (Rings, Bracelets, Chains, Pendants); original Aayam-style product naming (never reusing Miansai's own names); and sample prices anchored to the founder's investor-deck cost/pricing data rather than round placeholder numbers. Founder also confirmed real product photography is still not available.
- Read `Business Context/The House of Aayam - iSPROUTE'26.pdf` for the first time; its page 6 pricing table and 3-tier architecture (Entry/Core/Aspirational) were used to derive an explainable sample-pricing methodology, recorded in the new Phase 3 document.
- Added `Business Context/Phase 3 Dummy Catalogue and Content Contract.md`: the product record schema, category/variant summary, pricing methodology, product-card/filter/sort/search display rules, the enquiry message contract, image-placeholder notes, and the sample-content labelling rule.
- Added `catalog/products.sample.json`: 12 dummy products (3 each in Rings, Bracelets, Chains, Pendants), 37 gold-colour/karat variant combinations, sample prices from ₹33,500 to ₹2,43,000. No product implies a colour/karat combination it doesn't explicitly list.
- Sourced four shared category placeholder photographs from Unsplash's free tier (one each for Rings, Bracelets, Chains, Pendants) and saved them to `catalog/images/placeholders/`; source URLs are recorded in the Phase 3 document for licensing traceability. Results containing religious imagery (a Saint Benedict-style signet ring, a Virgin Mary medallion) were deliberately excluded during sourcing.
- Marked Gate 2 as accepted and Phase 3 as complete in `Implementation Plan and Gates.md`; updated `PROGRESS.md`'s phase table and gate sections accordingly. `index.html`, `styles.css`, `script.js` and the live launch page were not touched.
- Phase 4 (the three core responsive templates and mobile navigation, consuming this catalogue file) is next, pending the founder's Gate 3 review of the catalogue content.

## Phase 4 — core visual and working prototype (27 September 2026)

- Founder gave the Gate 3 signal ("Goto phase 4") without requesting catalogue changes; Gate 3 recorded as accepted as-is.
- Built the prototype in a new isolated `preview/` folder — `index.html` (Home), `all-jewellery.html`, `product.html`, `contact.html`, `coming-soon.html`, plus shared `styles.css` and `catalog.js`. None of `index.html`, `styles.css`, `script.js`, `robots.txt` or `assets/` at the project root (the live launch page) were touched.
- Home: paired campaign photographs (sourced from Unsplash's free tier, saved to `preview/images/`) with captions below, a featured-products strip (one product per category), a category tile row reusing the Phase 3 placeholder photos, and a short brand-statement close, per `Phase 2 Visual Specification.md`.
- All Jewellery: the full 12-product grid with working Category/Gold colour/Karat filters, Featured/Price sort, free-text search, active-filter chips with individual removal and Clear all, and the exact empty-state copy from the content contract. Filter state is reflected in the URL query string.
- Product template: a single dynamic page driven by `?id=`, tested against multiple catalogue records. Implements gold-colour and karat swatches (with karat options correctly disabled per colour when a combination isn't offered), size/length selection, the "I need sizing help" path, four accordions (Description/Details/Fit & Care/Ordering), and an Enquire button that builds a `wa.me` link with the exact message template from the content contract — verified by decoding the generated URL.
- Contact page and a shared `coming-soon.html` stub for Our Story, Materials & Care and "Find your size" (all out of Phase 4 scope per the plan) so the approved header/footer nav has no dead links.
- Mobile navigation: a full-height drawer (search, all categories, secondary links), opened/closed via button, backdrop click or Escape.
- Verified in the browser at desktop and 375px mobile widths. Testing surfaced two real gaps against the Phase 2 spec, both fixed in this session: (1) the campaign pair was stacking to a single column on mobile instead of remaining two columns as directly observed on Miansai and specified; (2) none of the 12 dummy products had asymmetric colour/karat availability, so the product page's disabled-combination state was never actually exercised — fixed by changing the Kavi Onyx Signet Ring's Rose colour to 14K-only (removed the Rose/18K variant), which also changed the catalogue's total variant count from 37 to 36 (documented in the Phase 3 file).
- Marked Phase 3/Gate 3 as accepted and Phase 4 as complete in `Implementation Plan and Gates.md`; updated `PROGRESS.md` accordingly.
- Phase 5 (expand to ~45 products, build remaining category pages, complete Our Story/Materials & Care/Contact) is next, pending the founder's Gate 4 review of this prototype.

## Phase 5 — complete draft catalogue and supporting pages (27 September 2026)

- Founder gave the Gate 4 signal ("Go ahead to Phase 5") without requesting changes; Gate 4 recorded as accepted as-is.
- Expanded `catalog/products.sample.json` from 12 to 45 products: 12 Rings, 11 Bracelets, 11 Chains, 11 Pendants (up from 3 each), 122 total gold-colour/karat variant combinations, sample prices from ₹33,500 to ₹2,97,000. All 33 new records use the same schema and the same four shared category placeholder photos from Phase 3 (no new photography was sourced — none is available yet). Every new product got an original Aayam-style name (invented, not reused from Miansai or from the existing 12), checked for duplicate names/IDs across all 45.
- Verified all four categories now have real inventory via `all-jewellery.html?category=X`; no separate per-category URL templates were built, since the existing filtered-collection view already renders a coherent, correctly-filtered page per category.
- Widened the All Jewellery search to also match each product's short description, not just name and category, since name-only matching was likely to under-return results across a larger catalogue.
- Built `preview/our-story.html` and `preview/materials-care.html`, replacing the Phase 4 coming-soon stub for both. Copy is drawn directly from `Page Copy Draft v1.md`; wherever that draft explicitly calls for founder-confirmed information (a verified founder paragraph; Aayam's specific alloy/hallmarking details; Aayam's own sizing system if it differs from general guidance; manufacturer-specific care instructions) a visibly dashed-border "to confirm before release" note was added instead of inventing content. Materials & Care includes real, non-Aayam-specific general education on karat, gold colour and sizing, plus a `#fit` anchor that the product page's "Find your size" link now jumps to (previously a dead stub).
- Updated every nav/footer link across all seven `preview/` pages (including the two new ones) to point at the real Our Story/Materials & Care pages; deleted `preview/coming-soon.html` since nothing references it any more.
- Deliberately added no shipping/returns/warranty pages, since no such policies have been confirmed; the product page's Ordering accordion continues to route those questions to WhatsApp/email rather than publishing unconfirmed claims.
- Checked the full site in the browser at desktop and 375px mobile widths: full 45-product grid, category filters (e.g. Pendants → 11 results), Our Story, and the Materials & Care `#fit` anchor jump from a product page.
- Marked Phase 4/Gate 4 as accepted and Phase 5 as complete in `Implementation Plan and Gates.md`; updated `PROGRESS.md` accordingly.
- Phase 6 (replace all dummy data/images/prices with real ones, verify contact destinations, prepare the release/deployment checklist) is next, pending the founder's Gate 5 review.

## Architecture and hosting decisions (27 September 2026)

- Walked through when a static site stops being enough (payments, real-time inventory, non-developer editing) versus what actually needs a backend/database/CMS. Founder decided to stay fully static for now: no CMS, no accounts, no checkout, since none of those triggers apply yet.
- Compared Netlify's and Vercel's free tiers for a commercial site. Finding: Netlify's free plan explicitly permits commercial use (can't resell the hosting itself, but running a business site is fine); Vercel's free "Hobby" tier explicitly prohibits commercial use in its terms of service. This confirmed Netlify (already in use for the live domain) as the right choice, not Vercel.
- Noted Netlify's free-tier mechanics for future reference: a shared 300-credits/month pool covering deploys (15 credits each), bandwidth (20 credits/GB, ~15GB/month if used alone) and requests; exceeding it takes the whole site down until the next monthly cycle, not a graceful slowdown. Pro is a flat $20/month with 3,000 credits as of Netlify's April 2026 pricing change, if ever needed.

## Version control and hosting groundwork (27 September 2026)

- Initialized this folder as a Git repository. Added `.gitignore` excluding `.DS_Store`, `.claude/` (session-local tooling config), the investor pitch deck PDF, and the Miansai reference screenshots — the repo was going to be public, and that material is either business-sensitive (market sizing, competitive analysis, founder details) or a competitor's copyrighted content. Everything else — the launch page, `Business Context/`'s markdown planning docs, `catalog/`, `preview/` — was committed as-is, including the dummy catalogue and its sample-content labelling.
- Founder created an empty public GitHub repository at `https://github.com/bohemian31/aayam-website`. Pushed the initial commit (`ca6cc01`) to `main`. `gh` CLI was not installed on this machine; the push used an existing GitHub credential already stored in the macOS keychain.
- Founder enabled GitHub Pages on `main`, root. This produced two URLs: `https://bohemian31.github.io/aayam-website/` (mirrors the launch page) and `https://bohemian31.github.io/aayam-website/preview/index.html` (the dummy catalogue, previously local-server-only). Confirmed this is a separate, additional read-only preview channel — it does not touch or replace the Netlify deployment or `thehouseofaayam.com` in any way.
- Flagged for the founder, unresolved by design: the Phase 3 content contract's pricing-methodology note (derived from the excluded pitch deck's cost figures) remains in the public repo; and the initial commit's author was auto-detected as "Parth Katrodiya" from the machine, not explicitly configured.

## Project paused (27 September 2026)

- The founder has no real product photography or product data yet and asked to pause all phase work until they do. Phase 6 cannot meaningfully proceed without it.
- Gate 5 (review of the completed Phase 5 draft catalogue) was never formally given — the founder shifted to infrastructure questions (static-vs-webapp, hosting free tiers, git/GitHub setup) instead, then paused. It remains open for whenever the founder wants to give that feedback, but it is independent of what's actually blocking the resume.
- `PROGRESS.md`, `DEVELOPER_REFERENCE.md`, and `Business Context/Implementation Plan and Gates.md` were all updated to record this pause and the git/GitHub/hosting work above, so a future session can resume cleanly once real product data arrives.

## 29 September 2026 — reference-image preview and editorial pass

- Founder explicitly resumed the preview work and approved a 33-item, image-backed draft for the public GitHub Pages preview, while keeping the Netlify live domain on its separate launching-soon page.
- Audited 36 locally supplied JPEGs. Held two multi-ring images and one dual-pendant image outside the product grid. Copied the other 33 into catalog/images/reference/ with normalized filenames, leaving the original Products Images/ folder local and ignored by Git.
- Reduced catalog/products.sample.json from 45 active dummy records to 33 (8 Rings, 8 Bracelets, 10 Chains, 7 Pendants). Assigned provisional Aayam-style names and visually grounded descriptions. Retained the original sample weight, variant prices, size data, details and care fields for every remaining ID. Marked reference photos and sample specifications throughout the preview.
- Reused each product's single reference image in the three gallery positions, with a visible explanation. Replaced homepage category placeholder tiles and featured product photos. Added a clear unavailable state for removed or unknown product IDs.
- Rebuilt Our Story, Materials & Care, and Contact with fuller responsive layouts and original copy. The story does not expose founder or manufacturing claims. Material/fit/care guidance is general and acknowledges unverified product facts. Contact keeps email and a clearly labelled demo WhatsApp number, without a form or support-hours promise.
- Fixed mobile collection filter controls overflowing the viewport and added shared CSS/JS version query strings to avoid stale browser copies during preview rollout.
- After the first public deploy, GitHub Pages served new HTML with cached old catalogue JSON. Added the same version query to the catalogue request so the published preview uses the 33-item data.
- Checked catalogue counts, image files, unchanged retained sample fields, JS syntax, homepage loading, category and search results, gallery reuse, enquiry URL, removed-ID behaviour, and desktop/mobile editorial layouts. No root launching-soon or Netlify files were changed.
