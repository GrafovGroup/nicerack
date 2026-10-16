import type {MetadataRoute} from 'next';
import {categories,products} from '@/content/en/catalogue';
import {site} from '@/lib/site';
export default function sitemap():MetadataRoute.Sitemap{return ['','/categories','/products','/request-quote','/about','/services','/contact','/privacy','/terms',...categories.map(c=>`/categories/${c.slug}`),...products.map(p=>`/products/${p.slug}`)].map(path=>({url:site.url+path}));}
