import {spawn,type ChildProcessWithoutNullStreams} from 'node:child_process';
import {createHash,randomUUID} from 'node:crypto';
import {mkdir,open,readFile,writeFile,unlink,rename} from 'node:fs/promises';
import path from 'node:path';
import {quoteSchema} from './quote';
import {categories,products} from '../content/en/catalogue';
import type {z} from 'zod';
export type Enquiry=z.infer<typeof quoteSchema>;
export const recipient='info@nicerack.ca';
const sender='website@nicerack.ca';
type MailProcess=Pick<ChildProcessWithoutNullStreams,'stdin'|'on'|'kill'>;
export function sendMessage(message:string,start:()=>MailProcess=()=>spawn('/usr/sbin/sendmail',['-i','-t','-f',sender],{stdio:['pipe','ignore','ignore']}) as unknown as MailProcess,timeoutMs=15000){
 return new Promise<void>((resolve,reject)=>{
  const child=start();let settled=false;
  const finish=(error?:Error)=>{if(settled)return;settled=true;clearTimeout(timer);if(error)reject(error);else resolve();};
  const timer=setTimeout(()=>{finish(new Error('delivery'));child.kill();},timeoutMs);
  child.on('error',()=>finish(new Error('delivery')));
  child.on('close',code=>finish(code===0?undefined:new Error('delivery')));
  child.stdin.on('error',()=>finish(new Error('delivery')));
  child.stdin.end(message);
 });
}
export function formatEnquiry(data:Enquiry,id:string){
 const category=categories.find(c=>c.id===data.category)?.name||data.category;
 const product=products.find(p=>p.id===data.product)?.name||'Help me choose';
 const lines=[`NiceRack enquiry ${id}`,`Name: ${data.name}`,`Company: ${data.company||'Not specified'}`,`Email: ${data.email}`,`Phone: ${data.phone}`,`Location: ${data.city}, ${data.province}`,`Category: ${category}`,`Rack type: ${product}`,`Quantity: ${data.quantity??'Not specified'}`,`Delivery requested: ${data.delivery?'Yes':'No'}`,`Installation assessment requested: ${data.installation?'Yes':'No'}`,'Privacy consent: Yes','',data.details,'',`Source: ${data.source.page}`,`Page language: ${data.locale==='fr'?'French (Canada)':'English (Canada)'}`,`Campaign: ${JSON.stringify(data.source.utm)}`];
 return `From: NiceRack Website <${sender}>\nTo: ${recipient}\nReply-To: ${data.email.replace(/[\r\n]/g,'')}\nSubject: NiceRack enquiry ${id}\nMIME-Version: 1.0\nContent-Type: text/plain; charset=UTF-8\nContent-Transfer-Encoding: 8bit\n\n${lines.join('\n')}\n`;
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
export function createLeadSubmitter(options:{root?:string;enabled:boolean;send?:(message:string)=>Promise<void>}){
 return async(input:Enquiry,ip:string)=>{
  if(!options.root||!options.enabled)throw new Error('unconfigured');
  const data=quoteSchema.parse(input);
  await takeRateSlot(options.root,'email:'+data.email.toLowerCase(),5);
  if(ip!=='unknown')await takeRateSlot(options.root,'ip:'+ip,20);
  const id=randomUUID();await (options.send||sendMessage)(formatEnquiry(data,id));return id;
 };
}
export async function submitLead(data:Enquiry,ip:string){return createLeadSubmitter({root:process.env.LEAD_DATA_DIR,enabled:process.env.QUOTE_DELIVERY_ENABLED==='true'})(data,ip);}
