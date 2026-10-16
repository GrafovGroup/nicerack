import {categories} from '@/content/en/catalogue';
import {Breadcrumbs,PageIntro,CategoryCard,QuoteCTA} from '@/components/ui';
import {metadata as makeMetadata} from '@/lib/site';
export const metadata=makeMetadata('Rack categories','Explore eight rack and storage categories for industrial, automotive, home, retail, fitness, hospitality, IT and events.','/categories');
export default function Categories(){return <><div className="page-shell"><Breadcrumbs items={[{name:'Categories',path:'/categories'}]}/><PageIntro eyebrow="EIGHT CATEGORIES. ENDLESS POSSIBILITIES." title="Find your kind of rack."><p>Start with your space. Explore rack types, compare uses and tell us what you need to achieve.</p></PageIntro><div className="category-grid">{categories.map((c,i)=><CategoryCard key={c.id} category={c} index={i}/>)}</div></div><QuoteCTA/></>}
