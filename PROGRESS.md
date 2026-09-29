# Project progress — The House of Aayam

Last updated: 29 September 2026. This is the current handoff. CHANGELOG.md preserves earlier phase history; older planning documents may contain historical catalogue counts.

## Current state

- The root index.html, styles.css, script.js, and assets/ remain the Launching Soon site. Its countdown reaches 00:00 at 28 September 2026, 08:00 IST and stays there. This work does not switch the live Netlify domain to the full catalogue.
- The browse-and-enquire full-site preview is under preview/, with plain HTML, CSS and JavaScript and no build step, CMS, account or checkout. The active draft catalogue is catalog/products.sample.json.
- The founder explicitly resumed work on 29 September and approved a 33-product reference-image preview, replacing the earlier 45 shared-placeholder listings. This is not the real-data/live-launch phase: the supplied photos are design references, and actual product facts are still unverified.
- The founder chose to show these reference images on the existing public GitHub Pages preview. Anyone with its URL can view it, and selected images will be in the public repository. Replace or clear all reference imagery and sample claims before launching the full site on the business domain.
- The preview carries a notice and noindex metadata. Root robots.txt also currently disallows crawling. These measures do not make GitHub Pages private.

## Catalogue and image mapping

The founder supplied 36 JPEGs in the local, git-ignored Products Images/ folder: 10 Rings, 8 Bracelets, 10 Chains and 8 Pendants. Three composite photos are held out because each shows multiple pieces:

- Products Images/Men_s Rings/download (1).jpg
- Products Images/Men_s Rings/download (10).jpg
- Products Images/Men_s Pendants/download (2).jpg

The remaining 33 photos are copied once each to catalog/images/reference/, with normalized names ring-01.jpg–ring-08.jpg, bracelet-01.jpg–bracelet-08.jpg, chain-01.jpg–chain-10.jpg, and pendant-01.jpg–pendant-07.jpg. For each category, source filenames were alphabetized; usable photos map in order to the retained IDs AYM-RG-001–008, AYM-BR-001–008, AYM-CH-001–010, and AYM-PD-001–007. The three held photos map to no ID. Names and visual descriptions are provisional interpretations of these photos; do not infer metal, stone or purity from a photograph or source filename.

Each product points its primary, alternate and detail gallery fields at the same image file. There are no real alternate angles, detail views or on-body photos. The gallery labels this clearly. All retained products keep their original sample weights, prices, gold-colour/karat variants, sizes, details and care values unchanged from the 45-product dummy catalogue. Those values may disagree with a reference photo. Cards and product pages explicitly label them as samples; they must be replaced or verified before domain launch. Twelve unmatched old records are removed from the active JSON; Git history retains them. Unknown IDs show an unavailable-preview state rather than a different product.

Homepage featured cards and category tiles now use the new product references. The two campaign images remain the prior placeholders. Search, category/variant filters, sort, size selection and the prepared WhatsApp enquiry still operate on the active catalogue. WhatsApp goes to demo number +91 7265000916; the displayed email is thehouseofaayam@gmail.com.

## Editorial pages

The Our Story, Materials & Care, and Contact pages now use fuller editorial layouts within the existing pale-grey/white catalogue design. The story uses the pitch's positioning—everyday expression, personal choice and clarity—but omits founder names, Payal Jewellers, manufacturing history and future services until public wording is confirmed. The 9-page pitch remains local and excluded from Git.

Materials & Care gives general information on colour versus karat, fit and care, with an explicit warning that the preview's product specifics are samples. Contact gives WhatsApp and email paths, identifies the WhatsApp number as demo, and asks visitors to include the piece reference and questions. There is no form, support-hours promise or unconfirmed policy.

## Verification and hosting boundary

Run a static server from this directory and open /preview/index.html; for example, python3 -m http.server 8123 and http://localhost:8123/preview/index.html. The same relative paths serve from GitHub Pages at https://bohemian31.github.io/aayam-website/preview/index.html. Pages in preview/ are public when pushed to main; the root URL on GitHub Pages mirrors the launch page. Netlify and thehouseofaayam.com are separate and remain unchanged by a GitHub push.

Checks for this update: 33 unique products and image files; 8/8/10/7 category counts; preserved sample fields for retained IDs; three gallery references per product to one file; valid JS syntax; homepage image loading; collection category/search counts; enquiry URL includes new title and ID; removed ID state; desktop and 375px mobile layouts; mobile filter overflow fixed. Recheck the deployed Pages URL after pushing.

## Phase and gate history

Phases 1–5 produced the initial scope, Miansai visual audit, 45-product dummy catalogue, and static site preview; Gates 1–4 were accepted in September 2026. Gate 5 feedback on the old 45-product draft was never formally provided. The founder's 29 September request and explicit implementation plan supersede that old draft for this preview pass. This work is a partial Phase 6 preview update, not approval to release the full site on Netlify.

The next live-domain gate requires actual Aayam product photography with usage rights; confirmed names, compositions, karats, variants, sizes, weights and prices; final care and ordering information; and confirmation that the WhatsApp number is the intended business contact. Review the founder/manufacturing story separately before adding it.
