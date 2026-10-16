# NiceRack.ca — Phase 1A report

Date: October 15, 2026 (America/Toronto)
Branch: `codex/phase-1a`
Source brief: `PHASE_1A_CODEX_BRIEF.md`, upstream commit `1913b01`.
Original chat: [Business Ideas for NiceRack.ca](https://chatgpt.com/c/6ad06353-8e30-83ea-a8a3-ca802cd64a42).

## Implemented

- Next.js App Router, strict TypeScript, Tailwind CSS and strict ESLint checks.
- Responsive charcoal/orange visual identity; uppercase navigation and buttons; selected NICERACK.CA nameplate with .CA in the same font and size.
- Homepage with unique warehouse hero, eight category cards, commercial services, process, rack types, FAQ and quotation CTA.
- Eight category landing pages with distinct descriptions, applications and planning questions.
- Eight product-type examples and detail templates. No invented brand, SKU, pricing, inventory, ratings or certifications. Unknown optional data remains absent.
- Quote form with all requested fields, category/product preselection, dependent product choices, shared client/server validation, honeypot, payload limits, origin checks and source/UTM fields.
- Phase 1A initially failed closed with explicit non-delivery messaging. Subsequently, the user authorized WHC deployment and quote delivery to info@nicerack.ca. A sendmail adapter and persistent hashed-IP rate counters were added. Unconfigured or failed transport still returns 503; inbox receipt remains unverified.
- About, Contact, Services, Privacy and Terms pages; site-specific structural-racking qualifications. Policy copy was updated for the WHC deployment and Grafov Group Inc. operator.
- Per-page metadata, canonical URLs, Organization and breadcrumb structured data, sitemap, robots, custom 404 and favicon.
- English content directory and stable IDs for future localization/catalogue expansion. No empty French toggle or thin city pages.

## Routes

`/`, `/categories`, `/products`, `/request-quote`, `/about`, `/services`, `/contact`, `/privacy`, `/terms`.

Category routes under `/categories/`: warehouse-industrial, automotive-fleet, garage-home, retail-display, fitness-sports, restaurant-hospitality, it-technology, events-rentals.

Product routes under `/products/`: pallet-racking, ladder-rack, wall-storage, garment-rack, power-rack, kitchen-shelving, server-cabinet, event-coat-rack.

Infrastructure: `/api/quote`, `/sitemap.xml`, `/robots.txt`, `/icon.svg`.

## Validation

- Initial production build passed compilation, TypeScript and prerendering of all routes.
- All 25 sitemap pages returned HTTP 200 with one H1 each. Internal link and fragment destinations resolved. Unknown routes returned 404.
- Desktop homepage visually inspected at 1280px; mobile homepage, navigation, category and quote journey inspected at 390px. No horizontal overflow on inspected category and form pages.
- Mobile menu opens and closes on selection. Category → product → quote links retain the correct category/product selections.
- Browser testing found that Next normalizes the local hostname in `nextUrl`; origin comparison was corrected to use the actual request Host plus protocol. A regression test covers this case.
- Final check results are recorded below after rerunning the corrected build.

Screenshots were reviewed in the browser tools during the chat; no screenshot files are committed. The generated hero is committed at `public/images/warehouse-hero.webp`; provenance, prompt and uniqueness limits are in `docs/ASSET_USAGE.md`.

## Unresolved integrations and boundaries

Phase 1A implementation is complete and committed. The user subsequently authorized deployment on their existing WHC hosting. The Node application responds HTTP 200 when tested directly at the WHC origin. Public DNS still delegated to Spaceship at the last check despite WHC reporting its parking nameservers; trusted HTTPS remains pending. See `docs/WHC_DEPLOYMENT.md` for the exact deployment state. Production metadata now permits indexing.

The default phone is the user-specified placeholder; call routing is unverified. No verified supplier inventory, installer network, freight commitments, payment system, CRM or analytics are connected. Quote transport is configured for info@nicerack.ca, with automatic forwarding handled by the user. Transport and inbox delivery require end-to-end verification.

The warehouse hero was compared against 873 accessible local images with no near-duplicate candidates. Remote-only and inaccessible prior-site inventories remain unverified. No portfolio-wide uniqueness claim is made.

## Exact Phase 1B recommendations

1. Obtain verified supplier records for an initial curated catalogue, prioritizing warehouse, automotive, garage and retail products. Record source/document date with each fact.
2. Replace example types with supplier-approved SKUs, descriptions and unique product photography. Add dimensions, materials, load documentation, compatibility and lead times only when verified.
3. Build category/application filters and search against the existing stable IDs, with accessible empty states and shareable query URLs.
4. Add product comparisons only for compatible, verified attributes; leave unknown values explicitly unspecified.
5. Implement a validated import format and editorial review workflow that rejects duplicate IDs, missing required data and repeated imagery. Maintain the asset register for every placement.
6. Keep lead email/CRM routing, quote baskets and operational workflows in Phase 1C as scoped. Do not enable public indexing until the catalogue and contact journey are ready.

## Final verification

- `pnpm lint`: passed with zero warnings.
- `pnpm test`: 11/11 tests passed, including the normalized-host regression.
- `pnpm build`: passed compilation, TypeScript and all 31 generated build entries.
- `pnpm peers check`: no peer dependency issues.
- Corrected production build retested in the mobile browser: valid quote reached the intended HTTP 503/non-delivery state, retained inputs, and restored its submit button. Changing category cleared the incompatible product choice and displayed only the new category's options.

Implementation and WHC deployment changes are committed for GitHub publication. Public DNS, HTTPS and end-to-end inbox receipt remain unresolved deployment checks, not missing Phase 1A deliverables.

## Phase 1B started

Catalogue keyword search, category filtering, alphabetical sorting, shareable query URLs and accessible empty/reset states have been implemented against the existing general rack types. These controls work as ordinary GET forms without requiring JavaScript. Verified supplier enrichment, attribute comparisons and data import remain future work; no product facts were invented to fill those gaps.

Phase 1B increment validation: 16 automated tests pass (the original 11 plus five catalogue-search tests). Keyword/category intersection and empty states were checked in the browser. Browser testing found that Next client navigation could preserve an uncontrolled category select after clearing filters; the form now remounts when URL filter values change. The browser's viewport override did not take effect in this session (reported width stayed 1280px), so a new mobile visual verification is not claimed. The new filters include a single-column mobile layout.

Corrected production build and lint passed. Browser retest confirmed CLEAR FILTERS resets both controls and all eight results, and A–Z sorting returns Event coat racks through Vehicle ladder racks in alphabetical order. This first Phase 1B increment is included with the GitHub publication; it has not been uploaded to WHC. Phase 1B is not yet complete. Screenshot: docs/catalogue-search.png.

## GitHub publication policy

At the user’s direction, each completed phase must be committed and published to GitHub immediately, including its completion report. The new upstream Phase 1B brief was merged without overwriting it. Phase 1A is complete; Phase 1B remains in progress.
