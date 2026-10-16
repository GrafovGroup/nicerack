import test from 'node:test';
import assert from 'node:assert/strict';
import {mkdtemp,readdir,readFile,rm} from 'node:fs/promises';
import {tmpdir} from 'node:os';
import path from 'node:path';
import {NextRequest} from 'next/server';
import {createLeadSubmitter,sendMessage,takeRateSlot,formatEnquiry,formspreeEndpoint,type FormspreePayload} from '../src/lib/lead-delivery';
import {createEnquiryHandler} from '../src/lib/enquiry-handler';
import {quoteSchema} from '../src/lib/quote';
const valid={name:'Test Customer',company:'',email:'test@example.com',phone:'4165550100',province:'Ontario' as const,city:'Toronto',category:'industrial',product:'type-pallet-racking',details:'Storage for boxed materials and pallets.',installation:false,delivery:true,consent:true as const,website:'',source:{page:'/products/type-pallet-racking',category:'industrial',product:'type-pallet-racking',utm:{utm_source:'test'}}};
const request=(data:unknown=valid,headers:Record<string,string>={})=>new NextRequest('http://localhost/api/quote',{method:'POST',headers:{'Content-Type':'application/json',...headers},body:JSON.stringify(data)});
test('quantity is optional, but zero and fractional quantities are rejected',()=>{assert.equal(quoteSchema.safeParse(valid).success,true);for(const quantity of [0,1.5])assert.equal(quoteSchema.safeParse({...valid,quantity}).success,false);});
test('success waits for transport acceptance and preserves enquiry context',async()=>{
 let accept!:()=>void;let captured:unknown;const handler=createEnquiryHandler(async data=>{captured=data;await new Promise<void>(resolve=>{accept=resolve;});return 'test-reference';});
 let finished=false;const pending=handler(request()).then(response=>{finished=true;return response;});
 await new Promise(resolve=>setImmediate(resolve));assert.equal(finished,false);assert.deepEqual(captured,valid);accept();const response=await pending;assert.equal(response.status,200);assert.equal(response.headers.get('cache-control'),'no-store');assert.match((await response.json()).message,/accepted for delivery/);
});
test('transport failure and throttling cannot return success',async()=>{for(const [reason,status] of [['delivery',503],['rate',429]] as const){const response=await createEnquiryHandler(async()=>{throw new Error(reason);})(request());assert.equal(response.status,status);assert.equal((await response.json()).reference,undefined);}});
test('spam, cross-site and wrong content type never reach transport',async()=>{let calls=0;const handler=createEnquiryHandler(async()=>{calls++;return 'no';});assert.equal((await handler(request({...valid,website:'spam'}))).status,422);assert.equal((await handler(request(valid,{'sec-fetch-site':'cross-site'}))).status,403);assert.equal((await handler(request(valid,{'Content-Type':'text/plain'}))).status,415);assert.equal(calls,0);});
test('submitter formats Formspree context and stores only hashed counters',async()=>{
 const root=await mkdtemp(path.join(tmpdir(),'nicerack-test-'));try{const messages:FormspreePayload[]=[];const submit=createLeadSubmitter({root,enabled:true,send:async message=>{messages.push(message);}});const reference=await submit(valid,'unknown');assert.match(reference,/^[a-f0-9-]{36}$/);assert.equal(messages[0].email,valid.email);assert.equal(messages[0].quantity,'Not specified');assert.equal(messages[0].source_page,valid.source.page);assert.match(messages[0].campaign,/utm_source/);for(let i=0;i<4;i++)await submit(valid,'unknown');await assert.rejects(submit(valid,'unknown'),/rate/);assert.equal(messages.length,5);const files=await readdir(path.join(root,'rate'));assert.equal(files.length,1);assert.match(files[0],/^[a-f0-9]{64}\.json$/);const stored=JSON.parse(await readFile(path.join(root,'rate',files[0]),'utf8'));assert.ok(stored.every((value:unknown)=>typeof value==='number'));}finally{await rm(root,{recursive:true,force:true});}
});
test('rate slots expire and concurrent requests cannot exceed the limit',async()=>{const root=await mkdtemp(path.join(tmpdir(),'nicerack-rate-'));try{await takeRateSlot(root,'key',1,1);await assert.rejects(takeRateSlot(root,'key',1,2),/rate/);await takeRateSlot(root,'key',1,3600002);const results=await Promise.allSettled(Array.from({length:5},()=>takeRateSlot(root,'parallel',1)));assert.equal(results.filter(r=>r.status==='fulfilled').length,1);}finally{await rm(root,{recursive:true,force:true});}});
test('disabled delivery never invokes transport',async()=>{let sent=false;await assert.rejects(createLeadSubmitter({enabled:false,send:async()=>{sent=true;}})(valid,'unknown'),/unconfigured/);assert.equal(sent,false);});
test('Formspree sends JSON to the fixed endpoint and requires explicit acceptance',async()=>{
 const payload=formatEnquiry({...valid,locale:'fr'},'reference');
 await sendMessage(payload,async(url,options)=>{
  assert.equal(url,formspreeEndpoint);assert.equal(options?.method,'POST');
  assert.equal(options?.redirect,'error');assert.ok(options?.signal);
  assert.deepEqual(JSON.parse(options?.body as string),payload);
  assert.equal(payload.locale,'fr');assert.equal(payload.privacy_consent,'Yes');
  return Response.json({next:'/thanks'});
 });
 for(const reply of [Response.json({ok:false}),Response.json({next:'/thanks',errors:[{message:'failed'}]}),Response.json({}),new Response('bad'),Response.json({ok:true},{status:429}),Response.json({error:'failed'},{status:503})]){
  await assert.rejects(sendMessage(payload,async()=>reply),/delivery/);
 }
 await assert.rejects(sendMessage(payload,async()=>{throw new Error('network');}),/delivery/);
 await assert.rejects(sendMessage(payload,async(_url,options)=>new Promise((_resolve,reject)=>{options?.signal?.addEventListener('abort',()=>reject(new Error('timeout')));setTimeout(()=>reject(new Error('fallback')),30);}),1),/delivery/);
});
