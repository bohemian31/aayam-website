# The House of Aayam — Website blueprint v1

Draft dated 26 September 2026. This is the structure and content draft for review before implementation. The phase sequence and review gates are in `Implementation Plan and Gates.md`. Product categories, prices and product claims are sample content until replaced or approved.

## Objective

Create Aayam’s first full website with Miansai as the primary reference for layout, visual hierarchy, product discovery and page rhythm. The result should feel restrained, contemporary and confident, introduce men to everyday jewellery, and make the opening collection easy to understand and explore.

The reference should guide both layout and visual styling as closely as possible; brand identity, words, photography and product information should belong to Aayam. The founder has selected close Miansai styling over preserving the earlier ivory/gold launch-page treatment. Exact colours and typography will be settled through the visual reference audit.

## Confirmed founder decisions

- First release: visitors browse products and enquire. Checkout comes later.
- Approximately 40–50 products across 3–4 categories; category names remain to be confirmed.
- Product photographs are available.
- Range is fine jewellery, predominantly gold, with yellow/gold, rose gold and white gold, and 9K, 14K, 18K and 22K options. Availability must be mapped per product; do not assume all combinations exist.
- Follow Miansai’s visual styling as closely as possible.
- For the draft, use clearly labelled sample INR prices. The enquiry direction is WhatsApp first at demo number +91 7265000916, with thehouseofaayam@gmail.com on Contact. No full-site deadline is specified.

## Context and working assumptions

- The pitch positions Aayam around everyday self-expression, understated design, versatile wear and material transparency.
- Its wider roadmap includes multiple materials and price tiers, modular pieces, and an eventual hybrid retail/D2C model. These are strategic possibilities, not confirmed launch inventory or customer promises.
- Provisional audience: Indian men buying for themselves, with gifting as a secondary journey. India/INR is a working assumption.
- The first site is a catalogue with enquiries. The later checkout phase should reuse stable product identifiers and variant data.
- Earlier requests for no forms or actions applied to the launching-soon page. For this draft, omit newsletter popups; confirm commerce and enquiry needs separately.

## Reference findings and limits

Reviewed Miansai’s current homepage and men’s rings collection through web retrieval. The homepage provides extensive category navigation, category-led browsing, search, a shopping bag and service links. The collection exposes product names, material variants, prices, size selection and sorting. These are useful patterns for Aayam.

Sources:
- https://www.miansai.com/
- https://www.miansai.com/collections/men-rings
- https://www.miansai.com/pages/about

The initial browser attempt failed, but the Phase 2 audit subsequently loaded and visually inspected the live homepage, collection and product pages at desktop and mobile sizes. See `Phase 2 Visual Specification.md` for measured styles, observations and limits. Its page compositions supersede the provisional layouts below where they differ.

## Work plan and review outputs

| Stage | Work | Concrete output / completion condition |
| --- | --- | --- |
| 1. Define launch scope | Confirm transaction model, inventory, geography, deadline and available assets | One-page scope with explicit launch pages and functions |
| 2. Finalise structure | Map navigation and discovery-to-product-to-action flow | Sitemap and section order with no empty categories |
| 3. Prepare content | Draft copy, populate real product information, specify photography | Page copy and product content inventory; unknowns explicitly marked |
| 4. Draft visual layouts | Audit reference visually; create desktop/mobile home, collection and product layouts | Reviewable screens using Aayam identity and representative products |
| 5. Select build approach | Match platform and content-editing workflow to confirmed transaction needs | Implementation specification covering hosting, content and commerce |
| 6. Build and verify | Implement templates, populate assets and test complete journeys | Responsive preview; working links/actions; accurate prices/variants; accessible navigation |
| 7. Publish | Complete commercial content, domain setup and launch checks | Live site with working contact/purchase flow and search metadata |

Stages 1–3 are the current work. The next visual deliverable should be three representative templates, allowing us to settle the system before extending it to all pages.

## Proposed navigation and sitemap

Desktop: Aayam wordmark / Jewellery / Our Story / Materials & Care / Contact / Search. Jewellery opens the 3–4 confirmed categories and View All. No Bag or account for the first catalogue release.

Mobile: compact wordmark header, menu and search; clear category links inside the menu.

