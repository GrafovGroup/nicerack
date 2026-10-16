# Search indexing submission report

Date: October 16, 2026

## Completed

- Verified the Google Search Console URL-prefix property `https://nicerack.ca/` using Google’s supplied HTML file.
- Submitted `https://nicerack.ca/sitemap.xml`. Google reports **Success**, with **271 discovered pages**. An initial fetch status resolved during this session without site changes or duplicate submissions.
- Requested indexing of the English homepage. Google confirmed it was added to a priority crawl queue.
- Added and verified `https://nicerack.ca/` directly in Bing Webmaster Tools using its XML verification file.
- Submitted the same sitemap to Bing. The dashboard shows **Processing**, with zero reported sitemap errors or warnings at the time of submission. Crawl completion and indexed counts are pending.
- Installed both verification files in the live WHC application's public directory and included them in source control for future deployments.

## Validation

- Public sitemap returns HTTP 200 with application/xml and parses as 271 URL entries.
- Robots.txt allows crawling and advertises the sitemap.
- Both verification URLs return the expected file contents over HTTPS.
- A Googlebot user-agent request also returns HTTP 200; this is an HTTP compatibility check, not proof of a Google crawl. Google’s own sitemap Success status is the authoritative retrieval confirmation.
- No application code changed; no build or application test rerun was necessary.

## Evidence and ongoing checks

- [Google sitemap success](docs/qa/search-indexing/google-sitemap.png)
- [Google homepage indexing request](docs/qa/search-indexing/google-homepage-request.png)
- [Bing sitemap submission](docs/qa/search-indexing/bing-sitemap.png)

Review Google page indexing and Bing sitemap processing after their reports update. Search engines determine crawl timing, indexing eligibility and ranking; submission is not a guarantee of inclusion. Keep both public verification files permanently. No DNS, mail configuration, tracking scripts or quote email tests were changed or sent.
