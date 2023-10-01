import ChangeCategory from './change-category';
import FilterColor from './filter-color';
import FilterPrice from './filter-price';
import FilterSearch from './search';
import Sort from './sort';

export default function FilterBar(categorySlug: string | undefined, query: string) {
  const filterCategory = ChangeCategory(categorySlug);

  const searchProduct = FilterSearch(filterCategory, query);

  const filterPrice = FilterPrice(searchProduct);

  const filterColor = FilterColor(filterPrice);

  const sort = Sort(filterColor);

  return sort;
}
