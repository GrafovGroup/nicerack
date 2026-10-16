import test from 'node:test';
import assert from 'node:assert/strict';
import {searchCatalogue} from '../src/lib/catalogue-search';
import {products} from '../src/content/en/catalogue';
test('search matches case-insensitive terms across product and category', () => {
  assert.ok(searchCatalogue({q:'  PALLET warehouse  '}).results.some(p=>p.slug==='pallet-racking'));
  assert.ok(searchCatalogue({q:'  PALLET warehouse  '}).results.every(p=>p.categoryId==='industrial'));
});
test('search and category are intersected', () => {
  assert.equal(searchCatalogue({q:'pallet',category:'automotive'}).results.length, 0);
  assert.ok(searchCatalogue({q:'pallet',category:'industrial'}).results.length>=4);
});
test('unknown filters safely fall back to the full catalogue', () => {
  const result = searchCatalogue({category:'nonexistent',sort:'price'});
  assert.equal(result.category, '');
  assert.equal(result.sort, 'featured');
  assert.deepEqual(result.results, products);
});
test('alphabetical sorting does not mutate featured order', () => {
  const original = products.map(p=>p.name);
  const result = searchCatalogue({sort:'name'});
  assert.deepEqual(result.results.map(p=>p.name), [...original].sort((a,b)=>a.localeCompare(b,'en-CA')));
  assert.deepEqual(products.map(p=>p.name), original);
});
test('blank queries return all items and long input is bounded', () => {
  assert.equal(searchCatalogue({q:'   '}).results.length, products.length);
  assert.equal(searchCatalogue({q:'x'.repeat(500)}).q.length, 120);
});
test('subcategory and application facets narrow the correct division',()=>{
 assert.equal(searchCatalogue({category:'industrial',subcategory:'industrial-long-materials'}).results[0].slug,'cantilever-rack');
 assert.equal(searchCatalogue({category:'industrial',application:'Warehouse storage'}).results.length,5);
 assert.equal(searchCatalogue({category:'industrial',subcategory:'garage-wall-storage',application:'Bicycles'}).results.length,16);
});
