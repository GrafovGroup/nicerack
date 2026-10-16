import test from 'node:test';
import assert from 'node:assert/strict';
import seed from '../src/content/en/products.json';
import {productSchema} from '../src/lib/product-schema';
import {validateCatalogueImport} from '../src/lib/catalogue-import';
const first=seed[0];
test('all 88 generic types validate across eight divisions',()=>{
 const result=validateCatalogueImport(seed);assert.equal(result.length,88);assert.equal(new Set(result.map(p=>p.categoryId)).size,8);
 assert.ok(result.every(p=>p.status==='example-type'&&!p.capacity&&!p.availability));
});
test('generic types reject technical claims and supplier identifiers',()=>{
 assert.equal(productSchema.safeParse({...first,material:'Steel'}).success,false);
 assert.equal(productSchema.safeParse({...first,supplierReference:'private-reference'}).success,false);
 assert.equal(productSchema.safeParse({...first,sku:'SUP-123'}).success,false);
});
test('verified records require evidence and capacity units',()=>{
 assert.equal(productSchema.safeParse({...first,status:'verified'}).success,false);
 const verification={source:'Supplier document 2026-10',checkedAt:'2026-10-15'};
 const product={...first,status:'verified',verification,capacity:{value:100,unit:'kg',evidence:verification}};
 assert.equal(productSchema.safeParse(product).success,true);
 assert.equal(productSchema.safeParse({...product,capacity:{value:100,unit:'kg'}}).success,false);
});
test('imports reject duplicate IDs/slugs and category mismatches',()=>{
 assert.throws(()=>validateCatalogueImport([first,first]),/Duplicate/);
 assert.throws(()=>validateCatalogueImport([{...first,categoryId:'events'}]),/Subcategory/);
});
test('images require local references, alt text and unique placements',()=>{
 const image={src:'/images/rack-photo.webp',alt:'Rack uprights and beams',source:'Supplier permission document'};
 assert.equal(productSchema.safeParse({...first,images:[{...image,alt:''}]}).success,false);
 assert.equal(productSchema.safeParse({...first,images:[{...image,src:'https://untrusted.example/a.jpg'}]}).success,false);
 assert.throws(()=>validateCatalogueImport([{...first,images:[image]},{...seed[1],images:[image]}]),/Duplicate image/);
});
test('draft records are valid editorial inputs without fabricated availability',()=>{
 assert.equal(productSchema.parse({...first,published:false}).published,false);
 assert.equal(productSchema.safeParse({...first,availability:{status:'available'}}).success,false);
});
test('capacity and dimensions enforce compatible unit families',()=>{
 const verification={source:'Technical sheet',checkedAt:'2026-10-15'};
 assert.equal(productSchema.safeParse({...first,status:'verified',verification,capacity:{value:10,unit:'mm',evidence:verification}}).success,false);
 assert.equal(productSchema.safeParse({...first,status:'verified',verification,dimensions:{height:{value:10,unit:'kg',evidence:verification}}}).success,false);
});
