import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { Product, SortOrder } from '../types';

export default function Sort(products: never[]) {
  const sortPrice = useSelector((state: RootState) => state.sortType.sortPrice);
  const sortName = useSelector((state: RootState) => state.sortType.sortName);
  const sortType = useSelector((state: RootState) => state.sortType.sortType);

  const sort = useMemo(() => {
    return products.slice().sort((a: Product, b: Product) => {
      if (sortType === 'price') {
        return sortPrice === SortOrder.asc ? (a.price || 0) - (b.price || 0) : (b.price || 0) - (a.price || 0);
      }

      return sortName === SortOrder.asc
        ? (a.title || '').localeCompare(b.title || '')
        : (b.title || '').localeCompare(a.title || '');
    });
  }, [products, sortPrice, sortName, sortType]);

  return sort;
}
