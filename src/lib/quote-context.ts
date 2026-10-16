import type {Product} from '@/content/en/catalogue';
import {provinces} from '@/content/en/catalogue';
export type QueryValues=Record<string,string|string[]|undefined>;
const single=(q:QueryValues,key:string)=>typeof q[key]==='string'?q[key] as string:'';
export function quoteContext(q:QueryValues){
 const n=Number(single(q,'quantity'));
 return {quantity:Number.isInteger(n)&&n>=1&&n<=100000?n:1,city:single(q,'city').slice(0,100),province:provinces.find(p=>p===single(q,'province'))||'',installation:single(q,'installation')==='true',delivery:single(q,'delivery')==='true',source:single(q,'source').startsWith('/')&&!single(q,'source').startsWith('//')?single(q,'source').slice(0,200):'/request-quote'};
}
export function quoteHref(p:Product,q:QueryValues,source:string){
 const params=new URLSearchParams({category:p.categoryId,product:p.id,source});
 for(const key of ['quantity','city','province','installation','delivery','utm_source','utm_medium','utm_campaign','utm_content','utm_term']){const value=single(q,key);if(value)params.set(key,value.slice(0,200));}
 return '/request-quote?'+params;
}
