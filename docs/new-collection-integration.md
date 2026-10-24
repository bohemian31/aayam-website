# Chains, Cufflinks and Accessories — preview integration

24 October 2026. This release adds 13 enquiry-only listings and 49 square WebP views to the 47 existing listings. Every new view is a selected generated illustration exported from a manifest-checked local PNG. Source photos and masters remain in ignored `output/catalogue-images/`; `catalog/new-collection.media.json` records the master/export hashes. Runtime content is authored in `catalog/new-collection.content.json` and assembled by `scripts/build_new_collection.py`.

| ID | Product | Selected master folder under `output/catalogue-images/approved/` | Views |
| --- | --- | --- | --- |
| AYM-CH-101 | Avir Two-Tone Pointed-Link Chain | `chains/two-tone-pointed-link-chain/` | Hero, alternate, worn |
| AYM-CH-102 | Neer Graphite Bridge-Link Chain | `chains/graphite-bridged-link-chain/` | Hero, alternate, worn |
| AYM-CL-101 | Veyar Chain-Loop Cufflinks | `cufflinks/sample-001/gold-chain-loop-blue-end-cufflinks/` | Hero, alternate, worn |
| AYM-CL-102 | Rudra Horse & Horseshoe Cufflinks | `cufflinks/batch-001/horse-horseshoe-cufflinks/` | Hero, alternate, worn |
| AYM-CL-103 | Zaal Spade Cufflinks | `cufflinks/batch-001/black-spade-plate-cufflinks/` | Hero, alternate, worn |
| AYM-CL-104 | Neer Green Accent Cufflinks | `cufflinks/batch-001/green-round-accent-cufflinks/` | Hero, alternate, worn |
| AYM-CL-105 | Arka Five-Point Crown Cufflinks | `cufflinks/batch-001/five-point-crown-cufflinks/` | Hero, alternate, worn |
| AYM-CL-106 | Kiaan Ace-Card Cufflinks | `cufflinks/batch-001/ace-card-cufflinks/` | Hero, alternate, worn |
| AYM-CL-107 | Custom Monogram Cufflinks | `cufflinks/batch-001/custom-monogram-cufflinks/variants/` | Script 3, serif DN 3, angular NG worn only |
| AYM-AC-101 | Rihan Teardrop Sunglasses Charm | `other/batch-001/pearl-drop-sunglasses-charm/` | Hero, alternate, worn |
| AYM-AC-102 | Kaash Shell & Bead Sunglasses Charm | `other/batch-001/shell-pearl-sunglasses-charm/` | Hero, alternate, worn |
| AYM-AC-103 | Tavi Tennis-Racket Band Charm | `other/batch-001/tennis-racket-charm/variants/` | Silver/beige 3; gold/black 3 |
| AYM-AC-104 | Ojas Tennis-Ball Band Charm | `other/batch-001/tennis-ball-charm/variants/` | Silver/beige 3; gold/black 3 |

The graphite chain was moved from review into approved-local masters after the founder explicitly requested its inclusion. The warm oval chain is deferred and not exported. The old 10 Chain and 7 Pendant single-photo reference records have been removed from the active catalogue. Their former IDs intentionally show an unavailable message.

The illustrated colour looks on the band charms are not confirmed SKU variants; visitors can choose an image look and name it in WhatsApp/email. The racket and ball appear together in the source photos, so standalone construction and sale configuration need confirmation. Cufflink backs are mostly unseen, and monogram letterforms—particularly the NG worn-only example—need a physical-product check. The ace-card's exact symbol is also unresolved from source views. Do not assert actual metals, stones, gold purity, dimensions, fastening, compatibility with WHOOP or specific frames, stock, weight or price from these illustrations. The product page, gallery note and enquiry prompts keep these details open.

Build after the older category builders: `python3 scripts/build_new_collection.py`. The script refuses unapproved/missing/changed masters and enforces 1254×1254 PNGs. Then serve the repository and run `node scripts/verify_catalogue.cjs` using Playwright. Keep the root launch page and Netlify deployment outside this preview integration.
