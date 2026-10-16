import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
import {createHash} from 'node:crypto';
import products from '../src/content/en/products.json';
import french from '../src/content/fr/products.json';
import images from '../src/content/placement-images.json';

test('every published product and service has one exclusive image placement',()=>{
 const en=products.filter(p=>p.published).flatMap(p=>{assert.equal(p.images.length,1,p.slug);return p.images;});
 const other=Object.values(images);
 assert.equal(en.length,120);
 for(const p of french)assert.ok(images[('/fr/produits/'+p.slug) as keyof typeof images],p.slug);
 for(const id of ['planning','installation','sourcing','rentals','accessory-matching','replacement-parts','rack-labelling','cable-organization'])assert.ok(images[('/services#'+id) as keyof typeof images]);
 assert.equal(other.length,40);
 const all=[...en,...other];
 assert.equal(new Set(all.map(i=>i.src)).size,160,'An image path was assigned more than once');
 const hashes=all.map(i=>{assert.ok(i.alt.trim());assert.ok(existsSync('public'+i.src),i.src);return createHash('sha256').update(readFileSync('public'+i.src)).digest('hex');});
 assert.equal(new Set(hashes).size,160,'Duplicate image bytes');
});
