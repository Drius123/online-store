export interface Product {
  id: number;
  id_api: string;
  sku: string;
  itemLength: number;
  itemWidth: number;
  itemHeight: number;
  price: number;
  title: string;
  category_id: string;
  category?: string;
  image: string;
  images?: Image[];
  description: string;
  discount_type?: string;
  discount_permyriad?: number;
  color: string | number;
}

export interface ProductInCart extends Product {
  quantity: number;
  lineItemId: string;
}

export interface ProductInCartAPI {
  id_api: string;
  quantity: number;
  lineItemId: string;
}

export type Image = {
  url: string;
};
