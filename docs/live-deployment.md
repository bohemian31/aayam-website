# Live-domain deployment handoff

Prepared on 24 October 2026 for `thehouseofaayam.com`. The domain currently resolves to the existing Netlify launch page. The GitHub Pages preview is a separate deployment and remains unchanged.

At preparation time, the apex resolved to Netlify's `75.2.60.5`, `www` pointed to `zippy-pasca-aa1745.netlify.app`, and the live launch page identified Netlify site ID `df7ca837-8530-4077-9a04-c8b9f935791b`. Confirm the project name and domain in the signed-in dashboard before uploading.

## Production artifact

Run `python3 scripts/build_live_site.py` to assemble `dist/` from the reviewed `preview/` catalogue. The builder copies only the 60 active product records, 189 unique selected WebP images, logo, campaign images and six public pages. It rewrites paths for the domain root, removes preview labels and `noindex`, changes `robots.txt` to permit indexing, adds basic static-page descriptions/canonicals and a sitemap, and uses WhatsApp **+91 94294 32142**. All product prices and unverified specifications remain on enquiry; gallery notes continue to describe generated illustrations and their limits. The root launching-soon source remains in Git as an easy rollback reference.

Run `node scripts/verify_live_site.cjs` with Playwright, an HTTP server serving this repository, and `BROWSER_EXECUTABLE` set to a Chromium-compatible browser. The local verification checks all 60 routes, images, the contact number, navigation, category counts, product galleries, mobile overflow and removal of preview/indexing blocks. `output/live-release-manifest.json` records hashes of every built file. The `dist/` folder and ZIP are ignored by Git because they are generated deliverables.

## Manual Netlify switch

The founder believes the current Netlify site was deployed by manual upload. Open the **existing** Netlify project serving `thehouseofaayam.com`, choose its **Deploys** area and upload the contents of `dist/` as a new production deploy. Use the existing project rather than creating a new one, so its domain and certificate stay attached. Netlify's deployment documentation describes manual deploys as production deploys on the project's primary domain. If the site is actually connected to Git, check its current build/publish settings before changing them; pushing this repository alone will not promote `preview/` to the domain root.

After upload, confirm the Netlify deploy succeeded, then check the homepage, all seven categories, a product gallery, a band-charm colour option, email/WhatsApp enquiry links, `/robots.txt`, and both apex and `www` domain routes. Run the browser verifier against `https://thehouseofaayam.com/`. If needed, use Netlify's deploy history to roll back to the previous launch-page deploy; the current launch-page files are still in the repository root.

Do not upload the whole repository or the ignored image-production folder: those contain the old launch page at root and private/unused source material. The production upload folder is **`dist/` only**.
