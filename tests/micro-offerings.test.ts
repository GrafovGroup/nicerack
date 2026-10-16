import test from 'node:test';
import assert from 'node:assert/strict';
import {products} from '../src/content/en/catalogue';
import french from '../src/content/fr/products.json';
import links from '../src/content/en/accessory-links.json';
import services from '../src/content/en/small-services.json';
import {searchCatalogue} from '../src/lib/catalogue-search';
import {languageAlternates} from '../src/lib/locale';
import {quoteHref,quoteContext} from '../src/lib/quote-context';

test('accessory filter exposes all eight additions with valid parent links and French equivalents',()=>{
 const results=searchCatalogue({application:'Rack accessories'}).results;
 assert.equal(results.length,8);
 for(const p of results){
  const parents=links[p.slug as keyof typeof links];
  assert.ok(parents.length>0);
  for(const slug of parents)assert.ok(products.some(x=>x.slug===slug),slug);
  const fr=french.find(x=>x.id===p.id)!;assert.ok(fr);
  assert.equal(languageAlternates('/products/'+p.slug)?.['fr-CA'],'/fr/produits/'+fr.slug);
  assert.equal(p.specifications.length,0);assert.equal(p.availability,undefined);
  const url=new URL(quoteHref(p,{quantity:'4'},'/products/'+p.slug),'https://nicerack.ca');
  assert.equal(url.searchParams.get('product'),p.id);assert.equal(url.searchParams.get('quantity'),'4');
 }
});
test('small service scopes have distinct enquiry sources and clear requested inputs',()=>{
 assert.equal(services.length,4);assert.equal(new Set(services.map(s=>s.id)).size,4);
 for(const s of services){assert.ok(s.brief.length>50);assert.ok(s.text.length>180);const source='/services#'+s.id;assert.equal(quoteContext({source}).source,source);}
});
