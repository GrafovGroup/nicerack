import test from 'node:test';
import assert from 'node:assert/strict';
import {regions,matchingCities,cityNotes,regionPath,destinationQuote} from '../src/lib/coverage';
import {provinces} from '../src/content/en/catalogue';
import {quoteContext} from '../src/lib/quote-context';
import {languageAlternates,frenchPaths} from '../src/lib/locale';
import sitemap from '../src/app/sitemap';
test('national coverage includes every province and territory with reciprocal discoverable routes',()=>{
 assert.deepEqual(regions.map(r=>r.name).sort(),[...provinces].sort());
 const urls=sitemap().map(s=>s.url);
 for(const r of regions){assert.ok(r.cities.length);assert.equal(new Set(r.cities.map(c=>c.slug)).size,r.cities.length);assert.equal(r.checklist.length,3);assert.equal(r.checklistFr.length,3);for(const locale of ['en','fr'] as const){const path=regionPath(r,locale);assert.ok(urls.includes('https://nicerack.ca'+path));assert.equal(languageAlternates(path)?.['fr-CA'],regionPath(r,'fr'));}assert.ok(frenchPaths.includes(regionPath(r,'fr')));}
});
test('destination matching handles accents, punctuation, suburbs and province abbreviations',()=>{
 const qc=regions.find(r=>r.code==='QC')!,bc=regions.find(r=>r.code==='BC')!,ns=regions.find(r=>r.code==='NS')!;
 assert.ok(matchingCities(qc,'montreal').some(c=>c.name==='Montréal'));
 assert.ok(matchingCities(ns,'dartmouth').some(c=>c.name==='Halifax'));
 assert.equal(matchingCities(bc,'BC').length,bc.cities.length);
 assert.equal(matchingCities(qc,'zzzzzz').length,0);
 assert.equal(cityNotes('Greater Sudbury','en'),'/locations/sudbury');
 assert.equal(cityNotes('Québec','en'),'/locations/quebec-city');
});
test('every destination retains its actual province and locale in quote links',()=>{
 for(const r of regions)for(const city of r.cities)for(const name of [city.name,...city.nearby])for(const locale of ['en','fr'] as const){const path=regionPath(r,locale),url=new URL(destinationQuote(r,name,locale,path),'https://nicerack.ca');const q=quoteContext(Object.fromEntries(url.searchParams));assert.equal(q.city,name);assert.equal(q.province,r.name);assert.equal(q.source,path);assert.equal(url.pathname,locale==='fr'?'/fr/soumission':'/request-quote');}
});
