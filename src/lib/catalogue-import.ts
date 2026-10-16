import {z} from 'zod';
import {productSchema} from './product-schema';
import {subcategories} from '../content/en/catalogue';
// No write or publication occurs here. Supplier-private records are stored separately.
export function validateCatalogueImport(input:unknown) {
 const rows=z.array(productSchema).parse(input);
 const ids=new Set<string>(), slugs=new Set<string>(), images=new Set<string>();
 for(const row of rows){
  if(ids.has(row.id)||slugs.has(row.slug))throw new Error('Duplicate product ID or slug.');
  ids.add(row.id);slugs.add(row.slug);
  if(!subcategories.some(s=>s.id===row.subcategoryId&&s.categoryId===row.categoryId))throw new Error('Subcategory does not belong to category.');
  for(const image of row.images){if(images.has(image.src))throw new Error('Duplicate image placement.');images.add(image.src);}
 }
 return rows;
}
