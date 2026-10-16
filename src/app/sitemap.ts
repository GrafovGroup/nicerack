import type {MetadataRoute} from 'next';
import {categories,products} from '@/content/en/catalogue';
import {locations,guides} from '@/content/en/editorial';
import {site} from '@/lib/site';
export default function sitemap():MetadataRoute.Sitemap{return ['','/categories','/products','/request-quote','/about','/services','/contact','/privacy','/terms','/locations','/guides',...locations.map(p=>`/locations/${p.slug}`),...guides.map(p=>`/guides/${p.slug}`),...categories.map(c=>`/categories/${c.slug}`),...products.map(p=>`/products/${p.slug}`)].map(path=>({url:site.url+path}));}
