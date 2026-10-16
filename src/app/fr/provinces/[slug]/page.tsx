import {notFound} from 'next/navigation';
import {CoveragePage} from '@/components/coverage-page';
import {regions,regionPath} from '@/lib/coverage';
import {metadata} from '@/lib/site';
export const dynamicParams=false;
export function generateStaticParams(){return regions.map(r=>({slug:r.slugFr}));}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const r=regions.find(r=>r.slugFr===slug);return r?metadata(`Supports et rangement : ${r.nameFr}`,r.introFr,regionPath(r,'fr')):{};}
export default async function RegionPage({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const r=regions.find(r=>r.slugFr===slug);if(!r)notFound();return <CoveragePage locale="fr" region={r}/>;}
