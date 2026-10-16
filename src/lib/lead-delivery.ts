import {spawn} from 'node:child_process';
import {createHash,randomUUID} from 'node:crypto';
import {mkdir,open,readFile,writeFile,unlink} from 'node:fs/promises';
import path from 'node:path';
import type {z} from 'zod';
import type {quoteSchema} from './quote';
export async function submitLead(data:z.infer<typeof quoteSchema>,ip:string){
 const root=process.env.LEAD_DATA_DIR;
 if(!root||process.env.QUOTE_DELIVERY_ENABLED!=='true')throw new Error('unconfigured');
 await mkdir(path.join(root,'rate'),{recursive:true,mode:0o700});
 const key=createHash('sha256').update(ip).digest('hex');
 const lock=path.join(root,'rate',key+'.lock');
 let handle;try{handle=await open(lock,'wx',0o600)}catch{throw new Error('rate')}
 try{
  const record=path.join(root,'rate',key+'.json');const now=Date.now();let hits:number[]=[];
  try{hits=JSON.parse(await readFile(record,'utf8'))}catch{}
  hits=hits.filter(t=>now-t<3600000);if(hits.length>=5)throw new Error('rate');
  await writeFile(record,JSON.stringify([...hits,now]),{mode:0o600});
 }finally{await handle.close();await unlink(lock)}
 const id=randomUUID();
 const recipient='info@nicerack.ca';
 const safeEmail=data.email.replace(/[\r\n]/g,'');
 const text=`NiceRack quote request ${id}\n\n${JSON.stringify(data,null,2)}`;
 const message=`From: NiceRack Website <website@nicerack.ca>\nTo: ${recipient}\nReply-To: ${safeEmail}\nSubject: NiceRack quote request ${id}\nMIME-Version: 1.0\nContent-Type: text/plain; charset=UTF-8\n\n${text}\n`;
 await new Promise<void>((resolve,reject)=>{
  const child=spawn('/usr/sbin/sendmail',['-i','-t','-f','website@nicerack.ca'],{stdio:['pipe','ignore','ignore']});
  const timer=setTimeout(()=>{child.kill();reject(new Error('delivery'))},15000);
  child.on('error',()=>{clearTimeout(timer);reject(new Error('delivery'))});
  child.on('close',code=>{clearTimeout(timer);if(code===0)resolve();else reject(new Error('delivery'))});
  child.stdin.on('error',()=>{});child.stdin.end(message);
 });
 return id;
}
