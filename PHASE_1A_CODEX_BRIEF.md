# NiceRack.ca — Phase 1A Codex Master Brief

## Mission
Build a production-minded, responsive Canadian multi-category rack catalogue and lead-generation website. Brand: NiceRack.ca. Tagline: Every Rack. Every Space. B2B first, also serve homeowners. No checkout initially; all commercial enquiries via quote form. Do not claim inventory or nationwide installers until verified.

## Brand
Charcoal #17191C, orange #FF6B21, steel #77818B, white. Bold contemporary typography; clean premium industrial look. Uppercase navigation and CTAs. Accessible contrast, mobile-first layout, polished product photography (properly licensed or placeholders).

## Categories
1 Warehouse & Industrial: pallet, cantilever, shelving, mezzanine and protection.
2 Automotive & Fleet: roof, ladder, truck, bike and cargo racks.
3 Garage & Home: wall, overhead, tool and bicycle storage.
4 Retail & Display: garment, merchandising, portable display racks.
5 Fitness & Sports: squat, power, weight and sports storage.
6 Restaurant & Hospitality: stainless shelving, dish, drying and luggage racks.
7 IT & Technology: server cabinets, network and wall-mounted racks.
8 Events & Rentals: coat, garment, portable event racks.

## Phase 1A scope
- Initialize Next.js App Router + TypeScript + Tailwind CSS; clean reusable components and strict linting.
- Home: hero, category navigation, commercial solutions, how it works, popular rack types, trust/FAQ and strong quote CTA.
- Category index and 8 category landing pages with unique copy.
- Product listing templates, filter/search-ready data model and product detail templates. Seed with a small curated set of clearly labelled example products; do not fabricate brands, stock, certifications, prices or technical specs.
- Quote form: name, company optional, email, phone, province, city, category, product, quantity, project details, installation/delivery needs, privacy consent. Validate on client and server; spam protection; don't claim delivery without backend. Store/send only after configured integration. Clear success/error states.
- About, Contact, Services, Privacy Policy draft, Terms draft.
- SEO: metadata, canonical, sitemap, robots, schema.org Organization and BreadcrumbList where appropriate. No fake review/rating schema. Location architecture ready but don't generate thin doorway pages.
- Bilingual-ready content architecture (English launch, French later).
- Responsive navigation, accessibility, performance, no broken links, semantic headings, optimized imagery.

## Technical and business rules
- Prefer maintainable local structured catalogue data with stable IDs, category slugs and optional fields for SKU, supplier, dimensions, load rating, images, lead time and availability. Unknowns must stay blank.
- No public pricing unless verified; default CTA REQUEST A QUOTE.
- Do not expose secrets. Use .env.example for integrations.
- No invented testimonials, clients, certifications, warranty, geographic service guarantees or product availability.
- For engineered/structural warehouse racking, include site-specific assessment/installation safety disclaimer; do not give unsupported load capacities.
- Use a consistent lead-source field in quote submissions (category, product, page, UTM) for future routing.

## Deliverables
1. Working source code with setup instructions in README.
2. Clean visual design and mobile responsiveness.
3. Functional local build and lint checks.
4. PHASE_1A_REPORT.md summarizing files, routes, tests, unresolved integrations, screenshots if possible, and exact Phase 1B recommendations.

## Future phases (do not build prematurely)
1B catalogue enrichment, filters, comparison and product data import.
1C lead capture backend, email routing, CRM and spam safeguards.
2A commercial services and supplier workflows.
2B provincial/city SEO expansion with genuinely differentiated content.
3 deployment, analytics, accessibility/security QA and launch.

## Execution
Start by inspecting the repo. Since it may be empty, initialize the project. Implement Phase 1A only. Commit code and report. If any integration requires credentials, use safe mocks/placeholders and document exactly what is needed.