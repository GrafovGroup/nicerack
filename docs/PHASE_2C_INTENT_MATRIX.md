# Phase 2C intent, URL and translation plan

Prepared before implementation. All 112 English product IDs/slugs remain unchanged. Translate 24 foundational types (three per division), eight divisions and eight guides. Publish 15 distinct French Quebec city notes and 25 new English regional city notes. Do not generate city/category permutations.

## Locale routes

Separate EN and FR document roots produce the correct HTML language without client-side language replacement. `/fr` is the French entry point; `/fr/categories`, `/fr/produits`, `/fr/guides`, `/fr/villes`, `/fr/soumission`, `/fr/contact`, `/fr/confidentialite`, `/fr/conditions` and noindex `/fr/comparer` provide complete translated journeys. Existing English paths stay unchanged. Always-visible EN/FR links use a verified counterpart or a locale hub; only actual counterpart pages receive reciprocal hreflang. The FR catalogue shows its actual translated selection.

French suggestion: browser language only; no geolocation/IP lookup. A dismissible nonmodal prompt, no automatic redirect. Explicit language choice and dismissal persist locally and override suggestion. Existing coarse province context may be accepted by the pure preference function but no new location source is collected.

## Product translation map

| English URL | French URL | French intent |
| --- | --- | --- |
| /products/pallet-racking | /fr/produits/palettiers-selectifs | Palettiers sélectifs — usages, compatibilité et renseignements pour soumission |
| /products/cantilever-rack | /fr/produits/rayonnages-en-porte-a-faux | Rayonnages en porte-à-faux — usages, compatibilité et renseignements pour soumission |
| /products/industrial-shelving | /fr/produits/etageres-industrielles | Étagères industrielles — usages, compatibilité et renseignements pour soumission |
| /products/ladder-rack | /fr/produits/supports-a-echelles-pour-vehicules | Supports à échelles pour véhicules — usages, compatibilité et renseignements pour soumission |
| /products/roof-rack | /fr/produits/barres-de-toit | Barres de toit — usages, compatibilité et renseignements pour soumission |
| /products/truck-bed-rack | /fr/produits/supports-pour-caisse-de-camionnette | Supports pour caisse de camionnette — usages, compatibilité et renseignements pour soumission |
| /products/wall-storage | /fr/produits/rangement-mural | Rangement mural — usages, compatibilité et renseignements pour soumission |
| /products/overhead-storage | /fr/produits/rangement-suspendu-pour-garage | Rangement suspendu pour garage — usages, compatibilité et renseignements pour soumission |
| /products/bicycle-storage | /fr/produits/rangement-pour-velos | Rangement pour vélos — usages, compatibilité et renseignements pour soumission |
| /products/garment-rack | /fr/produits/portants-a-vetements-sur-roulettes | Portants à vêtements sur roulettes — usages, compatibilité et renseignements pour soumission |
| /products/display-shelving | /fr/produits/etageres-de-presentation | Étagères de présentation — usages, compatibilité et renseignements pour soumission |
| /products/portable-display | /fr/produits/presentoirs-mobiles | Présentoirs mobiles — usages, compatibilité et renseignements pour soumission |
| /products/power-rack | /fr/produits/cages-de-musculation | Cages de musculation — usages, compatibilité et renseignements pour soumission |
| /products/weight-storage | /fr/produits/rangement-pour-poids | Rangement pour poids — usages, compatibilité et renseignements pour soumission |
| /products/sports-storage | /fr/produits/rangement-pour-materiel-sportif | Rangement pour matériel sportif — usages, compatibilité et renseignements pour soumission |
| /products/kitchen-shelving | /fr/produits/etageres-de-cuisine-commerciale | Étagères de cuisine commerciale — usages, compatibilité et renseignements pour soumission |
| /products/dish-storage | /fr/produits/rangement-pour-vaisselle | Rangement pour vaisselle — usages, compatibilité et renseignements pour soumission |
| /products/luggage-rack | /fr/produits/supports-a-bagages | Supports à bagages — usages, compatibilité et renseignements pour soumission |
| /products/server-cabinet | /fr/produits/armoires-pour-serveurs | Armoires pour serveurs — usages, compatibilité et renseignements pour soumission |
| /products/network-rack | /fr/produits/batis-ouverts-pour-reseau | Bâtis ouverts pour réseau — usages, compatibilité et renseignements pour soumission |
| /products/wall-enclosure | /fr/produits/armoires-reseau-murales | Armoires réseau murales — usages, compatibilité et renseignements pour soumission |
| /products/event-coat-rack | /fr/produits/portants-de-vestiaire | Portants de vestiaire — usages, compatibilité et renseignements pour soumission |
| /products/event-garment-rack | /fr/produits/portants-pour-costumes | Portants pour costumes — usages, compatibilité et renseignements pour soumission |
| /products/event-display-rack | /fr/produits/presentoirs-evenementiels | Présentoirs événementiels — usages, compatibilité et renseignements pour soumission |

