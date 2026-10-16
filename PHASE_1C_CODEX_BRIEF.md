# NiceRack.ca — Phase 1C Codex Master Brief

## Objective
Turn the Phase 1A/1B catalogue and quote form into a reliable B2B lead intake and sales workflow, without introducing checkout, public supplier data, or unverified fulfilment promises.

## Preflight
Read PHASE_1A_REPORT.md, PHASE_1B_REPORT.md, docs/WHC_DEPLOYMENT.md, README.md and existing quote API, schemas and tests. Inspect current branch and remote. Preserve existing catalogue, URLs, and security. If 1B is missing locally, stop and report. Work on a feature branch and publish PR/report; never force-push.

## Core requirements
1. Reliable quote submission: retain existing Zod validation, origin checks, honeypot, body size limits, hashed-IP rate limiting and fail-closed delivery. No success unless durable acceptance is confirmed.
2. Quote reference ID and timestamp generated server-side. Email subject includes [NiceRack Quote] + reference + category + city; plain text, safely escaped HTML optional. Deliver to info@nicerack.ca only via configured approved transport. Do not log full personal details or secrets.
3. Persist leads securely in a private database or durable store outside the web root, with retention, backup, permissions and migration documented. If hosting capability is unclear, implement a pluggable adapter with explicit disabled state rather than unsafe file writes. Use idempotency protection and dedupe of accidental retries.
4. Sales lead fields: contact, company, category/product IDs, quantity, province/city, delivery/install flags, message, source URL, UTM, consent, createdAt, status, notes, assigned owner, supplier referral metadata private. Do not publicly expose supplier data.
5. Lead status workflow: NEW, CONTACTED, SOURCING, QUOTED, WON, LOST, SPAM. Minimal authenticated staff-only admin if secure authentication and storage are configured; otherwise provide documented secure CLI/export workflow and defer dashboard.
6. Notifications: concise email summary, reply-to customer only if validated, no sensitive details in URL, configurable recipients, clear transport failure path, end-to-end test instructions using an approved test address.
7. Customer-facing UX: accessible submission, transparent confirmation only on real success, reference ID, privacy consent, retry on transient failure without losing entered data. No fabricated delivery or availability claims.
8. Analytics: privacy-conscious event hooks for form start, validation failure and successful submission; no personally identifying information in events. Keep disabled until configured.
9. Tests: validation, origin/rate-limit regressions, email failure, persistence failure, dedupe, status transitions, quote context, admin authorization if present. Lint, typecheck, tests, production build.
10. Deployment: update WHC runbook with env names, storage and email dependencies, DNS/HTTPS and inbox receipt blockers. No production deployment, live email or DNS edits without explicit authorization.

## Deliverables
Code and tests, .env.example, updated README, docs/LEAD_OPERATIONS.md, PHASE_1C_REPORT.md. Include actual test commands/results, security review, pending credentials, manual acceptance checklist and safe rollback plan.

## Business guardrails
NiceRack.ca is Canadian multi-category quote-first B2B/B2C. Keep eight divisions and 24 honest generic rack types until supplier-approved records arrive. Do not invent prices, SKUs, stock, certifications, reviews, load ratings, installer availability or service coverage. Never pretend a quote was received if transport/storage fails.

## Definition of done
Validated quote reaches durable private storage and configured notification transport in tested environments, with a clear failure mode otherwise; authorized staff can securely manage or export enquiries; tests pass; report committed and published. If deployment credentials are missing, mark integration incomplete honestly rather than claiming full operational readiness.
