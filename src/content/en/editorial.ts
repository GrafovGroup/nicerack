import {z} from 'zod';
import guideData from './guides.json';
import locationData from './locations.json';
import {categories,products,provinces} from './catalogue';
const slug=z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
const text=z.string().trim().min(1);
const common={slug,title:text,description:text,intent:text,published:z.boolean(),updatedAt:z.iso.date(),intro:text,
 sections:z.array(z.object({title:text,body:text}).strict()).min(2),checklist:z.array(text).min(3),
 faqs:z.array(z.object({question:text,answer:text}).strict()).min(1),
 categoryIds:z.array(text).min(1),productSlugs:z.array(slug).min(1),guideSlugs:z.array(slug),
 sources:z.array(z.object({label:text,url:z.url().startsWith('https://')}).strict()).min(1)};
export const guideSchema=z.object(common).strict();
export const locationSchema=z.object({...common,name:text,province:z.enum(provinces)}).strict();
export type Guide=z.infer<typeof guideSchema>;
export type Location=z.infer<typeof locationSchema>;
export const allGuides=guideSchema.array().parse(guideData);
export const allLocations=locationSchema.array().parse(locationData);
export function publishedEditorial<T extends {published:boolean}>(items:T[]){return items.filter(p=>p.published);}
export const guides=publishedEditorial(allGuides);
export const locations=publishedEditorial(allLocations);
export function validateEditorialLinks(items:(Guide|Location)[],availableGuides:Guide[]=guides){
 const errors:string[]=[];
 for(const item of items){
  for(const id of item.categoryIds)if(!categories.some(c=>c.id===id))errors.push(`${item.slug}: missing category ${id}`);
  for(const slug of item.productSlugs)if(!products.some(p=>p.slug===slug))errors.push(`${item.slug}: missing published product ${slug}`);
  for(const slug of item.guideSlugs)if(slug===item.slug||!availableGuides.some(g=>g.slug===slug&&g.published))errors.push(`${item.slug}: invalid related guide ${slug}`);
 }
 for(const field of ['slug','title','description'] as const)if(new Set(items.map(p=>p[field])).size!==items.length)errors.push(`Duplicate editorial ${field}`);
 return errors;
}
const errors=validateEditorialLinks([...guides,...locations]);
if(errors.length)throw new Error(errors.join('\n'));
export function editorialQuoteHref(item:Guide|Location){
 const location='name' in item;
 const query=new URLSearchParams({source:`/${location?'locations':'guides'}/${item.slug}`});
 if(location){query.set('city',item.name);query.set('province',item.province);}
 else query.set('category',item.categoryIds[0]);
 return '/request-quote?'+query;
}
