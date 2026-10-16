# Phase 2D — consolidated WHC release and search readiness

Date: October 15, 2026 (America/Toronto).

## Outcome

Phases 2A, 2B and 2C are now deployed together on **https://nicerack.ca**, including **112 generic rack types and 255 indexable pages: 191 English and 64 French**. Phase 2D release engineering, technical QA, rollback preparation and search-owner instructions are complete. No new catalogue, city content, imagery, tracking or checkout was added.

Operational exception: **live email receipt remains unverified**. The user explicitly declined EN/FR test emails. No test email was sent, and forwarding, spam placement and real Reply-To delivery are not claimed verified. Existing enabled mail transport and info@nicerack.ca recipient were preserved. This is a deployed release with that documented acceptance exception, not a claim that every original operational gate was independently demonstrated.

## Authorization and business checks

The user requested “lets proceed with 2D and deploy everything.” Asked jointly about an answered real call and competent Quebec French review of wording, privacy, terms and consent, the user replied “yes all works.” Both are recorded as owner-confirmed; Codex did not independently call or conduct professional legal review. French remains indexable. The separate email-test question was answered “Do not send test emails.”

## Release and rollback

- Integrated GitHub main through brief commit `4082d97`; application source from completed Phase 2C remains unchanged.
- Build ID: `ykMepqQd3Y9KQEpmcjeNW`.
- Archive: `/home/nvfglyl5/nicerack-phase-2d.zip`, 8,231,403 bytes.
- SHA-256: `8b1991f51af50bc7b7fc683754d2d8a4759b21976a2ba748c65a1c747df0d564`; local and uploaded checksums matched.
- Extracted privately at `/home/nvfglyl5/nicerack-stage-2d` before activation.
- Backed up live Phase 1D app and domain routing at `/home/nvfglyl5/nicerack-backup-before-2d`; original build `21KBrnxMmNhZqw1yWMhHz` confirmed in backup.
- Updated `.next`, `public`, `server.cjs`, `next.config.mjs` in existing `nicerack-live` app and restarted Passenger via `tmp/restart.txt`.
- Retained Linux Node 22.23.2 runtime, next 16.4.1, react/react-dom 19.3.1, lucide-react 1.57.0, zod 4.6.7, environment, node_modules symlink and mode-700 private counter directory. Sendmail executable present. No enquiry database was added.

Rollback: move failed app files aside, restore the four app paths from the private backup and touch `tmp/restart.txt`. Retain runtime dependencies, environment and rate counters. Verify HTTPS and original build. Domain `.htaccess` backup is for routing recovery only; certificates and mail records must remain intact. See [checklist](docs/PHASE_2D_RELEASE_CHECKLIST.md).

## Validation

| Check | Result |
| --- | --- |
| Lint/typecheck | Passed |
| Unit/regression tests | 57/57 passed |
| Catalogue/build | 112 valid records; production build passed |
| Local and live audits | Each: 255 sitemap pages, 540 internal targets, zero errors |
| SEO | Unique titles/descriptions, one H1, correct language/canonical, real reciprocal hreflang, no noindex sitemap entries, working internal fragments |
| Structured data/commerce | Organization/BreadcrumbList only; no pricing/checkout schema |
| Domain | WHC A 51.161.57.68, parking1/parking2 nameservers, www CNAME apex |
| HTTPS/redirects | Trusted apex/www HTTPS, HTTP/www 308 preserving path/query |
| Mail DNS | ForwardEmail MX, SPF and verification TXT present; no edits |
| Routes | Accented French city aliases 308; unknown EN/FR product routes 404 |
| Browser | Live Montréal quote prefill retained city, province, category and UTM; EN→FR round trip retained context |
| Search/mobile | Accent-free “etageres” returned 3 types; 320px catalogue and 390px quote had no horizontal document overflow |
| Browser console | No captured error-level logs on inspected live journeys |

The first sitemap request during Passenger startup returned an empty response; subsequent retrieval returned valid XML and the complete live audit passed. No continuing failure observed. Representative browser checks supplement the prior 2C QA; they are not an exhaustive accessibility or device certification. Language-suggestion policy and preference precedence pass unit tests; a fresh fr-CA browser-language emulation was not available. Existing prior 2C keyboard, comparison and invalid-form evidence remains applicable because application source is unchanged. No production form was submitted.

## Search and remaining actions

[Search and measurement instructions](docs/SEARCH_AND_MEASUREMENT.md) cover Google/Bing ownership, sitemap submission and analytics choices. No search-account verification or submission was performed; no rankings or indexing results claimed. No tracking installed. Existing image placements unchanged; no new portfolio-wide duplicate audit claimed.

Remaining owner actions: verify real enquiry receipt when desired; verify search properties and submit the public sitemap. Proxy-header trust and private rate-counter maintenance remain as documented in WHC deployment guidance. Source/report and QA evidence are published through the Phase 2D GitHub PR; hosting deployment is already complete.

Evidence: [live audit](docs/qa/phase-2d/live-route-audit.json), [artifact](docs/qa/phase-2d/artifact.json), [network](docs/qa/phase-2d/network-preflight.json), [mobile](docs/qa/phase-2d/live-mobile-320.png), [French homepage](docs/qa/phase-2d/live-french.png).
