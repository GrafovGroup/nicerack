import test from 'node:test';
import assert from 'node:assert/strict';
import {compareProducts} from '../src/lib/comparison';
const ids=['type-pallet-racking','type-cantilever-rack','type-industrial-shelving'];
test('comparison accepts up to three within a division',()=>{const result=compareProducts(ids);assert.equal(result.error,'');assert.equal(result.items.length,3);});
test('comparison rejects mixed divisions and more than three',()=>{
 assert.match(compareProducts([ids[0],'type-ladder-rack']).error,/same division/);
 assert.match(compareProducts([...ids,'type-ladder-rack']).error,/no more than three/);
});
test('comparison handles empty, duplicate and unknown IDs',()=>{
 assert.equal(compareProducts([]).items.length,0);
 assert.equal(compareProducts([ids[0],ids[0]]).items.length,1);
 assert.match(compareProducts(['unknown']).error,/not available/);
});
