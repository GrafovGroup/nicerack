import {FilterForm} from '@/components/catalogue/filter-form';
import {ComparePicker} from '@/components/catalogue/compare-picker';
import {TrackedLink as Link} from '@/components/catalogue/tracked-link';
import {categories,subcategories} from '@/content/en/catalogue';
import {Breadcrumbs,PageIntro,QuoteCTA} from '@/components/ui';
import {metadata as makeMetadata} from '@/lib/site';
import {searchCatalogue} from '@/lib/catalogue-search';
export const metadata=makeMetadata('Explore racks & accessories','Explore racks, accessories and the information needed to request a configuration-specific quotation.','/products');
type SearchParams = Record<string, string | string[] | undefined>;
const first = (value: string | string[] | undefined) => Array.isArray(value) ? value[0] : value;
export default async function Products({searchParams}: {searchParams: Promise<SearchParams>}) {
  const params = await searchParams;
  const {q, category, subcategory, application, applications, sort, results} = searchCatalogue({q:first(params.q), category:first(params.category), subcategory:first(params.subcategory),application:first(params.application),sort:first(params.sort)});
  const filtered = Boolean(q || category || subcategory || application);
  return <><div className="page-shell">
    <Breadcrumbs items={[{name:'Products',path:'/products'}]}/>
    <PageIntro eyebrow="THE RIGHT STARTING POINT" title="Built around what you store."><p>Explore racks and smaller accessories across our eight categories. Final configurations, compatibility and sourcing are established through a project quotation.</p></PageIntro>
    <div className="cta-actions"><Link className="text-link" href="/products?application=Rack%20accessories">EXPLORE RACK ACCESSORIES</Link><Link className="text-link" href="/services#accessory-matching">GET HELP MATCHING A PART</Link></div><nav className="division-nav" aria-label="Catalogue divisions">{categories.map(c=><Link key={c.id} href={`/products?category=${c.id}`} aria-current={c.id===category?'page':undefined}>{c.name.toUpperCase()}</Link>)}</nav>
    <FilterForm key={'filters:'+JSON.stringify([q, category, subcategory, application, sort])} action="/products" method="get" className="catalogue-filters" role="search" aria-label="Find racks and accessories">
      {['utm_source','utm_medium','utm_campaign','utm_content','utm_term'].map(key=>first(params[key])?<input key={key} type="hidden" name={key} value={first(params[key])!.slice(0,200)}/>:null)}
      <div><label htmlFor="catalogue-search">Search racks and accessories</label><input id="catalogue-search" name="q" type="search" defaultValue={q} maxLength={120} placeholder="Try casters, cable or pallet"/></div>
      <div><label htmlFor="catalogue-category">Category</label><select id="catalogue-category" name="category" defaultValue={category}><option value="">All categories</option>{categories.map(item=><option key={item.id} value={item.id}>{item.name}</option>)}</select></div>
      <div><label htmlFor="catalogue-subcategory">Subcategory</label><select id="catalogue-subcategory" name="subcategory" defaultValue={subcategory}><option value="">All subcategories</option>{subcategories.filter(s=>!category||s.categoryId===category).map(s=><option key={s.id} value={s.id}>{s.name}</option>)}</select></div>
      <div><label htmlFor="catalogue-application">Application</label><select id="catalogue-application" name="application" defaultValue={application}><option value="">All applications</option>{applications.map(a=><option key={a}>{a}</option>)}</select></div>
      <div><label htmlFor="catalogue-sort">Sort by</label><select id="catalogue-sort" name="sort" defaultValue={sort}><option value="featured">Featured order</option><option value="name">Name: A–Z</option></select></div>
      <button className="button" type="submit">FIND PRODUCTS</button>
    </FilterForm>
    <div className="catalogue-results-summary"><p>{results.length} product {results.length === 1 ? 'type' : 'types'}{q ? <> matching “{q}”</> : null}{category ? <> in {categories.find(item=>item.id===category)?.name}</> : null}</p>{(filtered || sort !== 'featured') && <Link href="/products" className="text-link">CLEAR FILTERS</Link>}</div>
    {results.length ? <ComparePicker key={'results:'+JSON.stringify([q,category,subcategory,application,sort])} products={results}/> : <section className="catalogue-empty"><h2>No products match these filters.</h2><p>Try a broader search or choose another category. For a specific configuration, tell us what you need to store.</p><div><Link href="/products" className="button dark">VIEW ALL PRODUCTS</Link><Link href="/request-quote" className="text-link">REQUEST A QUOTE</Link></div></section>}
  </div><QuoteCTA/></>;
}
