import {CoveragePage} from '@/components/coverage-page';
import {metadata as makeMetadata} from '@/lib/site';
export const metadata=makeMetadata('Racks and storage across Canada | Cities & provinces','Find racks and storage by province, territory, major city and surrounding community. Prepare a quote with delivery and installation details for your address.','/locations');
export default function Locations(){return <CoveragePage/>;}
