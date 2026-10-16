# Formspree integration — October 16, 2026

## Implementation

English `/request-quote` and French `/fr/soumission` now send validated enquiries through the existing Next.js `/api/quote` route to `https://formspree.io/f/mqpewdbw`. All contact, product, service and location enquiry links use these forms.

The React form UX is retained with a tailored JSON/AJAX transport on the WHC Node server. No additional client SDK or runtime dependency is required. This preserves origin checks, bounded JSON bodies, consent validation, honeypot rejection, catalogue validation and hashed rate counters. The old sendmail transport is removed.

Formspree receives name, email (reply address), company, phone, province, city, rack category/type, optional quantity, project message, delivery/installation requests, consent, language, source page/category/product, campaign information and a unique reference/subject. French accents are preserved. Notification recipients are managed in the Formspree dashboard, not by a submitted recipient field.

Success requires a successful HTTP response and the `next` success field used by the official `@formspree/core` 4.0.0 client, without an error payload. Unexpected responses, provider errors, network failures and a 15-second timeout fail safely. The UI preserves entered details and displays localized errors. Requests are not automatically retried because a network timeout can occur after provider acceptance.

English and French privacy text identifies Formspree processing. Local storage continues to contain only hashed rate counters, not enquiry bodies.

## Validation

- 63 automated tests pass, including mocked Formspree acceptance, rejection, malformed replies, network failures, timeouts, French payloads, origin checks and rate limits.
- ESLint, TypeScript and production build pass.
- Tests use injected mock transports and send no live enquiries.
- No real Formspree submission or test email was sent, respecting the user's instruction. Endpoint activation, dashboard notification settings, spam classification and actual inbox receipt are not verified by these checks.

## Deployment

Release build: `mDtIaabtSml2XKveKxOi7`.

Archive SHA-256: `c09e54f66c0c0163a49a2379bdd6796349a3cdae045ffe4722b2754ab2aaa27d`.

WHC HTTPS reachability to the endpoint verified with a read-only GET (405, as expected for a POST-only endpoint); no enquiry was submitted. Release activated on WHC with Passenger restart. Previous `.next` and `public` retained at `/home/nvfglyl5/nicerack-backup-before-formspree`.

Live English/French quote, contact and privacy pages return HTTP 200. Both privacy pages include Formspree. An empty JSON request returns 422 before delivery. The English form renders with no captured browser errors. [Live form screenshot](docs/evidence/formspree/live-quote.png).

## References

- [Formspree AJAX documentation](https://help.formspree.io/articles/building-your-form/submit-forms-with-javascript-ajax/)
- [Official Formspree core client, version 4.0.0](https://unpkg.com/@formspree/core@4.0.0/dist/index.js)
