# WHC deployment history — October 15, 2026

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

## Phase 1C deployment handoff

Phase 1C is published source only; no WHC redeployment, DNS mutation or live test email was performed. The deployment observations above are historical checks, not renewed confirmation. Before deploying the current build:

1. Recheck registry delegation, public A/CNAME and MX records. Preserve the user's existing automatic forwarding. Resolve delegation with WHC if public DNS still points elsewhere.
2. Verify trusted HTTPS for both apex and www, then canonical redirection. Do not bypass certificate validation.
3. Deploy the tested build with the existing sendmail transport and fixed info@nicerack.ca recipient. Keep the rate directory outside the document root, writable only by the application account. No enquiry content is stored there.
4. Counters now use hashed normalized email (5/hour) and, optionally, verified proxy IP (20/hour). Leave TRUSTED_CLIENT_IP_HEADER unset until WHC confirms the proxy overwrites that header; never trust arbitrary X-Forwarded-For. Email-only throttling can be bypassed by rotating addresses, so proxy verification and host-level abuse controls remain an operational check.
5. Counters expire logically after one hour; files are not automatically deleted. During maintenance with workers stopped, remove obsolete counters and orphaned .lock/.tmp files. A worker crash can leave a lock and block that key until cleanup. Never remove active locks while workers are running.
6. With explicit authorization, submit a uniquely identified enquiry and confirm receipt in the real info@nicerack.ca destination, Reply-To, context, spam placement and forwarding. A 200 response means sendmail accepted the message, not final inbox delivery. Reconcile uncertain timeout failures by reference/context before resubmitting to avoid duplicates.
7. Verify public quote prefill, blank quantity, mobile layout, invalid-input handling and the email alternative. Enable delivery only after operational verification. The existing WHC environment was previously enabled; this phase does not alter it.

No working business phone has been confirmed, so current source uses email CTAs. No new imagery was introduced.

## Phase 1D — current public deployment

The user authorized WHC connection/deployment in this chat. The Phase 1D build (including 1B/1C) is now deployed at https://nicerack.ca.

- Public NS: parking1.whc.ca / parking2.whc.ca; apex A: 51.161.57.68; www CNAME: nicerack.ca. No DNS mutation was needed.
- ForwardEmail MX and existing verification/SPF TXT records preserved unchanged. No new forwarding rule or mailbox created.
- Requested a free Let's Encrypt certificate in cPanel after delegation resolved. Trusted HTTPS succeeds for apex and www; certificate validation was never bypassed.
- Added an Apache/LiteSpeed canonical rule before the existing managed Passenger block. HTTP and www redirect with 308 to https://nicerack.ca, preserving path/query. ACME challenge paths are exempted for renewal.
- Deployed build ID `21KBrnxMmNhZqw1yWMhHz` to `/home/nvfglyl5/nicerack-live` and restarted Passenger through `tmp/restart.txt`. Existing environment and Linux node_modules retained; exact runtime dependency manifest matches.
- Uploaded archive `/home/nvfglyl5/nicerack-phase-1d.zip`, SHA-256 `7fcd8ae28099613e08847766fec6192f8f4ae9cb60323eacd35c96857a9ce72d`. Extracted in a private staging directory before activation. No source secrets or macOS dependencies included.
- Previous app and domain routing retained at `/home/nvfglyl5/nicerack-backup-before-1d`; private rate directory untouched.
- Public audit: 41 sitemap pages, 105 internal targets, expected unknown-product 404. Canonical metadata, quote/call actions and absence of pricing schema checked. No critical browser errors on inspected homepage.

### Rollback

In a controlled maintenance operation, move the current `.next` aside and restore `.next`, `public`, `server.cjs`, and `next.config.mjs` from `/home/nvfglyl5/nicerack-backup-before-1d` into the existing application root. Retain environment files, Linux node_modules symlink and rate data. Touch `tmp/restart.txt`, then verify HTTPS and routes. The backup also includes `domain.htaccess` for routing recovery; restoring that file removes canonical redirects, so use it only if routing itself is broken. Do not replace the valid certificate or mail records.

### Remaining operational verification

The business phone is confirmed as (833) 696-9996; actual call routing has not been tested. Telephone structured data remains omitted. A live quote test and final receipt at info@nicerack.ca require separate authorization; no such message was sent. Existing transport enablement was preserved, but acceptance and receipt are not claimed verified. Proxy-header trust and rate-counter maintenance guidance above still applies.

## Phase 2D — current public deployment (supersedes earlier status)

Phases 2A–2C deployed October 15, 2026 with explicit user authorization. Current build `ykMepqQd3Y9KQEpmcjeNW`; 255 public sitemap pages and 540 internal targets passed audit. Archive `/home/nvfglyl5/nicerack-phase-2d.zip`, SHA-256 `8b1991f51af50bc7b7fc683754d2d8a4759b21976a2ba748c65a1c747df0d564`. Private stage `nicerack-stage-2d`; rollback backup `nicerack-backup-before-2d` contains Phase 1D app and domain routing. Runtime, environment, mail, DNS, certificates and private rate storage retained. Restore four app paths from this backup and restart Passenger for rollback; preserve runtime and mail configuration.

Owner confirmed real phone and French review checks in chat. Owner declined test emails; receipt/forwarding/spam/Reply-To acceptance remains unverified. No test sent. This supersedes previous “not deployed” status in historical phase reports without rewriting their historical observations. Full evidence and limits: [Phase 2D report](../PHASE_2D_REPORT.md).
