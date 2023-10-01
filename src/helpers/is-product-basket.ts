import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { ProductInCartAPI } from '../types';

export default function IsProductBasket(product_id: string | undefined) {
  const basket = useSelector((state: RootState) => state.basket.cart);

  const listProducts = basket?.lineItems;

  if (listProducts?.length > 0) {
    return listProducts.some((product: ProductInCartAPI) => product.id_api === product_id);
  }

  return false;
}
