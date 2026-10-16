import {regions,regionPath} from '@/lib/coverage';
import {frenchPaths,languageAlternates} from '@/lib/locale';
import type {MetadataRoute} from 'next';
import {categories,products} from '@/content/en/catalogue';
import {locations,guides} from '@/content/en/editorial';
import {site} from '@/lib/site';
export default function sitemap():MetadataRoute.Sitemap{return ['','/categories','/products','/request-quote','/about','/services','/contact','/privacy','/terms','/locations','/guides',...frenchPaths,...regions.map(r=>regionPath(r,'en')),...locations.map(p=>`/locations/${p.slug}`),...guides.map(p=>`/guides/${p.slug}`),...categories.map(c=>`/categories/${c.slug}`),...products.map(p=>`/products/${p.slug}`)].map(path=>({url:site.url+path,alternates:languageAlternates(path||'/')?{languages:Object.fromEntries(Object.entries(languageAlternates(path||'/')!).map(([lang,url])=>[lang,site.url+url]))}:undefined}));}
