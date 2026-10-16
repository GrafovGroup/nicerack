import test from 'node:test';
import assert from 'node:assert/strict';
import {quoteContext,quoteHref} from '../src/lib/quote-context';
import {products} from '../src/content/en/catalogue';
test('quote links encode product, source and campaign context',()=>{
 const link=new URL(quoteHref(products[0],{quantity:'3',city:'Québec & area',province:'Quebec',delivery:'true',installation:'true',utm_campaign:'warehouse & stock'},'/compare'),'https://nicerack.ca');
 assert.equal(link.searchParams.get('product'),products[0].id);assert.equal(link.searchParams.get('utm_campaign'),'warehouse & stock');
 const context=quoteContext(Object.fromEntries(link.searchParams));assert.equal(context.quantity,3);assert.equal(context.city,'Québec & area');assert.equal(context.delivery,true);assert.equal(context.installation,true);assert.equal(context.source,'/compare');
});
test('quote prefill normalizes invalid quantity, province and source',()=>{
 const context=quoteContext({quantity:'-5',province:'Atlantis',source:'//external.example',delivery:'yes'});
 assert.equal(context.quantity,undefined);assert.equal(context.province,'');assert.equal(context.source,'/request-quote');assert.equal(context.delivery,false);
});
