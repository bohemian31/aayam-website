# Developer reference — The House of Aayam

Use this with `PROGRESS.md` and `CHANGELOG.md`. It describes the files currently on disk and the handoff contract for subsequent work. Last checked: 27 September 2026.

## Project status: on hold

The founder paused all phase work on 27 September 2026 pending real product photography and product data — see `PROGRESS.md` for the full explanation. Do not start Phase 6 (or any further catalogue/preview changes) until that material is supplied. Documentation upkeep, and answering the founder's own questions, are still fine to do while paused.

## Repository and runtime facts

- This directory **is a Git repository** as of 27 September 2026, with a public GitHub remote at `https://github.com/bohemian31/aayam-website` (branch `main`, `origin`). One commit so far. Check `git status`/`git log` before assuming clean state, and don't force-push or rewrite history without the founder's explicit say-so.
- `.gitignore` excludes: `.DS_Store`; `.claude/` (this session's local tooling config); `Business Context/The House of Aayam - iSPROUTE'26.pdf` (investor pitch deck); `Business Context/Visual Specifications - Screenshots/` (competitor reference screenshots). These are excluded because the repo is public and this material is business-sensitive or third-party copyrighted — never remove these exclusions or commit those paths without the founder's explicit approval.
- The current executable site is static HTML/CSS/JavaScript. There is no `package.json`, bundler, app framework, or backend in the files inspected. This is a deliberate, confirmed decision (27 September 2026) — no CMS, no accounts, no checkout — not a placeholder pending a future stack choice.
- The `index.html` at the project root is the launching-soon page. Avoid overwriting it with the prototype before the release gate. Build the full-site draft in an isolated subdirectory or another clearly separate preview arrangement (this is what `catalog/` and `preview/` already are).
- Hosting is confirmed as Netlify for the live domain (chosen over Vercel specifically because Vercel's free "Hobby" tier's terms of service prohibit commercial use, while Netlify's free plan explicitly allows it). Netlify continues to serve only the launch page; this has not changed. GitHub Pages was separately enabled on the same repo as an additional, unrelated read-only preview channel for the dummy catalogue — see "GitHub Pages preview" below. Neither of these affects the other.

## File map and authority

| Path | Role | Notes |
| --- | --- | --- |
| `index.html` | Current launch page | Static copy, metadata, logo, countdown markup, hero image |
| `styles.css` | Current launch-page styles | Ivory/gold palette and responsive layout; not the approved catalogue visual system |
| `script.js` | Countdown logic | Absolute IST target; clamps all units to zero |
| `robots.txt` | Crawler policy | `User-agent: *` and `Disallow: /` |
| `assets/logo.png` | Early Aayam logo | 881 × 507 RGBA PNG; inspect transparency/padding and small-size legibility |
| `assets/hero.jpg` | Launch-page photograph | 933 × 1400 progressive JPEG; current catalogue photography has not been supplied |
| `Business Context/The House of Aayam - iSPROUTE'26.pdf` | Business pitch | Strategy source; do not convert speculative claims into product facts |
| `Business Context/Implementation Plan and Gates.md` | Phase order and review contract | Follow its stop-after-each-gate workflow |
| `Business Context/Phase 2 Visual Specification.md` | Current catalogue visual direction | Supersedes older layout proposals where they conflict; awaiting Gate 2 approval |
| `Business Context/Website Blueprint v1.md` | Earlier sitemap/structure draft | Useful for scope; layout details are provisional where superseded |
| `Business Context/Page Copy Draft v1.md` | Initial brand/page copy | The earlier hero placement is superseded; copy remains draft |
| `Business Context/Visual Specifications - Screenshots/` | Miansai reference captures | Nine PNGs with timestamp names; inspect before using as evidence; do not ship as Aayam assets |
| `Business Context/Phase 3 Dummy Catalogue and Content Contract.md` | Catalogue schema, display rules, pricing methodology | Ready for Gate 3; governs how `catalog/products.sample.json` must be read and rendered |
| `catalog/products.sample.json` | Dummy catalogue data | 12 products, 4 categories, 37 variant combinations; `sampleContent: true` throughout; see the Phase 3 document for the schema |
| `catalog/images/placeholders/` | Shared category placeholder photos | One JPEG each for Rings, Bracelets, Chains, Pendants, sourced from Unsplash's free tier; sources and limits recorded in the Phase 3 document; not licensed for public release |
| `preview/` | Phase 4/5 working prototype | Home, All Jewellery, Product, Contact, Our Story, Materials & Care, mobile nav. Isolated from the live launch page at the project root. See §"Phase 4 prototype" below. |
| `PROGRESS.md` / `CHANGELOG.md` / this file | Handoff documents | Update at every phase gate and major scope change |

## Launch-page behaviour

`script.js` calculates the difference between `Date.now()` and `new Date("2026-09-28T08:00:00+05:30")`, then renders two-digit days/hours/minutes/seconds into the IDs in `index.html`. `Math.max(0, ...)` prevents negative values and the interval is cleared once zero is reached. The exact timezone offset is embedded in the target string; the display does not depend on the visitor's local timezone.

The launch page loads Google Fonts for Cormorant Garamond and Jost and local `styles.css`. Reduced-motion preference disables entry animations. Its social preview references the domain's `/assets/hero.jpg`; whether that URL serves correctly is a deployment question.

To preview locally from this folder, use a simple static server, for example `python3 -m http.server 8000`, and open `http://localhost:8000/`. Choose a free port if 8000 is occupied. This is a developer instruction, not a statement that a server is currently running.

## Phase 3 catalogue data (current)

`catalog/products.sample.json` is the live source for Phase 4 templates. Read `Business Context/Phase 3 Dummy Catalogue and Content Contract.md` before consuming it — it defines the exact field meanings, the card/filter/sort/search rules, and the enquiry message template. Do not add fields to the JSON without updating that document, and do not treat any value in the file as real (every product/price/image is `sampleContent: true`).

## Phase 4 prototype (current)

`preview/` is a plain HTML/CSS/vanilla-JS prototype, deliberately dependency-free like the launch page. It fetches `../catalog/products.sample.json` at runtime, so it must be served over HTTP, not opened via `file://` — use the existing `.claude/launch.json` "aayam" config (`python3 -m http.server 8123` from the project root) and open `http://localhost:8123/preview/index.html`. Opening the file directly will show a blank/broken page because `fetch()` is blocked on the `file:` scheme.

- `preview/styles.css` — the Phase 2 design tokens (colours, type, spacing, breakpoints) implemented as CSS custom properties and media queries at 768px/1024px.
- `preview/catalog.js` — shared helpers: `loadCatalog()`, price/material formatting, `whatsAppLink()` (builds the exact enquiry message from the content contract), grid rendering, and the mobile drawer/search wiring shared by every page.
- `preview/index.html`, `all-jewellery.html`, `product.html`, `contact.html`, `our-story.html`, `materials-care.html` — the six pages. `product.html` is a single template driven by the `?id=` query string against any of the 45 catalogue records, not one static file per product. There is no separate per-category URL template; every category is browsed via `all-jewellery.html?category=X`.
- `preview/images/campaign-*.jpg` — the two homepage campaign photographs (sourced from Unsplash's free tier, same sourcing caveats as the Phase 3 category placeholders).
- Header/drawer/footer markup is duplicated across all six HTML files (no templating engine, matching the project's plain-file approach). If a nav or footer change is needed, apply it to all six.
- `our-story.html` and `materials-care.html` intentionally leave visible "to confirm before release" placeholders (dashed border, italic) wherever `Page Copy Draft v1.md` calls for founder-verified information rather than draft copy — do not fill these in without the founder's actual input. `materials-care.html` has a `#fit` anchor on its "Finding your fit" section that `product.html`'s "Find your size" link points to.
- Known simplifications versus the full Phase 2 spec, left for a later phase: no wide editorial insert or second styling-image section on the homepage; product gallery alternate/detail thumbnails currently point at the same shared placeholder image as the primary photo (per the Phase 3 image-status note, since every product in a category still shares one placeholder photo even after the Phase 5 catalogue expansion). No shipping/returns/warranty service pages exist, by design — none are confirmed yet.

## GitHub Pages preview (current)

The founder enabled GitHub Pages on `main`/root, giving two live URLs in addition to local-server preview:

- `https://bohemian31.github.io/aayam-website/` — the launch page (same content as `thehouseofaayam.com`).
- `https://bohemian31.github.io/aayam-website/preview/index.html` — the dummy catalogue prototype, now viewable without a local server. Works because every path in `preview/` is relative (`../catalog/...`, `../assets/...`), so it resolves correctly whether served from `localhost:8123/preview/` or from GitHub Pages' `/aayam-website/preview/` subpath.

This is a read-only mirror of whatever is on `main` — pushing new commits updates it automatically after GitHub's Pages build finishes (usually within a minute or two). It is not connected to Netlify or the real domain in any way; treat it purely as a second, link-only way to show someone the dummy catalogue without giving them file access or a local server.

## Full catalogue contract agreed so far

First release journey: Home → All Jewellery / Category / Search → Product detail → Select valid offered options → **Enquire about this piece** → prepared WhatsApp message. Contact also lists the business email. No cart, checkout, account, wishlist, or newsletter is planned for the first draft.

Draft data may use provisional **Rings, Bracelets, Chains, Pendants**. Phase 3 should create 8–12 representative product records, then Phase 5 can expand to approximately 45. These are placeholders, not real inventory. Each record should have a stable ID/SKU, slug, category, display name, short description, explicit list of available variants, sample INR price per displayed variant, relevant size/length options, image references, and sample-content status. Store variants as an explicit list rather than deriving every combination of gold colour × karat × size. The final format is a Phase 3 deliverable, not an existing schema.

Product pages and cards must match the selected variant's material, image, and price. A WhatsApp URL should contain the product ID/name, colour, karat, size or sizing-help request, and the product page link. The link prepares a message; the visitor sends it. The founder's **demo** destination is `+91 7265000916` and the business email is `thehouseofaayam@gmail.com`. Verify both for publication. Do not send a test message without the user's instruction.

All visible dummy products and prices need an unmistakable preview label. Do not publish fictitious availability, hallmarking, warranties, shipping, exchange, origin, or craftsmanship claims as facts. Service and material guidance require owner verification. The pitch's strategic plans are not launch promises.

## Visual implementation handoff

Read `Business Context/Phase 2 Visual Specification.md` before building. The critical pattern is a paired image opening with captions **below**, followed by a pale-grey product grid. Desktop grid: four columns, labels above images. Mobile grid: two columns, labels below images. Product detail: large gallery beside compact information on desktop; gallery then information on mobile. Use Aayam's own logo and licensed/available fonts. The recommended body text colour and background are measured from the reference, while all Aayam dimensions and breakpoints in the spec are proposals for prototype testing.

The early logo is still awaiting Gate 2 confirmation. Inspect it at desktop and mobile header sizes before deciding if it needs a compact variant. The launch-page ivory/gold design is a separate, earlier choice and should not automatically set the catalogue palette.

## Verification and release checklist for later phases

At the prototype gate, check rendered desktop and 390px/360px mobile views; navigation, gallery, option selectors, keyboard access, filter/search states, nonfunctional controls, and the generated WhatsApp URL. Keep the sample-content banner visible. At the complete-draft gate, verify every product route and every filter combination against the dummy dataset.

Before public release, replace or approve all dummy records, images, prices, and descriptions; verify source rights for imagery and fonts; validate per-product colour/karat/size availability; confirm contact destinations and service policies; review accessibility and metadata; decide whether and how to change `robots.txt`; verify both the apex and `www` domain plus HTTPS after deployment. These are future gates, not checks completed by this document.

## Editing and coordination conventions

- At each gate, record the founder's decision in `PROGRESS.md`, update the phase status in `Business Context/Implementation Plan and Gates.md`, and add a dated `CHANGELOG.md` entry.
- Keep observed reference details separate from Aayam proposals and later approved decisions. Recheck a live reference if a particular detail materially affects implementation; websites change.
- Keep the current launching-soon page intact while creating the draft. If a new framework is chosen, document the exact preview and build commands here.
- Commit and push to `https://github.com/bohemian31/aayam-website` as work progresses, respecting the existing `.gitignore` exclusions (never commit the pitch deck or competitor screenshots without the founder's explicit say-so).
- **Project is on hold.** Phase 5 is complete; Gate 5 was never formally given (founder moved to infrastructure planning instead, then paused). Phase 6 is blocked on the founder supplying real product photography and product data — that, not Gate 5, is what determines when work resumes. See `PROGRESS.md` for full detail.
