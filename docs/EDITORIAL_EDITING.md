# Editorial publishing workflow

City planning notes live in `src/content/en/locations.json`; buying guides live in `src/content/en/guides.json`. Both are parsed by strict Zod schemas in `editorial.ts`. Routes, hubs and sitemap share the published selection; missing or unpublished detail routes return 404. Metadata for an unpublished or unknown record is noindex. Never publish an unfinished record merely to reserve a URL.

## Distinct purpose before copy

Start in `PHASE_2B_INTENT_MATRIX.md`. Each city requires a specific, sourced context and a useful application of it to a purchasing task. The source establishes the local context; the page explicitly identifies the purchasing scenario as planning guidance. A sector profile is not evidence of local inventory, premises, installers, supplier relationships or delivery coverage. Do not create city-category permutations without a separate substantive case.

Each guide must answer a distinct selection question, compare actual alternatives and state practical quote inputs. Avoid numerical engineering prescriptions, universal compatibility claims and fabricated technical specifications. Manufacturer references establish terminology only. Never import their commercial claims as NiceRack promises. All 35 Phase 2B editorial records contain original section copy and a source link; date each review and revisit facts before a later release.

## Structure and links

Required fields include title, description, intent, intro, at least two sections, three brief inputs, a planning FAQ, category references, product references and sources. Section arrays allow different editorial structures; shared layout does not justify repeated paragraphs. Sources use public HTTPS URLs. Validate factual claims against the source and retain no credentials or private supplier data.

`guideSlugs` and `productSlugs` must resolve to published records. Published references cannot target a draft. Remove incoming references before unpublishing a guide or product. Division pages show matching guides; product details show guides that explicitly include that type. Do not force unrelated recommendations to fill a card count.

The primary city quote action includes city, province and `/locations/<slug>` source. Guide quote actions include category and `/guides/<slug>` source. Existing tracked links retain campaign parameters on normal in-app navigation. Product quote preselection and validation are unchanged. Modified-click/new-tab campaign behavior remains the existing link behavior; no tracking service was added.

## Language and structured data

English content is isolated under `src/content/en`. A French edition needs separately reviewed translations, localized labels, route and canonical decisions, and verified hreflang pairs. Do not add empty French routes, fake translated copy or hreflang links before that work exists. Quebec pages currently contain English guidance and may cite French municipal sources.

New pages emit existing Organization and BreadcrumbList data only. They do not create local-business, Product, Offer, review or FAQ rich-result claims. All published page titles, descriptions and canonicals are checked for uniqueness. Unknown city/guide slugs must stay 404.

## Verification and deployment

Run catalogue validation, lint, typecheck, tests, production build, then `python3 scripts/audit-site.py http://127.0.0.1:3000`. Inspect 320/390px and desktop pages, mobile menus, city quote prefill, guide-to-type navigation and catalogue regression flows. Local preview must keep quote delivery disabled; no real email/call is required for editorial QA.

Use a feature branch and PR; publish the phase report and matrix to main and verify remote contents. Hosting deployment is separate and requires explicit authorization. The current WHC release is Phase 1D.

## French content and route mapping (Phase 2C)

French content lives in `src/content/fr/` and has no English body-copy fallback. `products.json` keeps the original product ID and English slug alongside a localized slug. Categories keep stable division IDs. The initial French selection is 24 types, eight divisions, eight guides and 15 Quebec cities.

`src/lib/locale.ts` contains the small explicit route map used by the switcher and SEO. When adding a translation, update its mapping only if it is a real equivalent, plus `frenchPaths`. Do not map an untranslated product to a hub as hreflang; the switcher's hub fallback is navigation only. Run the locale tests and full HTTP audit. City slugs remain ASCII; accented city spellings redirect permanently to the same canonical page. Separate document roots under `(en)` and `fr` keep correct HTML language without making every page request-dependent.

French form fields submit to the existing `/api/quote` handler, using stable English category/product IDs and an optional validated `locale: fr` field. Inbox field labels remain English, with explicit language context. No recipient is accepted from the client. The same origin, size, honeypot and rate controls apply. French success/error text is selected by HTTP status, never copied from an English backend response.

The language suggestion reads the browser's preferred language and remembers explicit choices/dismissal in local storage. It does not collect location or perform IP lookup. The pure policy helper accepts coarse province context if an approved source is already available, but the current UI has no such source. There are no forced redirects. A saved FR choice suppresses prompts; it does not silently reroute a visitor who deliberately opens an English URL.

Before WHC publication, obtain competent Quebec French/consumer-law review of the French copy, consent, privacy and terms. Code checks are not a legal or linguistic certification. Keep this operational review in project documentation, not customer-facing warning banners.
