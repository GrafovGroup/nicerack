import {createHash,randomUUID} from 'node:crypto';
import {mkdir,open,readFile,writeFile,unlink,rename} from 'node:fs/promises';
import path from 'node:path';
import {quoteSchema} from './quote';
import {categories,products} from '../content/en/catalogue';
import type {z} from 'zod';
export type Enquiry=z.infer<typeof quoteSchema>;
export const formspreeEndpoint='https://formspree.io/f/mqpewdbw';
export function formatEnquiry(data:Enquiry,id:string){
 return {
  name:data.name,email:data.email,company:data.company,phone:data.phone,
  city:data.city,province:data.province,
  category:categories.find(c=>c.id===data.category)?.name||data.category,
  product:products.find(p=>p.id===data.product)?.name||'Help me choose',
  quantity:data.quantity??'Not specified',message:data.details,
  delivery:data.delivery?'Yes':'No',installation:data.installation?'Yes':'No',
  privacy_consent:'Yes',locale:data.locale||'en',source_page:data.source.page,
  source_category:data.source.category,source_product:data.source.product,
  campaign:JSON.stringify(data.source.utm),reference:id,
  _subject:`NiceRack enquiry ${id}`,
 };
}
export type FormspreePayload=ReturnType<typeof formatEnquiry>;
export async function sendMessage(payload:FormspreePayload,transport:typeof fetch=fetch,timeoutMs=15000){
 try{
  const response=await transport(formspreeEndpoint,{
   method:'POST',headers:{'Content-Type':'application/json',Accept:'application/json'},
   body:JSON.stringify(payload),signal:AbortSignal.timeout(timeoutMs),redirect:'error',
  });
  if(!response.ok)throw new Error('delivery');
  const result:unknown=await response.json();
  if(!result||typeof result!=='object'||'errors' in result||'error' in result||!('next' in result)||typeof result.next!=='string')throw new Error('delivery');
 }catch{throw new Error('delivery');}
}
export async function takeRateSlot(root:string,key:string,limit:number,now=Date.now()){
 const dir=path.join(root,'rate');await mkdir(dir,{recursive:true,mode:0o700});
 const hash=createHash('sha256').update(key).digest('hex');
 const file=path.join(dir,hash+'.json'),lock=path.join(dir,hash+'.lock');
 let handle;try{handle=await open(lock,'wx',0o600);}catch{throw new Error('rate');}
 const temporary=file+'.'+randomUUID()+'.tmp';
 try{
  let hits:number[]=[];
  try{const parsed:unknown=JSON.parse(await readFile(file,'utf8'));if(!Array.isArray(parsed)||!parsed.every(t=>typeof t==='number'&&Number.isFinite(t)))throw new Error('corrupt');hits=parsed;}catch(error){if((error as NodeJS.ErrnoException).code!=='ENOENT')throw error;}
  hits=hits.filter(t=>now-t<3600000);if(hits.length>=limit)throw new Error('rate');
  await writeFile(temporary,JSON.stringify([...hits,now]),{mode:0o600});await rename(temporary,file);
 }finally{await handle.close();await unlink(lock);await unlink(temporary).catch(()=>{});}
}
export function createLeadSubmitter(options:{root?:string;enabled:boolean;send?:(message:FormspreePayload)=>Promise<void>}){
 return async(input:Enquiry,ip:string)=>{
  if(!options.root||!options.enabled)throw new Error('unconfigured');
  const data=quoteSchema.parse(input);
  await takeRateSlot(options.root,'email:'+data.email.toLowerCase(),5);
  if(ip!=='unknown')await takeRateSlot(options.root,'ip:'+ip,20);
  const id=randomUUID();await (options.send||sendMessage)(formatEnquiry(data,id));return id;
 };
}
export async function submitLead(data:Enquiry,ip:string){return createLeadSubmitter({root:process.env.LEAD_DATA_DIR,enabled:process.env.QUOTE_DELIVERY_ENABLED==='true'})(data,ip);}
