import {products} from '@/content/en/catalogue';
export function compareProducts(ids:string[]){
 const unique=[...new Set(ids.filter(Boolean))];
 if(unique.length>3)return {items:[],error:'Choose no more than three rack types.'};
 const items=unique.map(id=>products.find(p=>p.id===id));
 if(items.some(p=>!p))return {items:[],error:'One of these rack types is not available in the catalogue.'};
 const found=items.filter(p=>p!==undefined);
 if(new Set(found.map(p=>p.categoryId)).size>1)return {items:[],error:'Choose rack types from the same division for a useful comparison.'};
 return {items:found,error:''};
}
