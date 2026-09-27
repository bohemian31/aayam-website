# The House of Aayam — implementation plan and gates

Date: 26 September 2026. This plan governs a reviewable first website draft. Work proceeds one phase at a time. After each phase, provide a short handoff with: what changed, where to review it, what the founder should check, known gaps, and the recommended model for the next phase. Stop at each gate for the founder's signal before starting the next phase.

## Working brief

- Brand: The House of Aayam, a men's fine jewellery brand.
- Reference: Miansai is the primary reference for visual styling, page rhythm, category browsing and product presentation. Aayam uses its own identity, copy and product imagery. Conduct a visual reference audit before claiming close fidelity.
- Version one is a browsable catalogue with approximately 40–50 products across 3–4 categories and a product enquiry path. No cart or checkout in this release.
- Use representative dummy product records, images and INR prices in the reviewable draft. They must be marked as sample content in the preview and replaced or explicitly approved before publication. The founder's real product photography is not yet in this workspace.
- Gold colours: yellow, rose and white. Karats discussed: 9K, 14K, 18K and 22K. Each dummy product will list its own valid combinations; availability across all combinations must never be implied.
- Enquiry default: WhatsApp primary, using the **demo** number +91 7265000916. Business email on Contact: thehouseofaayam@gmail.com. Both destinations are to be checked at the final gate.
- No fixed deadline for the full website has been specified. The existing 28 September countdown belongs to the launching-soon page until the founder says otherwise.
- The current launching-soon page remains the live-site source during draft and local preview work. Do not replace the domain's page as part of a design phase.

## Phase 1 — Scope and gate plan

**Output:** this plan and an updated working brief. Separate confirmed choices from dummy assumptions. Define what is being reviewed at every gate.

**Done when:** the plan is saved, the first-release journey and content policy are explicit, and the handoff explains what the founder must check.

**Gate 1, founder review:** check the phase order, catalogue/enquiry scope, WhatsApp-first direction, and the rule that sample content stays in preview until approved. No detailed product decisions are required at this gate.

**Recommended model for Phase 2:** GPT-6 Astra, High reasoning. It is a contained reference and design judgement pass; use it once, then return to Sol for implementation.

**Status:** complete; Gate 1 accepted by the founder, who authorised Phase 2.

## Phase 2 — Reference audit and visual specification

**Output:** desktop and mobile observations for Miansai's homepage, navigation, collection and product page; a visual specification for Aayam covering typography, colour, spacing, photography, grids, interaction and responsive behaviour. Record direct observations separately from proposed Aayam adaptations. Cite the relevant reference pages. If a browser cannot render the reference, document the limitation and use accessible source evidence; do not claim an exact visual match.

**Done when:** the founder can assess a clear, bounded visual direction for the three core page types and a mobile menu.

**Gate 2, founder review:** approve the visual direction and identify the two or three reference details that matter most. Decide whether to keep or replace the current early logo in the draft.

**Recommended model for Phase 3:** GPT-6 Luna, Low or Medium reasoning, for structured dummy records and routine copy. Escalate to Sol only if the content model needs design decisions.

**Status:** complete. Gate 2 accepted 27 September 2026: the founder confirmed the white/pale-grey, charcoal-text, quiet Miansai-style direction for the catalogue draft (the launch page keeps its own separate ivory/gold treatment) and four separate categories (Rings, Bracelets, Chains, Pendants). The early-logo decision was not revisited and stands as Phase 2 left it: keep `assets/logo.png` for the first draft, test it at header sizes in Phase 4. Deliverable: `Phase 2 Visual Specification.md`. The live reference was visually inspected on desktop and mobile. Its paired campaign opening supersedes the earlier headline-led hero proposal.

## Phase 3 — Dummy catalogue and content contract

**Output:** 8–12 representative dummy products across provisional Rings, Bracelets, Chains and Pendants; names, IDs, category, selected valid gold colours/karats, variant choices, sample INR prices, image references and short descriptions. Draft the display rules for product cards, filters, search and enquiry messages. Map the 40–50 product expansion as a repeatable data format. Existing brand copy from `Page Copy Draft v1.md` is refined against the visual specification.

**Done when:** the sample catalogue can exercise every template and interaction without invalid variant combinations or unlabeled sample prices. Placeholder images are traceable and their rights/fitness for public use are reviewed before launch.

**Status:** complete 27 September 2026. Deliverables: `Phase 3 Dummy Catalogue and Content Contract.md` (schema, display/filter/sort/search rules, enquiry message contract, pricing methodology) and `catalog/products.sample.json` (12 dummy products, 3 per category, 36 variant combinations, ₹33,500–₹2,43,000). Four shared category placeholder photos sourced from Unsplash's free tier and saved to `catalog/images/placeholders/`, with sources recorded for traceability. Founder confirmed in advance: four categories, original Aayam-style naming, and pricing anchored to the founder's own investor-deck cost data.

**Gate 3, founder review:** check whether the provisional categories, product naming tone, sample price display and enquiry wording feel right. These are design choices; real prices and final inventory are not required yet.

**Status of Gate 3:** the founder said "Goto phase 4" without raising changes, taken as Gate 3 acceptance as-is 27 September 2026.

**Recommended model for Phase 4:** GPT-6 Sol, Medium reasoning, for the three core responsive templates and functional prototype.

## Phase 4 — Core visual and working prototype

