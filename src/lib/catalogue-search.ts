import {categories, products, subcategories} from '@/content/en/catalogue';
export type CatalogueQuery = {q?:string;category?:string;subcategory?:string;application?:string;sort?:string};
export function searchCatalogue(query:CatalogueQuery){
 const q=(query.q||'').trim().slice(0,120);
 const category=categories.some(c=>c.id===query.category)?query.category!:'';
 const subcategory=subcategories.some(s=>s.id===query.subcategory&&(!category||s.categoryId===category))?query.subcategory!:'';
 const available=products.filter(p=>(!category||p.categoryId===category)&&(!subcategory||p.subcategoryId===subcategory));
 const applications=[...new Set(available.flatMap(p=>p.applications))].sort();
 const application=applications.includes(query.application||'')?query.application!:'';
 const sort=query.sort==='name'?'name':'featured';
 const terms=q.toLocaleLowerCase('en-CA').split(/\s+/).filter(Boolean);
 const results=available.filter(p=>{
  if(application&&!p.applications.includes(application))return false;
  const group=categories.find(c=>c.id===p.categoryId);
  const text=[p.name,p.shortDescription,group?.name,...p.applications,...p.features].join(' ').toLocaleLowerCase('en-CA');
  return terms.every(term=>text.includes(term));
 });
 if(sort==='name')results.sort((a,b)=>a.name.localeCompare(b.name,'en-CA'));
 return {q,category,subcategory,application,applications,sort,results};
}
