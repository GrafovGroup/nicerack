# NiceRack.ca — Phase 1C completion report

Date: October 15, 2026 (America/Toronto)
Branch: `codex/phase-1c`
Brief: `PHASE_1C_CODEX_BRIEF.md`, including upstream quote-only policy `dad965c`.

## Delivered

- Simple enquiry form with optional company and quantity, required contact/location/project details and privacy consent. Product/category prefill, supplied quantities, delivery/installation choices and campaign context remain intact. Comparison links also carry the compared IDs in their source URL while selecting the individual type being quoted.
- Existing WHC sendmail transport retained, fixed recipient info@nicerack.ca and validated Reply-To. Readable email includes rack type, optional quantity, requirements, source and campaign context. No CRM, lead database, accounts, cart or payment flow.
- Success response only after sendmail exits successfully; transport timeout, process/pipe failures and missing configuration fail closed. Customer confirmation states acceptance for delivery, not inbox receipt. Failed browser submissions retain entered details and offer email contact.
- Origin/honeypot/schema checks retained; JSON content type and streaming 20KB body limits enforced. Responses are non-cacheable.
- Private atomic rate counters: five attempts per normalized email per hour; twenty per IP only when an explicitly trusted proxy header is configured. Spoofable forwarding headers are ignored by default. Counters contain timestamps, with hashed filenames; no enquiry bodies are persisted. Operational limitations and lock cleanup documented.
- Removed unconfirmed phone links and telephone structured data; email CTAs in header, footer, contact and enquiry pages. Header quote action now consistently says REQUEST A QUOTE.
- Catalogue remains quote-only. No public prices, price ranges, sale badges, price controls, Offer pricing schema, checkout or cart links added. Existing product/category/comparison quote actions retained.
- Updated README, environment example and WHC deployment handoff. No new website imagery or asset placements.

## Validation

- `pnpm lint`: passed, zero warnings.
- `pnpm typecheck`: passed.
- `pnpm test`: 39/39 passed. Eight added tests cover optional quantity, acceptance timing/context, transport failure/throttling, request guards, recipient/message formatting, counter privacy/expiry/concurrency, disabled delivery and sendmail exit/error/timeout handling. Transports are simulated; no live mail is sent.
- `pnpm build`: passed, including validation of all 24 catalogue records.
- Production HTTP audit: 41 sitemap pages return 200 with one H1 each; 105 internal targets resolve; unknown product returns 404.
- SEO/conversion audit: all 41 sitemap pages have unique titles, descriptions, matching canonical URLs and a quote CTA; no telephone/cart/checkout links or pricing schema.
- Mobile production browser at 390px: blank quantity accepted by client validation, correct product/category preselection, disabled delivery produces the expected failure message, fields stay populated and submit button re-enables. Document width equals viewport width. Screenshot: `docs/phase-1c-enquiry-mobile.png` (local disabled-delivery test).

## Publication and deployment boundaries

Phase 1C software scope is complete and published through a feature PR into GitHub main under the standing publication instruction. The remote report and source tree are verified after publication.

WHC is **not redeployed** in this phase. No DNS records or forwarding settings changed and no live test message was sent. Earlier WHC observations still require fresh verification: public delegation, trusted apex/www HTTPS and actual receipt at info@nicerack.ca. Sendmail acceptance does not establish inbox delivery. The existing WHC application remains an older build until a separately authorized deployment.

Before deploying, verify proxy-header trust and host-level abuse controls; email-only throttling is not comprehensive bot protection. Worker crashes can leave a fail-closed rate lock requiring maintenance cleanup. Mail timeouts can be ambiguous, so reconcile with the inbox before retrying an uncertain submission. Supplier data and approved photography remain separate business inputs from Phase 1B.