**Output:** responsive homepage, All Jewellery or one representative category page, one product detail page and mobile navigation. The product page must support only offered colour, karat and size combinations. The enquiry action prepares a WhatsApp message with product ID/name, selected options and product URL. Email is accessible from Contact. The preview displays an unmistakable sample-content notice.

**Done when:** the pages render at desktop and mobile sizes, the primary journey works from home to enquiry, there are no dead buttons, and the rendered result is compared against the Phase 2 visual specification.

**Status:** complete 27 September 2026. Built in the isolated `preview/` folder (does not touch `index.html`/`styles.css`/`script.js`, the live launch page): `index.html` (Home), `all-jewellery.html` (the full 12-product collection with Category/Gold colour/Karat filters, Featured/Price sort, and search), `product.html` (a single dynamic product template driven by `?id=`, used against all 12 catalogue records), `contact.html`, and a shared `coming-soon.html` stub for Our Story/Materials & Care/Find your size, which are out of Phase 4 scope. Mobile navigation is a full-height drawer with focus handled via Escape and a backdrop click. Compared against `Phase 2 Visual Specification.md` at build time; this caught two real deviations that were fixed before Gate 4: (1) the campaign pair was stacking to one column on mobile instead of staying two columns as the spec requires, and (2) the dummy catalogue had no product with asymmetric colour/karat availability, so the product page's "disabled — not offered in this combination" state was never exercised — the Kavi Onyx Signet Ring's variant list was adjusted (Rose now 14K only) to test it. Verified in-browser at desktop and 375px mobile widths, including the WhatsApp enquiry link's decoded message text, empty filter state, and the size-based enquire-button gating.

**Gate 4, founder review:** inspect desktop and mobile previews for visual closeness to Miansai, Aayam brand feel, legibility, image crops, navigation, variant selection and enquiry text. Gather feedback in one list.

**Status of Gate 4:** the founder said "Go ahead to Phase 5" without raising changes, taken as Gate 4 acceptance as-is 27 September 2026.

**Recommended model for Phase 5:** GPT-6 Sol, Medium reasoning; use Luna for repetitive catalogue expansion once templates are stable.

## Phase 5 — Complete draft catalogue and supporting pages

**Output:** expand to about 45 dummy products, build all provisional category pages, site search and useful filters, and complete Our Story, Materials & Care and Contact. Add service pages only for services Aayam actually offers; leave unsupported claims out. Apply Gate 4 feedback.

**Done when:** every sample product has a coherent page, every category has inventory, filters/search return correct results, contact links work, and the whole site is checked at desktop and mobile sizes.

**Status:** complete 27 September 2026. `catalog/products.sample.json` expanded from 12 to 45 products (12 Rings, 11 Bracelets, 11 Chains, 11 Pendants; 122 variant combinations; ₹33,500–₹2,97,000), reusing the same four shared category placeholder images established in Phase 3 — no new photography was sourced, consistent with the "real photography still not available" answer given before Phase 3. All four categories are browsable via `all-jewellery.html?category=X` (no separate per-category URL templates were built, since the existing filtered-collection view already satisfies "every provisional category page" functionally). Search was widened to also match each product's short description. Built `preview/our-story.html` and `preview/materials-care.html` with real copy from `Page Copy Draft v1.md`, each with a visibly flagged "to confirm before release" block wherever the copy draft calls for founder-verified information (a founder bio; Aayam's exact alloy/hallmarking/sizing/care specifics) rather than inventing it. Every nav/footer link across all seven `preview/` pages now points at these real pages instead of the Phase 4 coming-soon stub, which was deleted. No shipping/returns/warranty service pages were added, since no such policies have been confirmed — the Ordering accordion continues to say those are confirmed over WhatsApp or email. Checked in-browser at desktop and 375px mobile widths.

**Gate 5, founder review:** review the complete browsing experience and content tone. Identify what real product data, imagery, care instructions and business policies must replace draft content before release.

**Recommended model for Phase 6:** GPT-6 Sol, Medium reasoning for data integration and verification; use Astra, Medium, for one final visual critique if the reference match still needs judgement.

## Phase 6 — Real catalogue and release preparation

**Output:** replace all dummy products, images and prices with founder-supplied or approved data; verify each published combination and image; confirm WhatsApp number, email and public copy; validate metadata, accessibility, mobile flows and links. Choose the implementation/hosting arrangement based on the finished site and how the founder wants to edit products. Prepare the Netlify/GoDaddy deployment steps using the actual configuration then in place.

**Done when:** a release candidate contains no unapproved placeholder products, prices, imagery, contact information or operational claims, and the founder can review a precise before/after deployment checklist.

**Gate 6, founder review:** approve the release candidate, business details and domain switch. Publishing occurs only after this gate.

**Recommended model for publication:** GPT-6 Sol, Medium reasoning, for deployment and live verification.

## Publication and later commerce

After Gate 6, deploy the approved version, verify both `thehouseofaayam.com` and `www`, test the public enquiry link and email, and confirm search visibility settings. Report the live result and any DNS/certificate propagation still in progress.

Cart, checkout, payment, orders and inventory integration are a separate later scope. Keep product IDs and variant data structured so that this can be added without rewriting the catalogue.

## Gate handoff format

At each gate, report in five short lines:
1. **Completed:** concrete deliverables.
2. **Review:** exact preview or file links.
3. **Check:** the decisions or visual points requiring founder judgement.
4. **Open items:** unresolved facts or limitations.
5. **Next model:** model and reasoning setting for the following phase.

No phase is considered accepted just because time passes. Founder feedback can revise an earlier decision; update this plan when that happens.
