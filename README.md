# NiceRack.ca

Phase 1A foundation and Phase 1B catalogue implementation based on `PHASE_1A_CODEX_BRIEF.md`. Next.js App Router, TypeScript, Tailwind CSS, locally structured English content, and reusable UI. No checkout.

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

The quote endpoint validates origin, JSON, the honeypot and required fields. When enabled, the server sends requests to info@nicerack.ca through `/usr/sbin/sendmail`, with at most five attempts per hashed IP per hour. Only rate counters are stored locally. A failed or unconfigured transport returns 503 and keeps the visitor's details in the form. Mail transport acceptance is not proof of inbox receipt.

Set `LEAD_DATA_DIR` outside the document root and enable `QUOTE_DELIVERY_ENABLED=true` only after the destination and delivery have been verified. The user confirmed forwarding is handled automatically; retain info@nicerack.ca as the recipient. The WHC application is deployed and responds HTTP 200 when addressed directly with the domain Host header. QUOTE_DELIVERY_ENABLED=true and the private data path are configured on WHC. Inbox receipt has not been tested. Public DNS still delegates to Spaceship while WHC reports parking1.whc.ca and parking2.whc.ca. WHC’s A record is 51.161.57.68 (TTL 300). Valid HTTPS remains pending; do not claim a completed public launch.

Production metadata permits indexing. Product pages describe general rack types; no unverified stock, SKU, load ratings or completed-project claims are supplied. Phase 1B adds 24 structured rack types, subcategories, application facets, keyword search, name sorting, shareable URLs, detailed product pages and same-division comparison for up to three types. See [catalogue editing instructions](docs/CATALOGUE_EDITING.md) and [Phase 1B report](PHASE_1B_REPORT.md). Verified supplier enrichment, checkout, CRM, supplier operations, translations and city pages remain deferred. The standard phone placeholder is (833) 696-9996 and has not been verified as a NiceRack business line.
