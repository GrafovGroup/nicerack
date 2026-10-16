import test from 'node:test';
import assert from 'node:assert/strict';
import {searchCatalogue} from '../src/lib/catalogue-search';
import {products} from '../src/content/en/catalogue';
test('search matches case-insensitive terms across product and category', () => {
  assert.deepEqual(searchCatalogue({q:'  PALLET warehouse  '}).results.map(p=>p.slug), ['pallet-racking']);
});
test('search and category are intersected', () => {
  assert.equal(searchCatalogue({q:'pallet',category:'automotive'}).results.length, 0);
  assert.equal(searchCatalogue({q:'pallet',category:'industrial'}).results.length, 1);
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
