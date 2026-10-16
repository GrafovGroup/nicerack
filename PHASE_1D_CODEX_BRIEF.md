# NiceRack.ca — Phase 1D: Public Launch & CALL NOW

## Confirmed business rules
- Two primary actions: REQUEST A QUOTE and CALL NOW.
- Never show public prices, carts, checkout, accounts, CRM, dashboards, or lead databases.
- Enquiries go to info@nicerack.ca.
- CALL NOW must use a real user-confirmed business number. Do NOT reuse the old placeholder (833) 696-9996 or invent a number. Until the user supplies the real number, keep phone CTAs hidden and mark this as blocked.

## Tasks
1. Read Phase 1A/1B/1C reports, WHC deployment runbook and existing code; preserve tested behavior.
2. Implement reusable CALL NOW tel: action for desktop/mobile in header, hero, category/product pages, contact and footer; show only when configured with validated confirmed phone number. Accessible labels and consistent mobile treatment; keep REQUEST A QUOTE prominent.
3. Audit all CTA destinations and remove fake or dead phone links. Avoid telephone schema until verified.
4. Prepare WHC deployment of latest Phase 1C source, but do not deploy or change DNS without explicit authorization. Recheck DNS delegation, A/CNAME, MX, trusted HTTPS, redirect and preservation of ForwardEmail records.
5. With separate authorization, test an actual enquiry and verify final receipt at info@nicerack.ca. Sendmail acceptance alone is not receipt.
6. Run lint, typecheck, tests, build, route and mobile CTA audit. Document blockers and rollback steps.
7. Publish PHASE_1D_REPORT.md and code changes to GitHub.

## Stop conditions
No confirmed phone => do not expose CALL NOW yet. No deployment authorization => do not deploy. No permission for live mail => do not send live test mail.
