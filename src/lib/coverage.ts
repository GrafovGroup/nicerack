import regions from '@/content/coverage.json';
import cityLinks from '@/content/city-note-links.json';
export {regions};
export type Region=(typeof regions)[number];
export type CoverageLocale='en'|'fr';
export const foldPlace=(value:string)=>value.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[’'.]/g,'').replace(/greater /g,'').trim();
export function regionPath(region:Region,locale:CoverageLocale){return locale==='fr'?`/fr/provinces/${region.slugFr}`:`/locations/provinces/${region.slug}`;}
export function destinationQuote(region:Region,city:string,locale:CoverageLocale,source:string){return `${locale==='fr'?'/fr/soumission':'/request-quote'}?${new URLSearchParams({province:region.name,city,source})}`;}
export function cityNotes(name:string,locale:CoverageLocale){
 const aliases:Record<string,string>={'quebec':'quebec city'};
 const key=foldPlace(name);
 const city=cityLinks[locale].find(c=>foldPlace(c.name)===(locale==='en'?(aliases[key]||key):key));
 return city?`${locale==='fr'?'/fr/villes':'/locations'}/${city.slug}`:undefined;
}
export function matchingCities(region:Region,query:string){const q=foldPlace(query);if(!q||[region.name,region.nameFr,region.code].some(s=>foldPlace(s).includes(q)))return region.cities;return region.cities.filter(c=>[c.name,...c.nearby].some(s=>foldPlace(s).includes(q)));}
