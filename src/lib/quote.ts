import {z} from 'zod';
import {categories,products,provinces} from '../content/en/catalogue';
const text=(min:number,max:number)=>z.string().trim().min(min).max(max);
export const quoteSchema=z.object({
 name:text(2,100),company:text(0,150).default(''),email:z.string().trim().email().max(254),
 phone:z.string().trim().max(40).refine(v=>v.replace(/\D/g,'').length>=7&&v.replace(/\D/g,'').length<=15,'Enter a valid phone number.'),
 province:z.enum(provinces),city:text(2,100),category:z.string().refine(v=>categories.some(c=>c.id===v),'Choose a category.'),
 product:z.string().max(100).default(''),quantity:z.number().int().min(1).max(100000),details:text(20,5000),
 installation:z.boolean(),delivery:z.boolean(),consent:z.literal(true),website:z.string().max(0),
 source:z.object({page:text(1,200),category:text(0,100),product:text(0,100),utm:z.record(z.string().max(50),z.string().max(200))})
}).superRefine((v,ctx)=>{if(v.product&&!products.some(p=>p.id===v.product&&p.categoryId===v.category))ctx.addIssue({code:'custom',path:['product'],message:'Choose a product in the selected category.'});});
