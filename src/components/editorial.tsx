import {regions,regionPath} from '@/lib/coverage';
import {TrackedLink as Link} from '@/components/catalogue/tracked-link';
import {Arrow,Breadcrumbs,PageIntro,ProductCard} from '@/components/ui';
import {CallNow} from '@/components/call-now';
import {categories,products} from '@/content/en/catalogue';
import {guides,editorialQuoteHref,type Guide,type Location} from '@/content/en/editorial';

export function EditorialCard({item,kind}:{item:Guide|Location;kind:'guides'|'locations'}){
 return <Link className="product-card editorial-card" href={`/${kind}/${item.slug}`}><span className="eyebrow">{'province' in item?item.province:'BUYING GUIDE'}</span><h3>{item.title}</h3><p>{item.intent}</p><span className="text-link">READ {kind==='guides'?'GUIDE':'CITY PLANNING NOTES'} <Arrow/></span></Link>;
}
export function GuideLinks({categoryId,productSlug}:{categoryId?:string;productSlug?:string}){
 const relevant=guides.filter(g=>productSlug?g.productSlugs.includes(productSlug):g.categoryIds.includes(categoryId||''));
 if(!relevant.length)return null;
 return <section className="subsection"><h2>Plan before you choose</h2><div className="product-grid">{relevant.slice(0,3).map(g=><EditorialCard key={g.slug} item={g} kind="guides"/>)}</div><p><Link className="text-link" href="/guides">ALL BUYING GUIDES <Arrow/></Link></p></section>;
}
export function EditorialDetail({item,kind}:{item:Guide|Location;kind:'guides'|'locations'}){
 const city='name' in item;
 return <div className="page-shell editorial-page"><Breadcrumbs items={[{name:city?'Canadian locations':'Buying guides',path:`/${kind}`},{name:city?item.name:item.title,path:`/${kind}/${item.slug}`}]}/>
  <PageIntro eyebrow={city?`${item.province} · PROJECT PLANNING`:'BUYING GUIDE'} title={item.title}><p>{item.intro}</p><div className="cta-actions"><Link href={editorialQuoteHref(item)} className="button">REQUEST A QUOTE <Arrow/></Link><CallNow className="button secondary call-now"/></div></PageIntro>
  {city&&<p className="editorial-context">Local context: {item.sources.map(s=><a key={s.url} href={s.url}>{s.label}</a>)}. The planning questions below apply this context to a possible purchasing task.</p>}
  {city&&<p className="coverage-city-back"><Link className="text-link" href={regionPath(regions.find(r=>r.name===item.province)!,'en')}>EXPLORE {item.province.toUpperCase()} & SURROUNDING COMMUNITIES <Arrow/></Link></p>}
  <div className="editorial-layout"><article className="editorial-copy">{item.sections.map((s,i)=><section id={`section-${i+1}`} key={s.title}><h2>{s.title}</h2><p>{s.body}</p></section>)}<section><h2>{city?'A useful brief for this project':'Bring these details to your quote'}</h2><ul>{item.checklist.map(c=><li key={c}>{c}</li>)}</ul></section><section><h2>Planning question</h2><div className="faqs">{item.faqs.map(f=><details key={f.question}><summary>{f.question}<span>+</span></summary><p>{f.answer}</p></details>)}</div></section></article>
   <aside className="soft-panel editorial-aside"><span className="eyebrow">YOUR NEXT STEP</span><h2>Make the brief specific.</h2><p>{city?'Include the actual destination, receiving access and the items you need to store. Sourcing, delivery and installation depend on configuration, location and confirmed availability.':'Share the equipment, intended use and site conditions so the proposed configuration can be assessed.'}</p><Link className="button" href={editorialQuoteHref(item)}>REQUEST A QUOTE <Arrow/></Link><CallNow className="call-now product-call"/><h3>Explore categories</h3><ul>{categories.filter(c=>item.categoryIds.includes(c.id)).map(c=><li key={c.id}><Link href={`/categories/${c.slug}`}>{c.name}</Link></li>)}</ul></aside></div>
  <section className="subsection"><h2>Rack types to compare</h2><div className="product-grid">{item.productSlugs.map(slug=>{const p=products.find(p=>p.slug===slug)!;return <ProductCard key={p.id} product={p}/>;})}</div></section>
  {item.guideSlugs.length>0&&<section className="subsection"><h2>{city?'Read before requesting options':'Related buying guides'}</h2><div className="product-grid">{item.guideSlugs.map(slug=><EditorialCard key={slug} item={guides.find(g=>g.slug===slug)!} kind="guides"/>)}</div></section>}
  {!city&&<section className="editorial-context"><h2>Further reading</h2><ul>{item.sources.map(s=><li key={s.url}><a href={s.url}>{s.label}</a></li>)}</ul></section>}
  <p className="small">Planning notes reviewed {item.updatedAt}. <Link href={city?'/locations':'/guides'}>{city?'ALL CANADIAN LOCATION NOTES':'ALL BUYING GUIDES'}</Link></p>
 </div>;
}
