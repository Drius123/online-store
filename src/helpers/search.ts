import { useMemo } from 'react';
import { Product } from '../types';

export default function FilterSearch(products: never[], query?: string) {
  const search = useMemo(() => {
    if (query) {
      return products.filter((product: Product) =>
        product.title.toLocaleLowerCase().includes(query.toLocaleLowerCase())
      );
    }

    return products;
  }, [products, query]);

  return search;
}
