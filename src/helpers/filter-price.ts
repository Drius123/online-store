import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { Product } from '../types';

export default function FilterPrice(products: never[]) {
  const minPrice = useSelector((state: RootState) => state.sortType.minPrice);
  const maxPrice = useSelector((state: RootState) => state.sortType.maxPrice);

  const sortPrice = useMemo(() => {
    return products.filter((product: Product) => {
      if (minPrice < maxPrice) {
        return product.price >= minPrice && product.price <= maxPrice;
      }
      if (minPrice >= maxPrice) {
        return product.price >= minPrice;
      }
      return product;
    });
  }, [products, minPrice, maxPrice]);

  return sortPrice;
}
