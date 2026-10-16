# Search ownership and measurement

Search ownership and sitemap submissions were completed on October 16, 2026. See [the submission report](../SEARCH_INDEXING_REPORT.md) for verified results. Submission does not guarantee indexing or ranking.

## Google Search Console

Use the business owner's Google account to add the Domain property `nicerack.ca`. Copy Google's exact DNS TXT verification record into the WHC zone without replacing existing TXT or MX records, then verify in Search Console. Alternatively use a URL-prefix property for `https://nicerack.ca/` and the verification method supplied by Google. Retain the verification record.

In the verified property's Sitemaps screen submit `https://nicerack.ca/sitemap.xml`. Confirm successful retrieval and inspect representative English and French URLs. Review page indexing, canonical selection, crawl errors and search performance after data accumulates. Sitemap submission does not guarantee indexing.

Official instructions: [ownership verification](https://support.google.com/webmasters/answer/9008080?hl=en), [sitemaps](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap).

## Bing Webmaster Tools

In the owner's account, add `https://nicerack.ca/` and use Bing's supplied verification method, or import an already verified Search Console property with the owner's authorization. Submit `https://nicerack.ca/sitemap.xml` and check retrieval and URL inspection. The property is now verified with `public/BingSiteAuth.xml`; retain this file in every deployment. Google uses `public/google4366093f64d8b6de.html` for its verified HTTPS URL-prefix property; retain that file too.

Official instructions: [add and verify](https://www.bing.com/webmasters/help/add-and-verify-site-12184f8b), [sitemaps](https://www2.bing.com/webmasters/help/sitemaps-3b5cf6ed).

## Measurement options — not installed

1. Start with Search Console/Bing search reports and existing hosting aggregate logs: no new browser tracking. Hosting logs may contain personal data; limit access and retention.
2. Consider a privacy-focused aggregate analytics service after reviewing its data processing, retention, hosting location and consent requirements.
3. Consider GA4 only if event attribution is needed, with an approved consent approach and updated bilingual privacy information.

Useful future events are locale choice, rack search, call-link click and quote completion. Never put names, email addresses, message bodies or full quote query strings into analytics. A call-link click is not an answered call; successful transport is not confirmed inbox receipt. No analytics scripts, cookies or external tracking integrations were added.
