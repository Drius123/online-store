import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { Product } from '../types';

export default function FilterColor(products: never[]) {
  const selectedColors = useSelector((state: RootState) => state.sortType.selectColor);

  const sortColor = useMemo(() => {
    return products.filter((product: Product) => {
      if (selectedColors.length > 0) {
        const productColor = String(product.color);
        return selectedColors.includes(productColor);
      }

      return products;
    });
  }, [products, selectedColors]);

  return sortColor;
}
