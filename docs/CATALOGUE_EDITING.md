# Catalogue editing and import

The public source is `src/content/en/products.json`. Category and subcategory definitions live in `src/content/en/catalogue.ts`; `src/lib/product-schema.ts` defines the strict public schema. Every build validates the import before compiling.

## Generic rack types

Use `status: "example-type"` and honest descriptions of a general type. These records appear publicly as GENERAL RACK TYPE. Do not add SKU, material, capacity, dimensions, availability, lead time or technical specifications to a generic record. The catalogue contains 112 general types, fourteen in each division, rather than supplier-backed stock listings. The original 24 and Phase 2A’s 88 IDs and slugs are protected by regression fixtures.

## Verified products

Use `status: "verified"` only with `verification: {source, checkedAt}`. Each capacity, dimension, availability, lead-time and specification entry also requires its own evidence. Dates use YYYY-MM-DD. Capacity accepts kg/lb; dimension values accept mm/cm/m/in/U. Specifications carry a name, value and unit. `pricingMode` remains `quote`. Never infer capacities from appearance or from another configuration. Editorial verification is required; schema validation only checks structure and evidence fields, not the truth of a document.

IDs and slugs must be unique. A subcategory must belong to the chosen category. Set `published: false` to keep an editorial record out of public routes, search, comparisons, quote choices and the sitemap. Keep `updatedAt` current.

## Private supplier references

Do not put supplier contacts, cost prices, credentials or private references in the JSON source, Git repository or client components. `privateSupplierSchema` defines a separate `{productId, supplierReference}` record for a future private server-side store. The public schema rejects supplierReference and all other unexpected fields. No supplier integration is active in Phase 1B.

## Images and gallery

Each image requires `{src, alt, source}`. `src` must reference a local file below `/images/`; the gallery renders only supplied images and offers full-image links. The seed rack types have no supplier photography. No reused stock photograph or shared fallback is inserted. Add genuinely distinct approved images for each product-detail gallery placement and record each placement and permission/source in `docs/ASSET_USAGE.md`. Gallery images are not repeated in category cards or comparison tables.

The validator rejects repeated image paths across records. Before publication, also compare exact hashes and visual similarity against current and accessible prior-site assets: renaming or cropping an image does not create uniqueness. Document inaccessible inventories. Validation alone does not establish visual uniqueness or licensing.

## Import workflow

1. Prepare candidate JSON outside the live source.
2. Run `pnpm catalogue:validate /absolute/path/to/candidate.json` (read-only; no auto-publication).
3. Review wording, supplier evidence, units and image permissions/uniqueness. Check source documents against the proposed configuration.
4. Replace the public JSON only after editorial review. Run `pnpm test`, `pnpm lint`, `pnpm build` and browser checks.
5. Commit, publish the phase implementation and report to GitHub, and verify the remote files. Hosting deployment is separate.

Example commands: `pnpm catalogue:validate`, `pnpm dev`, `pnpm build`, `pnpm start`.

## Query and comparison contracts

`/products` accepts `q`, `category`, `subcategory`, `application` and `sort=name|featured`. Invalid facets fall back to valid available options; queries are limited to 120 characters. GET forms support bookmarked URLs and search without JavaScript. Campaign parameters are retained in the filter form and ordinary client navigation into product/quote flows.

`/compare?ids=type-pallet-racking,type-cantilever-rack,type-industrial-shelving` accepts up to three unique published IDs in the same division. Mixed divisions, unknown IDs and more than three are rejected. One/zero selections show guidance. Comparison covers application differences, not engineering interchangeability. Unknown values show Contact us. No Product structured data is emitted for these generic types; comparison pages are noindex with canonical /compare.

## Phase 2A editorial controls

Before adding a page, identify a distinct support arrangement, handling method or customer task. A synonym, finish, colour or unverified size variant does not warrant another URL. Existing broad entry points remain available; their descriptions direct readers toward the more specific types. Retail display, household storage and backstage use must be explained distinctly when their equipment families overlap.

Each description should explain the use, distinguish it from a neighbouring type, state practical information needed for a quotation, and identify relevant limitations. Avoid padding with repeated paragraphs. Manufacturer category references are terminology checks only, not evidence of an active supply relationship, availability, certification or permission to reuse photographs. See `docs/CATALOGUE_RESEARCH.md`.

Category buying guidance and two substantive questions per division live in `src/content/en/category-guidance.json`. The page uses the division name in its H1; FAQs do not emit unsupported rich-result schema. Related products rank the same subcategory first, then shared application labels, remaining within the division. Keep application labels consistent when the use is actually shared.

The expansion adds ten subcategories without changing existing IDs. All 112 detail pages use the same validation, quote-context and no-price rules. Search and filtering remain shareable GET URLs. The full catalogue is rendered without pagination so comparison selection stays intact; reassess pagination if measured payload or interaction costs justify it.

Phase 2B adds 24 types (three per division) without changing the subcategory taxonomy. Product and division pages link relevant editorial guides. Keep those references synchronized when editing; publication rejects broken editorial references. See `docs/EDITORIAL_EDITING.md`.