| Page | Purpose | Draft content |
| --- | --- | --- |
| Home | Establish the brand and introduce products | Campaign image, opening collection, category tiles, styling feature, short brand story |
| All Jewellery | Browse the opening collection | Product grid, names, materials and agreed price presentation; useful filters only |
| Category | Narrow by product type | Rings, Bracelets, Chains & Pendants — provisional; omit categories without inventory |
| Product detail | Understand fit, material, value and next step | Gallery, specifications, price, variants, fit guide, availability and action |
| Our Story | Explain Aayam’s point of view | Everyday identity, design approach, verified founder/manufacturing background |
| Materials & Care | Support confident choices | Actual launch materials, finishes, care, wear limitations and sizing |
| Contact | Reach a real person | Confirmed support channel, hours and location where applicable |
| Service pages | Explain purchase conditions | Shipping, returns/exchanges, warranty, privacy and terms appropriate to the chosen model |
| Bag and checkout — later phase | Complete a purchase | Excluded from the first catalogue release |

For the confirmed 40–50-piece range, use All Jewellery plus the 3–4 confirmed category pages. Defer accounts, wishlist, loyalty, a large journal and customisation tools until there is a demonstrated need.

## Homepage — first content draft, top to bottom

Superseded for layout by the Phase 2 specification: use paired campaign photographs with captions, followed by featured products, editorial/category imagery and a short brand statement. Retain suitable copy below for the later story section rather than a large opening headline.

| Order | Module / layout proposal | Draft copy | Action / content needed |
| --- | --- | --- | --- |
| 1 | Restrained header | The House of Aayam | Confirmed navigation |
| 2 | Large campaign photograph with a short headline | **A personal signature.** / Contemporary jewellery for men. An expression of your own. | **Explore the collection**; landscape and portrait campaign crops |
| 3 | Curated product row, 4–6 pieces if available | **The first collection** | Actual names, materials, prices and images; link to each product |
| 4 | Three or four category image tiles | **[Confirmed category names]** | Confirm categories; each tile links to its collection |
| 5 | Large on-body editorial image with concise text | **Make it part of your everyday.** / One piece. Your own way of wearing it. | **Explore the edit**; link to a curated product group, not an empty editorial page |
| 6 | Short story beside a detail or workshop photograph | **The House of Aayam** / We believe jewellery has a place in a man’s everyday life. A personal detail. A way to express taste. Something that becomes part of how you dress. | **Our story**; founder review of positioning |
| 7 | Small guidance links | **Know your materials. Find your fit. Care for your pieces.** | Link to complete guidance sections |
| 8 | Quiet footer | Shop / Our Story / Materials & Care / Contact / service links | Confirm business details and social links |

Alternative hero headlines: **Everyday, with intention.** or **An expression of your own.** Use a single primary hero message in v1.

Use “The first collection” at launch. “Best sellers,” testimonials and trust badges should be backed by actual evidence. Shipping and warranty promises belong on the site only once operationally confirmed.

## Collection page draft

- Provisional heading: **The collection**.
- Intro: “Explore the first collection from The House of Aayam.” Keep this short so the products remain prominent.
- Proposed grid: four columns on wide desktop screens, two on mobile; adapt to image proportions and catalogue size during wireframing.
- Cards show product image, actual product name, explicit material and agreed price presentation. Colour alone must not stand in for material information.
- Include category and material filters only when there are meaningful choices. Sorting by price becomes useful as the range grows.
- Distinguish sold out, made to order and available states using real inventory rules.

## Product page template

Proposed desktop composition: generous image gallery left, purchasing/enquiry information right. On mobile: primary image, product identity/price, selectors and action, followed by details and further images.

Information order:
1. Product name, material and agreed price presentation; clarify taxes if prices are displayed.
2. One concise description explaining form and intended wear.
3. Material, finish, size or length selectors for real variants.
4. Fit guide and confirmed availability/lead time.
5. Enquire About This Piece, carrying the product reference and selected options to the chosen contact channel. Add to Bag belongs to the later checkout phase.
6. Details: composition, purity where applicable, dimensions, weight where appropriate, fastening and what is included.
7. Care, delivery, returns and warranty information relevant to the item.
8. A small related-products group only if suitable products exist.

