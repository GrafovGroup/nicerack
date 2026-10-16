import {notFound} from 'next/navigation';
import {CoveragePage} from '@/components/coverage-page';
import {regions,regionPath} from '@/lib/coverage';
import {metadata} from '@/lib/site';
export const dynamicParams=false;
export function generateStaticParams(){return regions.map(r=>({slug:r.slug}));}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const r=regions.find(r=>r.slug===slug);return r?metadata(`Racks & storage in ${r.name}`,r.intro,regionPath(r,'en')):{};}
export default async function RegionPage({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const r=regions.find(r=>r.slug===slug);if(!r)notFound();return <CoveragePage region={r}/>;}
