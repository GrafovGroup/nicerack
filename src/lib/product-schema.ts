import {z} from 'zod';
export const categoryIds = ['industrial','automotive','garage','retail','fitness','hospitality','technology','events'] as const;
const id = z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
const text = z.string().trim().min(1).max(2000);
const evidence = z.object({source:text, checkedAt:z.iso.date()}).strict();
const measurement = z.object({value:z.number().positive(),unit:z.enum(['mm','cm','m','in','U']),evidence}).strict();
const capacity = z.object({value:z.number().positive(),unit:z.enum(['kg','lb']),evidence}).strict();
export const productSchema = z.object({
 id,slug:id,name:text,categoryId:z.enum(categoryIds),subcategoryId:id,
 shortDescription:text,detailedDescription:text,applications:z.array(text).min(1),features:z.array(text),
 specifications:z.array(z.object({name:text,value:text,unit:z.string().max(30),evidence}).strict()),
 material:text.optional(),dimensions:z.object({width:measurement.optional(),depth:measurement.optional(),height:measurement.optional()}).strict().optional(),
 capacity:capacity.optional(),images:z.array(z.object({src:z.string().regex(/^\/images\/[a-zA-Z0-9/_-]+\.(webp|png|jpg|jpeg|avif)$/),alt:text,source:text}).strict()),
 availability:z.object({status:z.enum(['available','made-to-order','unavailable']),evidence}).strict().optional(),
 leadTime:z.object({text,evidence}).strict().optional(),pricingMode:z.literal('quote'),
 status:z.enum(['example-type','verified']),published:z.boolean(),updatedAt:z.iso.date(),
 verification:evidence.optional(),sku:text.optional(),
}).strict().superRefine((p,ctx)=>{
 if(p.status==='verified'&&!p.verification)ctx.addIssue({code:'custom',path:['verification'],message:'Verified products require a source and check date.'});
 if(p.status==='example-type'&&(p.sku||p.material||p.capacity||p.dimensions||p.availability||p.leadTime||p.specifications.length))ctx.addIssue({code:'custom',message:'Generic rack types cannot carry unverified product specifications.'});
});
export type CatalogueProduct = z.infer<typeof productSchema>;
export const privateSupplierSchema = z.object({productId:id,supplierReference:text}).strict();
