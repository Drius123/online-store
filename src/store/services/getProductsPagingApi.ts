import { Product } from '../../types';
import { refreshToken } from './refreshToken';

export const BASE_URL =
  'https://api.europe-west1.gcp.commercetools.com/jhfdkajs-fdjskfhkjsdf-hdsfsd/products?limit=9&offset=';

export async function getProductsPaging(page: number) {
  const headers = new Headers();
  let token = localStorage.getItem('token');
  if (!token) {
    await refreshToken();
    token = localStorage.getItem('token');
  }
  if (token) {
    headers.set('authorization', `Bearer ${token}`);
  }
  try {
    const response = await fetch(`${BASE_URL}${page * 9 - 9}`, {
      method: 'GET',
      headers,
    });
    const data = await response.json();
    const products: Product[] = [];
    if (data && data.results) {
      // Проверка наличия response и response.results
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < data.results.length; i++) {
        // Исправлено на response.results.length
        const result = data.results[i];
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
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e);
    return {};
  }
}
