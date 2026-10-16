# Rack accessories and small services

## Delivered scope

Eight new accessory types, each with an English and French product page: pallet rack wire decking, rack upright protectors, shelf dividers, replacement rack casters, slatwall display hooks, cage-nut/screw kits, rack blanking panels and horizontal cable managers. Catalogue totals are 120 English and 32 French products.

Four focused service sections extend `/services`: accessory compatibility review, replacement-part sourcing, rack/shelf labelling, and cable-organization planning. Each includes the information to supply and a quote link that preserves its section in the enquiry source. Scope wording distinguishes identification and planning from structural engineering, certification, electrical work or network commissioning.

Customers can discover the additions through the accessory filter, division/subcategory browsing, search, related rack links and the service jump menu. Existing product IDs and routes are preserved. New French product equivalents participate in reciprocal language switching and hreflang. No stock, price, load rating, supplier relationship or universal fitment is asserted.

[Research and primary sources](docs/micro-offerings/RESEARCH.md) establish the accessory families. This is an expansion of quotation options, not a supplier inventory feed.

## Imagery

20 original images generated using the built-in image tool, saved under `public/images/products/en`, `public/images/products/fr` and `public/images/services`. English and French products have separate images. Text-only cards avoid reuse. All new originals were visually reviewed in two contact sheets.

- [New prompts](docs/micro-offerings/image-plan.json)
- [Generated original references](docs/micro-offerings/generation-results.json)
- [Complete asset usage register](docs/imagery/asset-register.json): 160 exclusive placements.
- [Duplicate audit](docs/qa/micro-offerings/duplicate-audit.json): 626 accessible raster assets compared; no exact duplicates or perceptual candidates at difference-hash distance 7 or less. Inaccessible and remote-only prior-site inventories are outside the verified scope.

## Validation

60 tests pass, including the accessory filter, parent relationships, French equivalents and quote context. Lint, TypeScript, catalogue validation and production build pass. Local audit covers 271 sitemap pages, 702 internal targets and 160 unique image placements with matching file checksums. No forms were submitted and no test emails were sent.

The live audit also passes for all 271 pages, 702 internal targets and 160 unique placements/checksums. English accessory quote selection was checked without submission. The live French accessory page renders at 390 pixels without horizontal overflow and loads its distinct image. Desktop service layout and image loading were inspected. Evidence: [live routes](docs/qa/micro-offerings/live-route-audit.json), [live images](docs/qa/micro-offerings/live-image-audit.json), [French mobile screenshot](docs/qa/micro-offerings/live-french-mobile.png), and [live service screenshot](docs/qa/micro-offerings/live-service.png).

## WHC deployment

Activated on October 16, 2026 (America/Toronto) in the existing WHC Passenger application. Build `RFjvVZF7o7LECeO5lbS3o`. Archive `/home/nvfglyl5/nicerack-micro-release.zip`, SHA-256 `5a9c67c25fa45c615d9bfd359c0f1c5f0142604cd4d95da0522b843cce459564`, verified on the server before activation. The prior imagery release is preserved in `/home/nvfglyl5/nicerack-backup-before-micro`.

Rollback: move the current `.next` and `public` aside and restore `.next`, `public`, `server.cjs` and `next.config.mjs` from the backup into `/home/nvfglyl5/nicerack-live`, retaining environment files, Linux dependencies and private rate data. Touch `tmp/restart.txt` and verify HTTPS/routes. Domain routing is backed up separately; DNS, TLS, mailbox and delivery settings were preserved.

The implementation, assets, research notes, audit evidence and this report accompany the GitHub release.
