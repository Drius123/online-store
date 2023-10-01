export interface CartsResult {
  limit: number;
  offset: number;
  count: number;
  total: number;
  results: Result[];
}

export interface Result {
  type: string;
  id: string;
  version: number;
  versionModifiedAt: Date;
  lastMessageSequenceNumber: number;
  createdAt: Date;
  lastModifiedAt: Date;
  lastModifiedBy: EdBy;
  createdBy: EdBy;
  customerId?: string;
  anonymousId?: string;
  lineItems: LineItem[];
  cartState: string;
  totalPrice: TotalPrice;
  shippingMode: string;
  shipping: any[];
  customLineItems: any[];
  discountCodes: any[];
  directDiscounts: any[];
  inventoryMode: string;
  taxMode: string;
  taxRoundingMode: string;
  taxCalculationMode: string;
  deleteDaysAfterLastModification: number;
  refusedGifts: any[];
  origin: string;
  itemShippingAddresses: any[];
  totalLineItemQuantity: number;
}

export interface EdBy {
  clientId: string;
  isPlatformClient: boolean;
  customer: Customer;
}

export interface Customer {
  typeId: string;
  id: string;
}

export interface LineItem {
  id: string;
  productId: string;
  productKey: string;
  name: Name;
  productType: ProductType;
  productSlug: Name;
  variant: Variant;
  price: Price;
  quantity: number;
  discountedPricePerQuantity: any[];
  perMethodTaxRate: any[];
  addedAt: Date;
  lastModifiedAt: Date;
  state: State[];
  priceMode: string;
  lineItemMode: string;
  totalPrice: TotalPrice;
  taxedPricePortions: any[];
}

export interface Name {
  'en-US': string;
  'ru-RU': string;
}

export interface Price {
  id: string;
  value: TotalPrice;
}

export interface TotalPrice {
  type: string;
  currencyCode: string;
  centAmount: number;
  fractionDigits: number;
}

export interface ProductType {
  typeId: string;
  id: string;
  version: number;
}

export interface State {
  quantity: number;
  state: Customer;
}

export interface Variant {
  id: number;
  sku: string;
  prices: Price[];
  images: Image[];
  attributes: Attribute[];
  assets: any[];
}

export interface Attribute {
  name: string;
  value: number;
}

export interface Image {
  url: string;
  dimensions: Dimensions;
}

export interface Dimensions {
  w: number;
  h: number;
}
