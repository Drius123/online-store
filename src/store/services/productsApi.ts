import { api } from './api';
import { setProducts } from '../reducers/ProductsSlice';
import { setErrorMain } from '../reducers/ErrorSlice';
import { Product } from '../../types';
import { ProductsResult } from '../../types/productsResult';
import { getCategories } from './getCategories';
import { setCategories } from '../reducers/CategoriesSlice';
import { getDiscounts } from './getDiscounts';
import { setDiscounts } from '../reducers/DiscountsSlice';
import { CategoriesResult } from '../../types/catogoriesResult';
import { DiscountResult } from '../../types/DiscountResult';

export const productsApi = api.injectEndpoints({
  endpoints: (build) => {
    return {
      getProducts: build.query({
        query: () => ({
          url: `products/?limit=100`,
        }),
        async onQueryStarted(_, { dispatch, queryFulfilled }) {
          try {
            const categories: CategoriesResult[] = await getCategories();
            dispatch(setCategories(categories));
            const discounts: DiscountResult[] = await getDiscounts();
            dispatch(setDiscounts(discounts));

            const result = await queryFulfilled;
            const { data } = result;
            const products: Product[] = [];

            // eslint-disable-next-line no-plusplus
            for (let i = 0; i < data.length; i++) {
              products[i] = { ...data[i] };
              if (data[i].category_id !== '') {
                products[i].category = categories.find((x) => x.id === data[i].category_id)!.name['en-US'];
              }
              if (data[i].sku !== '') {
                const discount = discounts.filter((x) => x.predicate.indexOf(data[i].sku.slice(0, -1)) > 0);
                if (discount[0]) {
                  products[i].discount_type = discount[0].value.type;
                  products[i].discount_permyriad = discount[0].value.permyriad;
                }
              }
            }

            dispatch(setProducts(products));
          } catch (e) {
            dispatch(setErrorMain(true));
            // eslint-disable-next-line no-console
            console.error('error products', e);
          }
        },
        transformResponse: (response: ProductsResult) => {
          const products: Product[] = [];
          if (response && response.results) {
            // Проверка наличия response и response.results
            // eslint-disable-next-line no-plusplus
            for (let i = 0; i < response.results.length; i++) {
              // Исправлено на response.results.length
              const result = response.results[i];
              const { masterData } = result;
              if (masterData && masterData.current) {
                // Проверка наличия masterData и masterData.current
                const { current } = masterData;
                const product: Product = {
                  id: i,
                  id_api: result.id,
                  sku: current.masterVariant.sku || '',
                  image: current.masterVariant.images[0]?.url || '',
                  images: current.masterVariant.images || [],
                  itemHeight:
                    typeof current.masterVariant.attributes[2]?.value === 'number'
                      ? current.masterVariant.attributes[2]?.value
                      : 0,
                  itemLength:
                    typeof current.masterVariant.attributes[0]?.value === 'number'
                      ? current.masterVariant.attributes[0]?.value
                      : 0,
                  itemWidth:
                    typeof current.masterVariant.attributes[1]?.value === 'number'
                      ? current.masterVariant.attributes[1]?.value
                      : 0,
                  price: (current.masterVariant.prices[0]?.value.centAmount || 0) / 100,
                  title: current.name['en-US'],
                  description: current.description ? current.description['en-US'] : '',
                  category_id: current.categories[0] ? current.categories[0].id : '',
                  category: '',
                  color: current.masterVariant.attributes[5]?.value || 'No color',
                };

                products.push(product);
              }
            }
          }

          return products;
        },
        providesTags: () => ['products'],
      }),
    };
  },
});

export const { useGetProductsQuery } = productsApi;
