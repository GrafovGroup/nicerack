# Product and service image enrichment

## Scope

Added **140 original images**: one for each of 112 English product detail pages, separate images for all 24 French product detail pages, and four images for the planning, installation, sourcing/delivery and rental sections of `/services`.

Each image has exactly one assigned placement. Product listings, category cards, comparisons and related-product cards remain text-first so they do not repeat the detail-page photos. The existing homepage photograph remains exclusive to the homepage. Shared brand identity and functional icons are unchanged.

All new images were created with the built-in image-generation tool. No supplier photos, product specifications, customer-work claims or customer-facing image provenance captions were added. A vertical-wall equipment image was replaced after review to show the intended downward-hanging equipment orientation. The selected originals were reviewed across seven contact sheets plus detailed inspections. Alt text is neutral and localized for French products.

## Assets and uniqueness

- Files: `public/images/products/en`, `public/images/products/fr`, `public/images/services`.
- [Asset register](docs/imagery/asset-register.json): every source original, prompt, website, route, placement, dimensions and SHA-256.
- [Prompt set](docs/imagery/image-plan.json) and [corrected composition](docs/imagery/replacements.json).
- [Duplicate audit](docs/imagery/duplicate-audit.json): 606 accessible local raster files compared, including the 140 new images. No exact duplicates or perceptual near-duplicate candidates at a 64-bit difference-hash distance of 7 or less. Full visual review found no reused scenes among the selected images.
- Scope limitation: remote-only and inaccessible previous-site inventories were not available. This is not a claim of complete portfolio-wide verification.
- 140 WebP assets total approximately 19.38 MB; median 133 KB, largest 268 KB. Responsive Next.js image sizes, explicit dimensions and lazy loading limit per-page downloads. No shared fallback image was introduced.

## Verification

Lint, TypeScript, catalogue validation, and 58 automated tests passed. A new regression test requires all 140 unique references and file hashes, complete EN/FR product and service coverage, existing files and nonempty alt text. The read-only image audit checks all sitemap pages for exactly one placement per registered image and validates served file checksums. The general route audit now handles binary gallery links without decoding them as HTML.

Production build passed. Local and live audits each verified 255 sitemap pages, 652 internal targets, and all 140 images appearing exactly once on the assigned page with matching public file checksums. No audit errors. Responsive checks at 320 and 390 pixels showed no horizontal overflow. English product, French product and service imagery were inspected in the browser; the live image optimizer returned HTTP 200. Evidence: [QA files](docs/qa/imagery), including [live placement audit](docs/qa/imagery/live-image-audit.json), [live route audit](docs/qa/imagery/live-route-audit.json), and [live services screenshot](docs/qa/imagery/live-services.png).

## Deployment

Deployed to the existing WHC Passenger application on October 15, 2026 (America/Toronto). Build ID `GpGn5-rYWWN1DmL0kCP7-`. The uploaded archive was verified on the server against SHA-256 `9feed471d8027af8f5f0cc153230f10478ecd1b30d7f5091948965eba02cb88a` before activation. Previous Phase 2D build and domain routing are retained in `/home/nvfglyl5/nicerack-backup-before-imagery`. Linux dependencies, environment, private rate storage, mail, DNS and TLS configuration were preserved. No test quote emails were sent.

Rollback: move the current `.next` and `public` aside, restore `.next`, `public`, `server.cjs` and `next.config.mjs` from the backup into `/home/nvfglyl5/nicerack-live`, retain environment and Linux dependencies, and touch `tmp/restart.txt`. Verify HTTPS and routes afterward.

The source, assets, asset register and this report accompany the GitHub image-enrichment release.
