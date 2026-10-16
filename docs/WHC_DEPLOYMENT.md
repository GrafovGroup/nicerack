# WHC deployment status — October 15, 2026

- Existing Web Hosting Pro plan; separate nicerack.ca addon domain and nicerack-live Node 22 application.
- Application root: /home/nvfglyl5/nicerack-live; startup server.cjs; production mode.
- Local production build uploaded without macOS dependencies; exact Linux runtime dependencies installed successfully.
- HTTP direct-origin check: 200 using nicerack.ca Host at 51.161.57.68.
- Selected NICERACK.CA nameplate installed; .CA has the same font and size.
- Quote transport targets info@nicerack.ca. User says forwarding is automatic; do not create another forwarder. Delivery enabled, private rate-counter directory configured. Inbox receipt is unverified.
- cPanel NiceRack email routing changed from automatic/local to Remote Mail Exchanger to respect external MX records.
- WHC DNS A @ changed from 149.56.225.6 TTL 14440 to 51.161.57.68 TTL 300. www CNAME remains nicerack.ca. Mail records left unchanged.
- WHC zone currently contains mx1.forwardemail.net and mx2.forwardemail.net; forwarding verification TXT and SPF retained.
- WHC domain panel reports parking1.whc.ca and parking2.whc.ca. Reapplying returns “Nameservers have already been updated.” The .ca authoritative server still returns launch1.spaceship.net and launch2.spaceship.net. Public A/MX still reflect Spaceship.
- HTTPS direct-origin check rejects the self-signed certificate. No validation bypass used.

## Remaining work

1. Resolve public delegation mismatch with WHC/registrar or allow a pending registry update to complete. Do not replace mail records or guess a forwarding destination.
2. Once public DNS resolves to WHC, issue AutoSSL for nicerack.ca and www.nicerack.ca and verify trusted HTTPS.
3. Enable canonical HTTPS redirection after the certificate is valid.
4. Verify a quote reaches info@nicerack.ca end to end with an authorized test; transport acceptance alone does not establish inbox delivery.
5. Verify public pages, assets and responsive layout over HTTPS.

Local validation: lint passed, 11 tests passed, production build passed. Production build uses indexable metadata and general product types without invented specifications. Local preview remains available on port 3000. GitHub publication is tracked in PHASE_1A_REPORT.md.
