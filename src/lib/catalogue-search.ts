import {categories, products} from '@/content/en/catalogue';
export type CatalogueQuery = {q?: string; category?: string; sort?: string};
export function searchCatalogue(query: CatalogueQuery) {
  const q = (query.q || '').trim().slice(0, 120);
  const category = categories.some(item => item.id === query.category) ? query.category! : '';
  const sort = query.sort === 'name' ? 'name' : 'featured';
  const terms = q.toLocaleLowerCase('en-CA').split(/\s+/).filter(Boolean);
  const results = products.filter(product => {
    if (category && product.categoryId !== category) return false;
    const group = categories.find(item => item.id === product.categoryId);
    const text = [product.name, product.summary, group?.name].join(' ').toLocaleLowerCase('en-CA');
    return terms.every(term => text.includes(term));
  });
  if (sort === 'name') results.sort((a, b) => a.name.localeCompare(b.name, 'en-CA'));
  return {q, category, sort, results};
}
