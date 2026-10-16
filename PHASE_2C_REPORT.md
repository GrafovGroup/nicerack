# Phase 2C — French Quebec and regional Canadian cities

Date: October 15, 2026. Status: implementation and source-publication scope complete; Quebec linguistic/legal review and WHC deployment remain separate release work.

## Delivered scope

- 64 indexable French pages: home, four hubs, quote, contact, privacy, terms, eight divisions, 24 priority product types, eight guides and 15 Quebec cities. One additional French comparison route is deliberately noindex.
- 25 additional English regional city pages, bringing English cities to 46. Existing 14 English guides and all 112 product IDs/slugs are preserved.
- Combined sitemap: 255 canonical pages (191 English, 64 French), up from 166. The build generates 263 static/internal entries; this is not the sitemap count.
- 52 real EN/FR route pairs with reciprocal en-CA/fr-CA hreflang. Untranslated routes have no fabricated French alternate. The language switcher takes those visitors to the relevant locale hub.
- Correct server-rendered HTML language through separate English and French root layouts; existing English URLs are unchanged.
- Always-visible EN/FR navigation, accessible dismissible French suggestion, explicit preference persistence and no forced redirect or location tracking. Browser primary language drives the current suggestion. The policy helper supports already-supplied coarse province context; no province lookup is performed.
- French catalogue search normalizes accents, filters by division and sorts names. Comparison accepts two or three translated types in the same division. The English catalogue retains its complete search/filter/compare functionality.
- French quote labels, field errors, focused error summary, consent and status messages. Stable English IDs and validated locale context reach the same backend; recipient remains info@nicerack.ca. English inbox field labels and French input accents are retained. Existing origin, payload, honeypot and rate protections remain in place.
- French city quotes prefill city/province; product quotes prefill type/division. Ordinary tracked links preserve UTM parameters, language switches preserve enquiry parameters, and French quote links retain supplied quantity/location/service flags. Modified/new-tab tracked links retain the existing limitation: only parameters already in their href are available.
- Uppercase navigation/buttons and (833) 696-9996 / tel:+18336969996 in both languages. No prices, checkout, invented stock, capacity, local branches or testimonials.

## Editorial and image review

The [intent matrix](docs/PHASE_2C_INTENT_MATRIX.md) was prepared before implementation. French buying guides adapt the equivalent English purchasing intent and retain source references. The city pages have distinct workflow briefs, checklists and related rack/guide links. Local primary sources establish context; purchasing examples are editorial scenarios, not claims of completed work or local facilities. Historical publications are used as context without presenting their statistics as current.

No new content imagery was introduced. New French and regional pages are text-first. Existing English images are unchanged. The [asset register](docs/ASSET_USAGE.md) records this scope; inaccessible other-site inventories were not claimed as audited.

French terminology and accents received an implementation/editorial consistency pass. **No independent competent Quebec linguistic or consumer/legal reviewer has signed off.** Before WHC publication, review French terminology, consent, privacy, terms and applicable consumer claims. Code checks do not certify legal compliance. This remaining review is internal documentation, not a customer-facing warning.

## Verification

- Catalogue validation: 112 valid records, no changes to the original catalogue identities.
- ESLint with zero warnings, TypeScript, 57 automated tests and production build passed.
- Full production HTTP audit: 255 sitemap URLs and 540 internal targets; zero audit errors. Checks include unique titles/descriptions, one H1, correct HTML language, self-canonical URLs, reciprocal real hreflang, quote/call CTAs, phone destination, permitted JSON-LD, fragments and unknown-route 404s.
- Accented city aliases (Montréal, Québec and Lévis) return 308 to their ASCII canonical paths. Unknown French product/city routes return a French 404; aliases are not indexable duplicate pages.
- Browser checks at 320/390px: French home, menu, catalogue, comparisons, form and city layout, plus the new English Barrie page; no document overflow on checked screens. Comparison table scrolls within its own region.
- Accent-insensitive “etageres” search returned three matching types. Division filter and two-type comparison worked. Product and Montréal city prefill worked; city and campaign survived the quote journey.
- Keyboard EN activation and explicit FR override preserved equivalent city navigation and campaign context. An untranslated English product switched to the French product hub. Reload retained the explicit language journey without a suggestion.
- French empty-form validation focused the error summary. A valid local submission with delivery disabled produced a French unconfirmed-delivery message and retained entries. No live email or call was sent. Success text and backend/inbox behaviour were tested through unit tests, not live delivery.
- French-browser, English-browser, coarse Quebec context, dismissal and saved-choice precedence are covered by policy unit tests. Browser-language emulation was not available in the connected browser; an end-to-end fresh fr-CA browser session remains a deployment smoke check.

