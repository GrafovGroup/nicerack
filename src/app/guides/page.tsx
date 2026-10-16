import {guides} from '@/content/en/editorial';
import {categories} from '@/content/en/catalogue';
import {EditorialCard} from '@/components/editorial';
import {Breadcrumbs,PageIntro,Arrow} from '@/components/ui';
import {TrackedLink as Link} from '@/components/catalogue/tracked-link';
import {CallNow} from '@/components/call-now';
import {metadata as makeMetadata} from '@/lib/site';
export const metadata=makeMetadata('Rack buying guides and comparisons','Practical rack selection guides: compare storage approaches, prepare dimensions and identify the questions needed for a project quotation.','/guides');
export default function Guides(){return <div className="page-shell"><Breadcrumbs items={[{name:'Buying guides',path:'/guides'}]}/><PageIntro eyebrow="A BETTER BRIEF" title="Choose with the right questions."><p>Compare the way racks are used, understand fit questions and prepare useful details before requesting options.</p><div className="cta-actions"><Link className="button" href="/request-quote?source=%2Fguides">REQUEST A QUOTE <Arrow/></Link><CallNow/></div></PageIntro><nav className="division-nav" aria-label="Guide categories">{categories.map(c=><a key={c.id} href={'#'+c.id}>{c.name.toUpperCase()}</a>)}</nav>{categories.map(c=><section className="subsection" id={c.id} key={c.id}><h2>{c.name}</h2><div className="product-grid">{guides.filter(g=>g.categoryIds.includes(c.id)).map(g=><EditorialCard key={g.slug} item={g} kind="guides"/>)}</div></section>)}</div>;}
