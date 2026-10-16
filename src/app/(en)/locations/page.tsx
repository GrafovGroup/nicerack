import {locations} from '@/content/en/editorial';
import {EditorialCard} from '@/components/editorial';
import {Breadcrumbs,PageIntro,Arrow} from '@/components/ui';
import {TrackedLink as Link} from '@/components/catalogue/tracked-link';
import {CallNow} from '@/components/call-now';
import {metadata as makeMetadata} from '@/lib/site';
export const metadata=makeMetadata('Canadian rack planning by city','Local purchasing context, receiving questions and relevant rack guides for projects in 21 Canadian cities.','/locations');
export default function Locations(){const provinces=[...new Set(locations.map(p=>p.province))];return <div className="page-shell"><Breadcrumbs items={[{name:'Canadian locations',path:'/locations'}]}/><PageIntro eyebrow="START WITH THE DESTINATION" title="Plan around your place."><p>Explore city-specific purchasing notes, from receiving access to the equipment and materials you store. Availability, delivery and installation are assessed for the actual project.</p><div className="cta-actions"><Link className="button" href="/request-quote?source=%2Flocations">REQUEST A QUOTE <Arrow/></Link><CallNow/></div></PageIntro><nav className="division-nav" aria-label="Provinces">{provinces.map(p=><a key={p} href={'#'+p.toLowerCase().replaceAll(' ','-')}>{p.toUpperCase()}</a>)}</nav>{provinces.map(p=><section className="subsection" id={p.toLowerCase().replaceAll(' ','-')} key={p}><h2>{p}</h2><div className="product-grid">{locations.filter(l=>l.province===p).map(l=><EditorialCard key={l.slug} item={l} kind="locations"/>)}</div></section>)}</div>;}
