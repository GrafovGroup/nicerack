import {notFound} from 'next/navigation';
import {allLocations,locations} from '@/content/en/editorial';
import {EditorialDetail} from '@/components/editorial';
import {metadata} from '@/lib/site';
export const dynamicParams=false;
export function generateStaticParams(){return locations.map(p=>({slug:p.slug}));}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}){
 const {slug}=await params,p=allLocations.find(p=>p.slug===slug);
 return p?{...metadata(p.title,p.description,`/locations/${p.slug}`),...(!p.published?{robots:{index:false,follow:false}}:{})}:{robots:{index:false,follow:false}};
}
export default async function LocationPage({params}:{params:Promise<{slug:string}>}){const {slug}=await params,p=locations.find(p=>p.slug===slug);if(!p)notFound();return <EditorialDetail item={p} kind="locations"/>;}
