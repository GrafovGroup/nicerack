import test from 'node:test';
import assert from 'node:assert/strict';
import {quoteSchema} from '../src/lib/quote';
const valid={name:'Example Customer',company:'',email:'customer@example.com',phone:'4165550100',province:'Ontario',city:'Toronto',category:'industrial',product:'type-pallet-racking',quantity:2,details:'We need storage for boxed materials.',installation:true,delivery:false,consent:true,website:'',source:{page:'/request-quote',category:'industrial',product:'type-pallet-racking',utm:{utm_source:'test'}}};
test('accepts a valid project without inventing unknown specifications',()=>assert.equal(quoteSchema.safeParse(valid).success,true));
test('rejects category-product mismatch',()=>assert.equal(quoteSchema.safeParse({...valid,category:'automotive'}).success,false));
test('rejects missing consent, spam, bad email, quantity and short brief',()=>{for(const change of [{consent:false},{website:'https://spam.example'},{email:'bad'},{quantity:0},{quantity:1.2},{details:'short'},{province:'Atlantis'},{phone:'abc'}])assert.equal(quoteSchema.safeParse({...valid,...change}).success,false);});
test('permits a category enquiry with no selected product',()=>assert.equal(quoteSchema.safeParse({...valid,product:''}).success,true));
test('bounds source metadata',()=>assert.equal(quoteSchema.safeParse({...valid,source:{...valid.source,utm:{utm_source:'a'.repeat(201)}}}).success,false));
