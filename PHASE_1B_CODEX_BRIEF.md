# NiceRack.ca — Phase 1B Codex Implementation Brief

## Preflight: mandatory
Inspect current branch, default branch, git status and recent commits. Confirm Phase 1A source and report are available. If Phase 1A is missing, STOP and write a short blocker report; do not generate a second application or overwrite existing work. If code is on a different branch, identify it and recommend a safe merge/PR; do not force push.

## Objective
Extend existing NiceRack.ca website into a functional multi-category catalogue for eight divisions: Warehouse & Industrial, Automotive & Fleet, Garage & Home, Retail & Display, Fitness & Sports, Restaurant & Hospitality, IT & Technology, Events & Rentals.

## Features
1. Typed product schema: id, slug, categoryId, subcategoryId, name, shortDescription, detailedDescription, applications, features, specifications with units, material, dimensions (optional), capacity (optional and only verified), image references, image alt text, supplier reference (private), availability status (only if verified), pricing mode (default quote), lead time (optional), published status, updatedAt.
2. Central curated product data source and clear seed-vs-verified labels. Seed only honest generic product-type examples; do not invent manufacturer SKUs, prices, certifications, load ratings, availability or supplier agreements.
3. Browse all products, eight category pages, subcategory navigation, keyword search, sort and relevant faceted filters. Support URL query parameters and empty/loading states.
4. Product detail templates with breadcrumb, image gallery, spec table, applications, related products and prominent REQUEST A QUOTE.
5. Comparison functionality for up to 3 comparable products, clearly displaying unknown fields as 'Contact us' or em dash.
6. Quote flow should prefill selected product/category and carry quantity, city/province, delivery and installation requirements plus UTM/source attribution. Preserve existing backend behaviour; if none, clearly mark submission as not connected, never show false success.
7. SEO: distinct metadata, canonical URLs, sitemap, breadcrumbs and Product structured data only where truthful and valid. No fake ratings, prices, reviews or availability.
8. Accessibility, keyboard search/filter controls, mobile UX, performance and unit tests for filtering/schema validation.

## UX
Brand: #17191C charcoal, #FF6B21 orange, #77818B steel grey. Premium industrial, uppercase CTAs. Keep all eight divisions visible, but prioritize B2B commercial discovery. Product CTA REQUEST A QUOTE, no checkout.

## Engineering
Use existing framework and conventions, do not rebuild. TypeScript strict, reusable components, safe URL encoding, pagination if needed, clear data import boundaries. No secret keys. Make supplier integrations future-ready but not active.

## Deliverables
- Committed Phase 1B implementation on a feature branch with PR where possible.
- PHASE_1B_REPORT.md listing routes, feature status, tests/build results, known gaps, and screenshot references if available.
- Updated README with local commands and catalogue data editing instructions.
- No deploy without explicit approval.

## Acceptance criteria
Build and lint pass; category and product links work; search and filters update results; invalid query params handled; compare supports up to three items; quote request retains product context; mobile and keyboard flows work; no fabricated data; no regressions to Phase 1A.
