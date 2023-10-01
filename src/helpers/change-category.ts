import { useSelector } from 'react-redux';

import { useMemo } from 'react';
import { RootState } from '../store/store';
import { Product } from '../types';
import { CategoriesResult } from '../types/catogoriesResult';

export default function ChangeCategory(categorySlug: string | undefined) {
  const categories = useSelector((state: RootState) => state.categories.categories);
  const selsectCategory = useSelector((state: RootState) => state.sortType.selectCategory);

  const products = useSelector((state: RootState) => {
    return state.productsPaging.productsPaging;
  });

  const currentCategoryID = useMemo(() => {
    if (categorySlug) {
      const foundCategory = categories.find(
        (category: CategoriesResult) => category.slug['en-US'] === categorySlug
      ) as unknown as CategoriesResult;
      return foundCategory ? foundCategory.id : '';
    }

    const foundCategory = categories.find(
      (category: CategoriesResult) => category.slug['en-US'] === selsectCategory
    ) as unknown as CategoriesResult;
    return foundCategory ? foundCategory.id : '';
  }, [categorySlug, categories, selsectCategory]);

  const productsFilter = useMemo(() => {
    return currentCategoryID
      ? products.filter((product: Product) => product.category_id === currentCategoryID)
      : products;
  }, [currentCategoryID, products]);

  return productsFilter;
}
