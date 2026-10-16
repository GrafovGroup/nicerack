import {notFound} from 'next/navigation';
import {allGuides,guides} from '@/content/en/editorial';
import {EditorialDetail} from '@/components/editorial';
import {metadata} from '@/lib/site';
export const dynamicParams=false;
export function generateStaticParams(){return guides.map(p=>({slug:p.slug}));}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}){
 const {slug}=await params,p=allGuides.find(p=>p.slug===slug);
 return p?{...metadata(p.title,p.description,`/guides/${p.slug}`),...(!p.published?{robots:{index:false,follow:false}}:{})}:{robots:{index:false,follow:false}};
}
export default async function GuidePage({params}:{params:Promise<{slug:string}>}){const {slug}=await params,p=guides.find(p=>p.slug===slug);if(!p)notFound();return <EditorialDetail item={p} kind="guides"/>;}