## Division map

| ID | French URL | Intent |
| --- | --- | --- |
| industrial | /fr/categories/entreposage-industriel | Entrepôts et industrie — choisir selon la tâche et le lieu |
| automotive | /fr/categories/vehicules-et-flottes | Véhicules et flottes — choisir selon la tâche et le lieu |
| garage | /fr/categories/garage-et-maison | Garage et maison — choisir selon la tâche et le lieu |
| retail | /fr/categories/commerce-et-presentation | Commerce et présentation — choisir selon la tâche et le lieu |
| fitness | /fr/categories/entrainement-et-sport | Entraînement et sport — choisir selon la tâche et le lieu |
| hospitality | /fr/categories/restauration-et-hotellerie | Restauration et hôtellerie — choisir selon la tâche et le lieu |
| technology | /fr/categories/informatique-et-reseaux | Informatique et réseaux — choisir selon la tâche et le lieu |
| events | /fr/categories/evenements-et-location | Événements et location — choisir selon la tâche et le lieu |

## Guide map

| English URL | French URL | Intent |
| --- | --- | --- |
| /guides/choosing-pallet-racking | /fr/guides/choisir-un-palettier | Choisir un palettier |
| /guides/van-ladder-racks | /fr/guides/supports-a-echelles-pour-fourgonnettes | Choisir un support à échelles pour fourgonnette |
| /guides/overhead-garage-racks | /fr/guides/rangement-suspendu-au-garage | Planifier le rangement suspendu au garage |
| /guides/garment-racks | /fr/guides/choisir-un-portant-a-vetements | Choisir un portant à vêtements |
| /guides/power-vs-squat-racks | /fr/guides/cage-ou-support-a-squats | Cage de musculation ou support à squats |
| /guides/commercial-kitchen-shelving | /fr/guides/etageres-de-cuisine-commerciale | Choisir des étagères de cuisine commerciale |
| /guides/server-rack-sizing | /fr/guides/dimensions-d-un-bati-informatique | Dimensionner un bâti informatique |
| /guides/event-coat-racks | /fr/guides/organiser-un-vestiaire-evenementiel | Organiser un vestiaire événementiel |

## City URL plan

French Montréal, Québec and Laval adapt the existing English purchasing scenarios; only these three city pairs receive hreflang. Other French cities are original French content with self-canonicals only. Each new city needs a cited municipal/economic source, a distinct purchasing task, concrete quote inputs and relevant links. Final distinct intent/source inventory will accompany the report.

- `/fr/villes/montreal` — Montréal
- `/fr/villes/quebec` — Québec
- `/fr/villes/laval` — Laval
- `/fr/villes/longueuil` — Longueuil
- `/fr/villes/gatineau` — Gatineau
- `/fr/villes/sherbrooke` — Sherbrooke
- `/fr/villes/trois-rivieres` — Trois-Rivières
- `/fr/villes/levis` — Lévis
- `/fr/villes/saguenay` — Saguenay
- `/fr/villes/drummondville` — Drummondville
- `/fr/villes/granby` — Granby
- `/fr/villes/saint-hyacinthe` — Saint-Hyacinthe
- `/fr/villes/saint-jerome` — Saint-Jérôme
- `/fr/villes/terrebonne` — Terrebonne
- `/fr/villes/brossard` — Brossard

New English city paths (no duplication of the 21 existing pages):

