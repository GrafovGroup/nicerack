# National coverage, UX and imagery

## Delivered scope

The location experience now covers all ten provinces and three territories in English and French, with 122 city/regional groups and 397 named destinations. This includes major metropolitan destinations, capitals, regional centres and surrounding communities. The directory is curated, not an exhaustive register of every Canadian municipality.

- Redesigned English and French directories with a clear destination-first introduction, province navigation, labelled search and province filters, collapsible regions, visible counts and an empty-result quote option.
- Accent-insensitive city/community matching; ambiguous names can be narrowed by province. Every destination has a quote link carrying the correct city, canonical province and source page in the selected language.
- 26 province/territory pages with distinct receiving guidance and checklists, regional destination lists and category/guide links. Existing 46 English and 15 French city guides retain their routes; English city pages link back to their province.
- French navigation now labels the national directory RÉGIONS. New province routes have reciprocal English/French alternates, localized breadcrumbs, metadata and sitemap inclusion.
- Responsive layouts, keyboard focus styles, semantic disclosure controls and live result counts. No inferred location or location permission is required.

The site now has 297 sitemap pages (212 English, 85 French). Communities are served through useful province pages and contextual quote links; this release does not create 397 thin standalone SEO pages. Sourcing, delivery and installation are qualified by the actual address, equipment, access and schedule. No branch offices, fixed service radii, guaranteed delivery times or local stock were invented.

## Imagery

Two original images created with the built-in image tool: a warehouse receiving scene for `/locations`, and a distinct workshop scene for `/fr/villes`. Saved as `public/images/locations/en-directory.webp` and `public/images/locations/fr-directory.webp`, each 1200×800. Both were visually inspected and used only in their assigned placement; existing product/service photos were not reused on the directories.

[Prompts](docs/imagery/national-coverage-prompts.json), [asset usage register](docs/imagery/asset-register.json), [duplicate audit](docs/qa/national-coverage/duplicate-audit.json) and [research/scope](docs/qa/national-coverage/RESEARCH.md). No exact or visual duplicate candidates were found across 1,032 accessible local raster assets. Remote-only and inaccessible prior-site inventories are outside this verification scope.

## Validation

- 63 automated tests pass, including every province route, language pairing, accent/suburb matching and all destination quote contexts.
- Lint, TypeScript and production build pass.
- Local production audit: 297 sitemap pages and 2,342 internal targets; correct metadata, canonicals, language alternates and no route errors.
- Local imagery audit: 162 unique registered placements and 162 matching asset checksums.
- Browser checks: desktop composition; French directory at 390px with no horizontal overflow and its image loaded; Dartmouth → Nova Scotia in the English quote; Cochrane → Alberta in the French quote after province filtering. No forms submitted or test emails sent.

## Release

Production build: `gPP5Sx7zdJImNoS-I7gu_`.
WHC archive: `/home/nvfglyl5/nicerack-national-release.zip`.
SHA-256: `b9c84a9c6ca1ddf4f166808c86bafada3ed52ee972e81c4f471b37a01e073530`.
Rollback backup: `/home/nvfglyl5/nicerack-backup-before-national`.

The release preserves Google/Bing verification files, the existing environment, Linux dependencies, quote delivery settings, DNS and TLS. Restore `.next` and `public` from the backup and touch `tmp/restart.txt` to roll back, preserving environment/private data.

Activated on WHC on October 16, 2026. The live audit passes for all 297 sitemap pages, 2,342 internal targets and 162 unique registered image placements/checksums. Both search verification files return HTTP 200. Unknown English/French province routes return 404. The live Dartmouth search-to-quote flow and French mobile layout were verified without sending enquiries.

Evidence: [live route audit](docs/qa/national-coverage/live-route-audit.json), [live image audit](docs/qa/national-coverage/live-image-audit.json), [desktop directory](docs/qa/national-coverage/live-directory-desktop.png), [French mobile directory](docs/qa/national-coverage/live-french-mobile.png). The existing submitted sitemap URL is unchanged and now exposes the additional 26 regional pages; discovery does not guarantee indexing.