Evidence: [route audit](docs/qa/phase-2c/route-audit.json), [alias/404 checks](docs/qa/phase-2c/aliases-and-404.json), [test output](docs/qa/phase-2c/tests.txt), [build output](docs/qa/phase-2c/build.txt), [browser checks](docs/qa/phase-2c/browser-checks.md).

## Publication and hosting

This implementation and report use the Phase 2C feature PR for publication to GitHub main, with remote changes preserved and the resulting tree/report verified. GitHub publication does not deploy the site. No WHC files, DNS, mail settings or server configuration were changed. WHC remains at the previously documented Phase 1D deployment; this phase does not renew live DNS, call routing or inbox-delivery verification.

## Exact new indexable routes

### French core (9)

- `/fr`
- `/fr/categories`
- `/fr/produits`
- `/fr/guides`
- `/fr/villes`
- `/fr/soumission`
- `/fr/contact`
- `/fr/confidentialite`
- `/fr/conditions`

### French divisions (8)

- `/fr/categories/entreposage-industriel`
- `/fr/categories/vehicules-et-flottes`
- `/fr/categories/garage-et-maison`
- `/fr/categories/commerce-et-presentation`
- `/fr/categories/entrainement-et-sport`
- `/fr/categories/restauration-et-hotellerie`
- `/fr/categories/informatique-et-reseaux`
- `/fr/categories/evenements-et-location`

### French product types (24)

- `/fr/produits/palettiers-selectifs`
- `/fr/produits/rayonnages-en-porte-a-faux`
- `/fr/produits/etageres-industrielles`
- `/fr/produits/supports-a-echelles-pour-vehicules`
- `/fr/produits/barres-de-toit`
- `/fr/produits/supports-pour-caisse-de-camionnette`
- `/fr/produits/rangement-mural`
- `/fr/produits/rangement-suspendu-pour-garage`
- `/fr/produits/rangement-pour-velos`
- `/fr/produits/portants-a-vetements-sur-roulettes`
- `/fr/produits/etageres-de-presentation`
- `/fr/produits/presentoirs-mobiles`
- `/fr/produits/cages-de-musculation`
- `/fr/produits/rangement-pour-poids`
- `/fr/produits/rangement-pour-materiel-sportif`
- `/fr/produits/etageres-de-cuisine-commerciale`
- `/fr/produits/rangement-pour-vaisselle`
- `/fr/produits/supports-a-bagages`
- `/fr/produits/armoires-pour-serveurs`
- `/fr/produits/batis-ouverts-pour-reseau`
- `/fr/produits/armoires-reseau-murales`
- `/fr/produits/portants-de-vestiaire`
- `/fr/produits/portants-pour-costumes`
- `/fr/produits/presentoirs-evenementiels`

### French guides (8)

- `/fr/guides/choisir-un-palettier`
- `/fr/guides/supports-a-echelles-pour-fourgonnettes`
- `/fr/guides/rangement-suspendu-au-garage`
- `/fr/guides/choisir-un-portant-a-vetements`
- `/fr/guides/cage-ou-support-a-squats`
- `/fr/guides/etageres-de-cuisine-commerciale`
- `/fr/guides/dimensions-d-un-bati-informatique`
- `/fr/guides/organiser-un-vestiaire-evenementiel`

### French cities (15)

- `/fr/villes/montreal`
- `/fr/villes/quebec`
- `/fr/villes/laval`
- `/fr/villes/longueuil`
- `/fr/villes/gatineau`
- `/fr/villes/sherbrooke`
- `/fr/villes/trois-rivieres`
- `/fr/villes/levis`
- `/fr/villes/saguenay`
- `/fr/villes/drummondville`
- `/fr/villes/granby`
- `/fr/villes/saint-hyacinthe`
- `/fr/villes/saint-jerome`
- `/fr/villes/terrebonne`
- `/fr/villes/brossard`

### Additional English cities (25)

- `/locations/barrie`
- `/locations/newmarket`
- `/locations/aurora`
- `/locations/oakville`
- `/locations/burlington`
- `/locations/milton`
- `/locations/cambridge`
- `/locations/guelph`
- `/locations/niagara-falls`
- `/locations/st-catharines`
- `/locations/kingston`
- `/locations/belleville`
- `/locations/oshawa`
- `/locations/whitby`
- `/locations/ajax`
- `/locations/windsor`
- `/locations/sarnia`
- `/locations/sudbury`
- `/locations/north-bay`
- `/locations/kelowna`
- `/locations/nanaimo`
- `/locations/abbotsford`
- `/locations/chilliwack`
- `/locations/red-deer`
- `/locations/lethbridge`

Non-indexable utility route: `/fr/comparer`.
