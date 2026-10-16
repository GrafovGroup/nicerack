# Phase 2C browser checks

Local production build only, delivery explicitly disabled.

- 320px: home, mobile menu, accent-insensitive catalogue search, division filter, two technology types compared, table scroll contained (document 320px; table 700px), quote prefill and French validation summary. Focus moved to `.fr-form-errors`.
- 390px: form and Montréal city page, document width equals viewport; city/province and UTM preserved in quote URL. Screenshot saved.
- 1280px: French home desktop navigation and typography reviewed. Screenshot saved. Temporary viewport override reset afterward.
- EN activated by keyboard from Montréal; FR selected explicitly to return to its counterpart. English `drive-in-racking` had FR hub target `/fr/produits`. Reload of the French catalogue stayed French with no suggestion.
- Valid local form attempted delivery with `QUOTE_DELIVERY_ENABLED=false`: localized failure, input retained, no live message. Empty-form errors and field labels were French.
- Preference decision matrix, response statuses and English-friendly inbox output tested with unit tests. Fresh browser fr-CA emulation and production successful delivery were not performed.

Screenshots: `montreal-mobile-390.png`, `french-home-desktop.png`.

- Additional English Barrie city page checked at 320px: correct en-CA document, visible EN/FR/phone controls and no horizontal document overflow.
