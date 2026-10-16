# Phase 2D release checklist

## Authorization and scope

User explicitly requested Phase 2D and deployment of everything. User answered “yes all works” to the combined real phone call and competent Quebec French wording/privacy/terms/consent review question. This is owner confirmation, not an independent review performed by Codex. User declined test emails. Deploy with French indexable; retain existing mail settings and record inbox delivery as unverified.

## Before activation

- [x] Integrate GitHub main, preserve all remote changes; clean starting tree.
- [x] Read 1D, 2A, 2B, 2C reports and 2D brief.
- [x] Confirm 112 rack types and 255 indexable routes.
- [x] Lint, typecheck, 57 tests, catalogue validation and production build.
- [x] Confirm live 1D build, Node 22 Linux and exact runtime packages.
- [x] Confirm existing private counter directory mode 700 and executable sendmail.
- [x] Check DNS, HTTPS, canonical redirects, ForwardEmail MX/TXT; preserve all settings.
- [x] Verify uploaded archive checksum, extract privately, back up live application.
- [x] Activate tested files, retain environment, Linux dependencies and private counters; restart Passenger.
- [x] Audit all public routes, links, metadata, language and mobile journeys.

## Changes from Phase 1D

Catalogue expands from 24 to 112 generic types. English gains 46 city pages, 14 guides and discovery hubs. French adds 64 indexable pages, locale navigation/search/quote experience and 52 real translation pairs. Sitemap grows from 41 to 255 pages. No new images, product specifications, checkout, accounts or lead database. See `qa/phase-2d/changes-from-1d.txt` for the complete source diff inventory.

## Rollback

Before activation retain `.next`, `public`, `server.cjs`, `next.config.mjs` and domain `.htaccess` in `/home/nvfglyl5/nicerack-backup-before-2d`. On failure move the failed release aside and restore the four app paths from that backup, retaining Linux node_modules, environment and rate data; touch `tmp/restart.txt`. Verify trusted HTTPS and original 1D build. Only restore domain routing if routing itself was changed/broken. Do not replace certificates, DNS or mail configuration. Keep both release and backup private outside the domain document root.
