import type {Product} from '../content/en/catalogue';
/** Prefer the same storage family, then shared uses, without crossing divisions. */
export function relatedProducts(product:Product,catalogue:Product[],limit=3){
 const score=(candidate:Product)=>(candidate.subcategoryId===product.subcategoryId?10:0)+candidate.applications.filter(a=>product.applications.includes(a)).length;
 return catalogue.filter(p=>p.published&&p.categoryId===product.categoryId&&p.id!==product.id).sort((a,b)=>score(b)-score(a)||a.name.localeCompare(b.name,'en-CA')).slice(0,limit);
}
