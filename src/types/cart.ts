import { ProductInCartAPI } from './index';
import { TotalPrice } from './cartsResult';

export interface Cart {
  id_cart: string;
  version: number;
  customerId?: string;
  anonymousId?: string;
  lineItems: ProductInCartAPI[];
  totalPrice: TotalPrice;
}