Copy template: “[Product name] pairs [verified form/detail] with [verified material/finish]. [Specific, supportable sentence about how it wears].” Product descriptions cannot be finalised without the catalogue.

Modularity, engraving, certifications, exchange programmes and manufacturing claims appear only on products or pages where confirmed.

## Design and photography direction

- Follow the visually audited Miansai background, typography, spacing and divider treatment closely, using Aayam’s wordmark and assets. Do not force the earlier decorative gold accents into this direction.
- Typography should be quiet and readable, with compact navigation and modest headline sizes established during the reference audit.
- Alternate campaign images and clean product sections to create a deliberate browsing rhythm.
- Prefer jewellery worn with ordinary, considered clothing: a shirt cuff, knitwear or an open collar. The image should make scale and styling understandable.
- Product assets per piece: clean primary image, alternate angle, detail/fastening and on-body scale view. Aim for consistent lighting, crop and background across the range.
- Editorial needs: one campaign set, one image for each confirmed category, one styling set and verified workshop imagery if used in the story.
- Existing stock imagery can be a labelled layout placeholder during review. Final product imagery must accurately represent Aayam’s products.
- Mobile layouts need intentional portrait crops, touch-friendly selectors, readable copy and visible actions. Motion should be subtle and respect reduced-motion preferences.

## Content inventory and planned documents

This blueprint is the working source of truth. Once scope is confirmed, prepare:
- `launch-scope.md`: launch model, target market, pages, functions and deadline.
- `page-copy.md`: final headings, descriptions, actions and service content.
- `product-catalog.csv`: SKU, name, category, composition, finish, variants, dimensions, price, availability, lead time, care and image references.
- `asset-shot-list.md`: required image, subject, crop, source and readiness.
- `wireframes/`: desktop/mobile home, collection and product drafts.
- `implementation-spec.md`: chosen platform, reusable templates, content workflow and launch checks.

Do not choose a code file structure before the platform decision. A static catalogue and a transactional store have different requirements. Existing Netlify hosting is a starting point for the current static site, not a commitment for the full store.

## Catalogue and enquiry behaviour — confirmed direction

With 40–50 products, provide category pages, a searchable View All collection and useful filters. Proposed filters: category, gold colour and karat; add price filtering only if public prices are confirmed. Separate gold colour from karat. Each product’s valid combinations must come from the catalogue, with unavailable combinations omitted or clearly disabled.

Primary journey: Home → Category / Search → Product → Select offered gold colour, karat and relevant size → Enquire About This Piece.

The WhatsApp enquiry should include the SKU/name, page link and selected options so the customer need not repeat them. Use +91 7265000916 as a demo destination and verify it before publishing. A WhatsApp link prepares a message, with the customer choosing to send it. Show thehouseofaayam@gmail.com on Contact.

For the design draft, show clearly labelled sample per-variant INR prices to exercise product display, sorting and filtering. The final public price policy will be decided when real catalogue data arrives. Do not publish unapproved sample prices.

First visual prototype: Home, one representative Category, one Product Detail, mobile menu and enquiry handoff. Use 8–12 representative dummy records and approved placeholder imagery for layout review, then expand the dummy catalogue after the template is settled. The founder's real product photography is not yet in this workspace.

## Details to resolve as the draft advances

1. At Gate 3, review provisional category names and the sample price treatment.
2. Before publication, provide or approve real product names, photos, variants, prices and imagery rights.
3. At Gate 6, verify the WhatsApp number, business email, care information and service terms.

During catalogue preparation, confirm product names/SKUs, actual variant combinations, size choices, stock/made-to-order status, available on-body imagery and the final logo.

Before production build, also confirm shipping geography, support contact, dispatch/returns/warranty terms, content editor and platform budget. These do not prevent preparing the initial structural draft.

## First-draft completion criteria

The structural draft is settled when the launch model and real categories are confirmed, each proposed page has a clear purpose, homepage copy feels right to the founder, and unknown product/operational facts are listed explicitly. The visual draft is settled when the home, collection and one representative product page work on desktop and mobile and demonstrate the agreed Miansai reference treatment with Aayam’s identity.
