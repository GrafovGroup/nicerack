# NiceRack.ca — Phase 2C: Quebec French SEO + Regional Canadian Cities

## Mission
Expand genuinely useful French-language discovery for Quebec and English-language discovery in underserved Canadian cities, retaining a simple quote/call business model. Phase 2B is a prerequisite.

## Mandatory preflight
Read PHASE_2B_REPORT.md, PHASE_2B_CODEX_BRIEF.md, PHASE_2A_REPORT.md, current route map, locale architecture, catalogue and WHC notes. As of drafting, Phase 2B report is not yet published in main. If missing or incomplete, STOP, report blocker and do not build on outdated routes. Audit existing location pages to prevent duplicate URLs. Feature branch + PR; no production deployment without approval.

## Workstream A — French Quebec
- Add production-ready French locale architecture with proper /fr/ URLs and language switcher, English/fr-CA hreflang alternates and self-canonicals only for real translations. No empty toggles or English fallback pages falsely marked fr-CA.
- Translate/adapt all 8 rack division pages and priority product types with fluent Canadian French, natural industry terminology and locally appropriate purchasing context. Add 8–12 useful French guides as editorial capacity allows.
- Prioritize distinct French location pages for Montréal, Québec, Laval, Longueuil, Gatineau, Sherbrooke, Trois-Rivières, Lévis, Saguenay, Drummondville, Granby, Saint-Hyacinthe, Saint-Jérôme, Terrebonne and Brossard. Publish 15–25 only where genuinely differentiated content can be verified.
- Translate form labels, errors, consent, success/failure messages, contact information and navigation; retain the same secure backend and English-friendly inbox email context. Ensure accented URLs and French typography work.
- French language and Quebec consumer/legal claims should be reviewed by a competent local reviewer before publication; don't claim legal compliance solely from code.

## Workstream B — Smaller Canadian cities
- Expand English location coverage selectively, using cities such as Barrie, Newmarket, Aurora, Oakville, Burlington, Milton, Cambridge, Guelph, Niagara Falls, St. Catharines, Kingston, Belleville, Oshawa, Whitby, Ajax, Chatham, Windsor, Sarnia, Sudbury, North Bay, Kelowna, Kamloops, Nanaimo, Abbotsford, Chilliwack, Red Deer, Lethbridge, Medicine Hat, Moncton, Fredericton, Saint John and Charlottetown.
- Target 25–40 additional pages only when each has substantive, distinct user value; avoid repetitive city-swapped doorway pages. No fictitious local branches, warehouses, staff, inventory, delivery times or installation coverage.
- Link to relevant rack types, guides, city hub pages and the quote form; maintain clear service qualification and contact options.

## Business constraints
- REQUEST A QUOTE and CALL NOW on suitable pages; confirmed number (833) 696-9996, tel:+18336969996. Enquiries to info@nicerack.ca.
- Never show public prices, shopping cart, checkout, accounts, CRM or lead dashboard.
- Do not invent supplier data, technical specs, reviews, local addresses or testimonials.
- Preserve all existing product IDs/slugs, comparisons, search/filter, quote prefill and UTM context.
- Keep licensed imagery provenance; do not scrape or repeat generic photos.

## SEO/engineering quality
- Plan keyword-intent, URL and translation mapping before implementation. Avoid cannibalization with Phase 2B pages. Unique localized metadata, one H1, breadcrumbs, correct locale sitemaps, hreflang reciprocals and 404s.
- No indexable thin drafts; ensure internal links are useful and mobile UX works at 320/390px.
- Run catalogue validation, lint, typecheck, tests, production build, full route/sitemap/internal link audit, hreflang/canonical checks, translation coverage checks, phone and enquiry regression checks.
- Publish PHASE_2C_REPORT.md with exact routes, languages, page counts, editorial checks, tests, remaining legal/linguistic review and deployment status.
- Commit via PR and verify report/code in main. No WHC deployment without explicit authorization.

## Definition of done
Meaningful French Canadian content and distinct regional city coverage, with preserved quote/call flows and trustworthy SEO, tested and published to GitHub.
