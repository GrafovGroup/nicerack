# NiceRack.ca

Phase 1A foundation, Phase 1B catalogue and Phase 1C enquiry implementation based on `PHASE_1A_CODEX_BRIEF.md`. Next.js App Router, TypeScript, Tailwind CSS, locally structured English content, and reusable UI. No checkout.

## Run locally

Use Node.js 22+ and pnpm 11.25.0.

```sh
pnpm install --frozen-lockfile
cp .env.example .env.local
pnpm dev
```

Open the localhost URL printed by Next.js. Checks: `pnpm lint`, `pnpm typecheck`, `pnpm test`, `pnpm build`. Production preview: `pnpm start` after building.

## Structure

- `src/content/en/catalogue.ts`: eight categories and 24 general rack product types. Optional SKU, supplier, dimensions, load rating, image, lead-time and availability fields remain absent until verified.
- `src/components`: shared navigation, cards, breadcrumbs, CTA and quote form.
- `src/app`: homepage, category/product routes, supporting pages, quote API, sitemap and robots.
- `src/lib/quote.ts`: shared client/server validation. Stable category/product IDs and page/UTM lead source.
- `docs/ASSET_USAGE.md`: image provenance and placement register.

## WHC deployment

The WHC Node.js application uses Node 22, production mode, `server.cjs`, and application root `/home/nvfglyl5/nicerack-live`. Build locally, upload `.next` (excluding cache), `public`, `next.config.mjs`, `server.cjs`, and a runtime package manifest with the exact installed dependency versions. Install runtime dependencies on Linux; do not upload macOS node_modules.

The quote endpoint validates origin, JSON, the honeypot and required fields. When enabled, the server sends requests to info@nicerack.ca through `/usr/sbin/sendmail`, with at most five attempts per normalized email per hour, plus twenty per IP when a trusted proxy header is explicitly configured. Only rate counters are stored locally. A failed or unconfigured transport returns 503 and keeps the visitor's details in the form. Mail transport acceptance is not proof of inbox receipt.

Set `LEAD_DATA_DIR` outside the document root. The existing WHC delivery configuration is preserved; live inbox receipt remains unverified. Forwarding is handled automatically by the user. Phase 1D is deployed at https://nicerack.ca with trusted HTTPS, WHC DNS and canonical HTTP/www redirects. See [deployment history and rollback](docs/WHC_DEPLOYMENT.md).

Production metadata permits indexing. Product pages describe general rack types; no unverified stock, SKU, load ratings or completed-project claims are supplied. Phase 1B adds 24 structured rack types, subcategories, application facets, keyword search, name sorting, shareable URLs, detailed product pages and same-division comparison for up to three types. See [catalogue editing instructions](docs/CATALOGUE_EDITING.md) and [Phase 1B report](PHASE_1B_REPORT.md). Verified supplier enrichment, checkout, CRM, supplier operations, translations and city pages remain deferred. Phase 1D adds CALL NOW using the confirmed business number (833) 696-9996 alongside REQUEST A QUOTE. Actual call routing remains to be tested. Quantity is optional. See [Phase 1C report](PHASE_1C_REPORT.md). No persistent enquiry database or CRM is introduced. Phase 1D deploys the current 1B/1C/1D implementation to WHC. See [Phase 1D report](PHASE_1D_REPORT.md).
