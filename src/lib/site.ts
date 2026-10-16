import {languageAlternates} from './locale';
import type {Metadata} from 'next';
export const site = {name:'NiceRack.ca',url:process.env.NEXT_PUBLIC_SITE_URL || 'https://nicerack.ca',email:'info@nicerack.ca',phone:'(833) 696-9996',tel:'+18336969996'};
export function metadata(title:string,description:string,path:string):Metadata{return {title,description,alternates:{canonical:path,languages:languageAlternates(path)},openGraph:{title:`${title} | NiceRack.ca`,description,url:path,type:'website',locale:path.startsWith('/fr')?'fr_CA':'en_CA'}};}
export const copy = {en:{tagline:'Every Rack. Every Space.',quote:'REQUEST A QUOTE',browse:'EXPLORE RACKS'}};
