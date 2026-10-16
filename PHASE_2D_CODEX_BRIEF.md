# NiceRack.ca — Phase 2D: Consolidated Release & Organic Search Readiness

## Mission
Prepare a safe consolidated WHC release of completed Phases 2A, 2B and 2C, and verify public lead capture, bilingual experience and technical SEO. Do not add more product types, city pages, dashboards or checkout.

## Preflight
Read PHASE_1D_REPORT.md, PHASE_2A_REPORT.md, PHASE_2B_REPORT.md, PHASE_2C_REPORT.md, docs/WHC_DEPLOYMENT.md, current main branch and release files. Confirm 112 generic rack types and 255 indexable routes. Check uncommitted changes and branch state. Produce a deployment checklist, rollback plan and diff from live Phase 1D.

## Release gates
1. Verify Quebec French wording, terms, privacy and consent with a competent reviewer before public French publication; if unavailable, clearly mark review as blocking French release, or safely stage/noindex unapproved French routes without false hreflang.
2. Confirm business number (833) 696-9996 is dialable/answered via a real manual call check.
3. Obtain explicit authorization before sending a real test quote email. Verify inbox receipt at info@nicerack.ca including forwarding, spam, reply-to, category/product, city, locale and UTM.
4. Confirm DNS, valid HTTPS for apex/www, 308 canonical redirects, MX/TXT records and existing WHC app health. Preserve ForwardEmail settings.
5. Backup live WHC app, confirm Linux runtime dependencies and storage/permissions, create staged artifact and rollback plan. Do not mutate live WHC unless separately authorized.

## Technical and SEO QA
- Lint, typecheck, 57+ tests, catalogue validation, production build.
- Audit all 255 indexable routes, internal links, title/description uniqueness, one H1, self-canonicals, sitemap, robots, hreflang reciprocity, English/French 404, redirects, accessibility and 320/390px mobile flows.
- Test EN/FR switcher, Quebec French suggestion, user preference override, accent-insensitive search, quote preselection and CALL NOW.
- Verify no prices, checkout, fake stock, local offices, ratings, supplier claims or misleading structured data.
- Ensure site ownership and sitemap submission instructions for Google Search Console and Bing Webmaster Tools; don't claim submission without actual authorized access.
- Document analytics options but do not install tracking without approval.
- Preserve existing phone, info@nicerack.ca, no CRM and no persistent lead database.

## Deliverables
- PHASE_2D_REPORT.md: exact checks, blockers, release artifact ID, rollback steps, approved/unapproved actions and production status.
- Updated deployment documentation and QA evidence.
- Commit and publish report/code to GitHub.
- Deployment only after explicit authorization; if not authorized, deliver ready-to-deploy package/checklist and mark production pending.

## Definition of done
A verified release candidate with honest operational status, or, once explicitly authorized and all gates are satisfied, a deployed bilingual site with verified customer contact routes and technical SEO.