- `/locations/barrie` — Barrie
- `/locations/newmarket` — Newmarket
- `/locations/aurora` — Aurora
- `/locations/oakville` — Oakville
- `/locations/burlington` — Burlington
- `/locations/milton` — Milton
- `/locations/cambridge` — Cambridge
- `/locations/guelph` — Guelph
- `/locations/niagara-falls` — Niagara Falls
- `/locations/st-catharines` — St. Catharines
- `/locations/kingston` — Kingston
- `/locations/belleville` — Belleville
- `/locations/oshawa` — Oshawa
- `/locations/whitby` — Whitby
- `/locations/ajax` — Ajax
- `/locations/windsor` — Windsor
- `/locations/sarnia` — Sarnia
- `/locations/sudbury` — Sudbury
- `/locations/north-bay` — North Bay
- `/locations/kelowna` — Kelowna
- `/locations/nanaimo` — Nanaimo
- `/locations/abbotsford` — Abbotsford
- `/locations/chilliwack` — Chilliwack
- `/locations/red-deer` — Red Deer
- `/locations/lethbridge` — Lethbridge

## Release boundary

GitHub publication for review; no WHC deployment. Record independent Quebec linguistic/legal review as outstanding rather than claiming compliance. No customer-facing pre-launch or review disclaimers. No new imagery, suppliers, inventory, local premises or technical ratings.

## Final city intent register

Research refined several preliminary scenarios (notably Sherbrooke reuse, Saguenay outdoor equipment and Terrebonne activity kits). The final routes below are the implemented intents. No extra city/category combinations were created.

