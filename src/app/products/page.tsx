import Link from 'next/link';
import {categories} from '@/content/en/catalogue';
import {Breadcrumbs,PageIntro,ProductCard,QuoteCTA} from '@/components/ui';
import {metadata as makeMetadata} from '@/lib/site';
import {searchCatalogue} from '@/lib/catalogue-search';
export const metadata=makeMetadata('Explore rack types','Explore rack types and the information needed to request a configuration-specific quotation.','/products');
type SearchParams = Record<string, string | string[] | undefined>;
const first = (value: string | string[] | undefined) => Array.isArray(value) ? value[0] : value;
export default async function Products({searchParams}: {searchParams: Promise<SearchParams>}) {
  const params = await searchParams;
  const {q, category, sort, results} = searchCatalogue({q:first(params.q), category:first(params.category), sort:first(params.sort)});
  const filtered = Boolean(q || category);
  return <><div className="page-shell">
    <Breadcrumbs items={[{name:'Products',path:'/products'}]}/>
    <PageIntro eyebrow="THE RIGHT STARTING POINT" title="Built around what you store."><p>Explore product types across our eight categories. Final configurations, compatibility and sourcing are established through a project quotation.</p></PageIntro>
    <form key={JSON.stringify([q, category, sort])} action="/products" method="get" className="catalogue-filters" role="search" aria-label="Find rack types">
      <div><label htmlFor="catalogue-search">Search rack types</label><input id="catalogue-search" name="q" type="search" defaultValue={q} maxLength={120} placeholder="Try pallet, vehicle or kitchen"/></div>
      <div><label htmlFor="catalogue-category">Category</label><select id="catalogue-category" name="category" defaultValue={category}><option value="">All categories</option>{categories.map(item=><option key={item.id} value={item.id}>{item.name}</option>)}</select></div>
      <div><label htmlFor="catalogue-sort">Sort by</label><select id="catalogue-sort" name="sort" defaultValue={sort}><option value="featured">Featured order</option><option value="name">Name: A–Z</option></select></div>
      <button className="button" type="submit">FIND RACKS</button>
    </form>
    <div className="catalogue-results-summary"><p>{results.length} rack {results.length === 1 ? 'type' : 'types'}{q ? <> matching “{q}”</> : null}{category ? <> in {categories.find(item=>item.id===category)?.name}</> : null}</p>{(filtered || sort !== 'featured') && <Link href="/products" className="text-link">CLEAR FILTERS</Link>}</div>
    {results.length ? <div className="product-grid">{results.map(product=><ProductCard key={product.id} product={product}/>)}</div> : <section className="catalogue-empty"><h2>No rack types match these filters.</h2><p>Try a broader search or choose another category. For a specific configuration, tell us what you need to store.</p><div><Link href="/products" className="button dark">VIEW ALL RACK TYPES</Link><Link href="/request-quote" className="text-link">REQUEST A QUOTE</Link></div></section>}
  </div><QuoteCTA/></>;
}
