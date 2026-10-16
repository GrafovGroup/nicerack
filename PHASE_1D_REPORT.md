# NiceRack.ca — Phase 1D report

Date: October 15, 2026 (America/Toronto)
Branch: `codex/phase-1d`
Base brief: `47b0d4a` — Public Launch & CALL NOW.

## Implemented and deployed

- Reusable, accessible CALL NOW action using confirmed business number **(833) 696-9996**, linking to `tel:+18336969996`.
- Call action appears in the desktop/mobile header, homepage hero, category/product pages, contact page, shared quote section and footer. REQUEST A QUOTE remains prominent; category/contact labels standardized. Mobile layouts fit 320px and 390px.
- Kept all products quote-only: no public prices, carts, checkout, payment, accounts or CRM. Existing 1C validation, optional quantity, source context and mail transport preserved.
- Telephone structured data remains absent until call routing is verified. Updated privacy processing description to accurately mention hashed email counters.
- Deployed the tested current application, including catalogue Phase 1B and enquiry Phase 1C, to the existing WHC Node 22 application. Existing Linux dependencies and environment retained.

## Domain and HTTPS

Public DNS now delegates to WHC (`parking1.whc.ca`, `parking2.whc.ca`). Apex resolves to **51.161.57.68**; www is a CNAME to nicerack.ca. ForwardEmail MX and existing TXT records remain unchanged. No DNS edits or new forwarding rules were needed.

The old self-signed certificate was replaced through cPanel's free Let's Encrypt request. Trusted HTTPS verifies for apex and www without bypassing validation. Added canonical 308 redirects from HTTP and www to **https://nicerack.ca**, preserving paths and query strings and exempting ACME challenge paths.

Build ID: `21KBrnxMmNhZqw1yWMhHz`. Upload checksum matched before activation. Previous application and routing retained in `/home/nvfglyl5/nicerack-backup-before-1d`; rollback procedure is in `docs/WHC_DEPLOYMENT.md`.

## Verification

- `pnpm lint`: passed, zero warnings.
- `pnpm typecheck`: passed.
- `pnpm test`: 39/39 passed.
- `pnpm build`: passed; 24 catalogue records validated.
- Local and public production HTTP audit: 41 sitemap pages return 200 with one H1, 105 internal targets resolve, unknown product returns 404.
- All 41 public sitemap pages have unique titles, descriptions, correct canonical URLs, REQUEST A QUOTE and valid confirmed-number phone links. No cart/checkout links or pricing schema.
- Redirect checks: HTTP apex, HTTP www and HTTPS www redirect correctly; a product path with quantity query survives the redirect and returns 200.
- Browser: public desktop/mobile homepage renders both actions; 390px document fits without horizontal overflow; no critical homepage console errors. Compact 320px product layout also fits locally. Quote preselection checked on public site without sending mail.
- Screenshots: `docs/phase-1d-live-desktop.png`, `docs/phase-1d-live-mobile.png`.

## Remaining operational checks

Software and WHC deployment are complete. Full operational acceptance still requires an actual call-routing test and a separately authorized live enquiry with confirmed receipt at info@nicerack.ca. Neither is claimed tested. No live email or phone call was initiated in this phase. Transport acceptance alone does not prove inbox receipt.

The existing 1C rate-limit operational caveats remain: verify the hosting proxy before trusting an IP header, and maintain private counter/lock files as documented. Supplier verification and approved catalogue photography remain business inputs; no imagery was added or reused in this phase.

Code and this report are published to GitHub main through the phase PR, with remote source/report verification after merging.