| Route | Final purchasing intent | Local primary source |
| --- | --- | --- |
| /locations/barrie | Manufacturing work-in-progress between production steps | https://www.barrie.ca/media/13875 |
| /locations/newmarket | Small technology teams staging changing network equipment | https://www.newmarket.ca/business-development/economic-development/why-newmarket |
| /locations/aurora | Shared cultural rooms with frequent display changeovers | https://www.aurora.ca/business |
| /locations/oakville | Office network changes in occupied premises | https://invest.oakville.ca/why-oakville/strong-economy/ |
| /locations/burlington | Clean-technology service parts kept separate from returned equipment | https://investburlington.ca/our-key-industries/ |
| /locations/milton | Stockroom relocation with phased receiving | https://www.milton.ca/en/business-and-development/economic-development-strategy.aspx |
| /locations/cambridge | Separating fabrication stock from completed assemblies | https://www.cambridge.ca/business-building-development/economic-development/advanced-manufacturing/ |
| /locations/guelph | Agri-food development sample storage and traceability | https://www.guelph.ca/wp-content/uploads/Agri_Food_Value_Prop_Final.pdf |
| /locations/niagara-falls | Guest-room luggage supports and housekeeping turnover | https://niagarafalls.ca/building-planning-and-business/business-resources-economic-development |
| /locations/st-catharines | Maintenance spares organized by machine and revision | https://www.stcatharines.ca/business-and-economic-development/community-profile/industries/ |
| /locations/kingston | Shared equipment stores with booking and return checks | https://www.investkingston.ca/industry-sectors/ |
| /locations/belleville | Trade vehicle loading across mixed daily jobs | https://www.belleville.ca/learn-and-play/history/ |
| /locations/oshawa | Service vans sharing exterior access with interior equipment | https://www.oshawa.ca/media/wvep1fyh/oshawa-economic-development-strategy-oeds-executive-summary-strategies-november-2023-compressed-final-ua.pdf |
| /locations/whitby | Downtown shop display changes without losing replenishment access | https://www.whitby.ca/business-and-economy/economic-development/why-whitby/ |
| /locations/ajax | Automation supply assemblies with irregular pallet footprints | https://ajax.ca/build-invest/for-businesses-investors/business/key-sectors/ |
| /locations/windsor | Automobility prototype parts with changing revisions | https://www.investwindsoressex.com/how-we-help/automobility-and-innovation/ |
| /locations/sarnia | Fabricated lengths and fittings awaiting assembly | https://www.sarnialambton.on.ca/advanced-manufacturing |
| /locations/sudbury | Mining service exchange components separated by condition | https://investsudbury.ca/key-sectors/mining-supply-and-services/ |
| /locations/north-bay | Aviation support stores preserving identification and packaging | https://www.investinnorthbay.ca/industry/aerospace-aviation-transportation/ |
| /locations/kelowna | Mixed material lengths in a growing fabrication workshop | https://www.investkelowna.com/ |
| /locations/nanaimo | Tourism accommodation storage through seasonal room changes | https://www.nanaimo.ca/doing-business/economic-development/business/key-industries/tourism |
| /locations/abbotsford | Farm packing supplies separated from washdown zones | https://www.abbotsford.ca/business-development/agriculture |
| /locations/chilliwack | Agricultural maintenance tools and seasonal spare kits | https://www.businessinchilliwack.com/chilliwack-agricultural-commission/ |
| /locations/red-deer | Mobile work crews changing equipment between assignments | https://secure.reddeer.ca/about-red-deer/moving-to-red-deer/ |
| /locations/lethbridge | Agricultural supply inventory with bulky seasonal replenishment | https://business.chooselethbridge.ca/agriculture/ |
| /fr/villes/montreal | Montréal : réaménager une boutique et coordonner la réception par arrondissement | https://montreal.ca/stationnement |
| /fr/villes/quebec | Québec : préparer les équipements d’optique et d’électronique pour leur intégration | https://www.quebecinternational.ca/en/choose-quebec/quebec-industries/electronics-and-optics-photonics |
| /fr/villes/laval | Laval : organiser les fournitures selon les exigences de nettoyage de l’établissement | https://www.laval.ca/organisation-municipale/portrait-ville-laval/cartes-statistiques/laval-ville-entrepreneuriale/ |
| /fr/villes/longueuil | Longueuil : classer les pièces de soutien aéronautique par statut et emballage | https://www.longueuil.quebec/fr/services/zone-dinnovation-en-aerospatiale |
| /fr/villes/gatineau | Gatineau : séparer les essais informatiques du réseau en service | https://idgatineau.ca/blogue/ |
| /fr/villes/sherbrooke | Sherbrooke : distinguer les objets à réparer des pièces prêtes au réemploi | https://www.sherbrooke.ca/Fichiers/3337a882-4a53-e611-80ea-00155d09650f/Sites/333ceda8-915d-e611-80ea-00155d09650f/Documents/Environnement/PGMR/PGMR%202023-2030_VF.pdf |
| /fr/villes/trois-rivieres | Trois-Rivières : organiser les transferts entre réception et expédition | https://www.idetr.com/fr/poles-de-developpement/logistique-et-transport |
| /fr/villes/levis | Lévis : entreposer des pièces longues avec des éléments en saillie | https://www.ville.levis.qc.ca/fileadmin/documents/Images/actualites/economique/006_ANNEXE_ConsultationsPrebudgetaires2024-2025.pdf |
| /fr/villes/saguenay | Saguenay : ranger le matériel de plein air après son retour | https://promotion.saguenay.ca/fr/choisir-saguenay/nos-secteurs-cles/tourisme |
| /fr/villes/drummondville | Drummondville : suivre les composants entre deux étapes de fabrication | https://www.drummondeconomique.ca/ |
| /fr/villes/granby | Granby : organiser les pièces de maintenance par machine | https://granby-industriel.com/granby-en-chiffres/profil-du-tissu-industriel/ |
| /fr/villes/saint-hyacinthe | Saint-Hyacinthe : séparer emballages secs et contenants à nettoyer | https://st-hyacinthetechnopole.qc.ca/agroalimentaire/ |
| /fr/villes/saint-jerome | Saint-Jérôme : distinguer les composants de mobilité selon leur version | https://www.vsj.ca/wp-content/uploads/2022/12/Strategie-de-developpement-economique-2030_sommaire.pdf |
| /fr/villes/terrebonne | Terrebonne : préparer les ensembles sportifs pour les activités extérieures | https://terrebonne.ca/parcs-et-espaces-recreatifs/ |
| /fr/villes/brossard | Brossard : changer les présentations sans bloquer le réapprovisionnement | https://brossard.ca/en/news/new-interactive-map-on-bciti-nearly-1500-businesses-to-discover-now/ |
