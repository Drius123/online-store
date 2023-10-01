export interface ProductsResult {
  limit: number;
  offset: number;
  count: number;
  total: number;
  results: Result[];
}

export interface Result {
  id: string;
  version: number;
  versionModifiedAt: Date;
  lastMessageSequenceNumber: number;
  createdAt: Date;
  lastModifiedAt: Date;
  lastModifiedBy: LastModifiedBy;
  createdBy: CreatedBy;
  productType: ProductType;
  masterData: MasterData;
  key: string;
  taxCategory?: ProductType;
  lastVariantId: number;
  priceMode?: string;
}

export interface CreatedBy {
  isPlatformClient: boolean;
  user?: ProductType;
  clientId?: string;
}

export interface ProductType {
  typeId: TypeID;
  id: string;
}

export enum TypeID {
  Category = 'category',
  ProductDiscount = 'product-discount',
  ProductType = 'product-type',
  TaxCategory = 'tax-category',
  User = 'user',
}

export interface LastModifiedBy {
  isPlatformClient: boolean;
  user?: ProductType;
}

export interface MasterData {
  current: Current;
  staged: Current;
  published: boolean;
  hasStagedChanges: boolean;
}

export interface Current {
  name: Description;
  categories: ProductType[];
  categoryOrderHints: CategoryOrderHints;
  slug: Description;
  masterVariant: MasterVariant;
  variants: Variant[];
  searchKeywords: CategoryOrderHints;
  description?: Description;
  metaTitle?: Meta;
  metaDescription?: Meta;
}

export interface CategoryOrderHints {}

export interface Description {
  'en-US': string;
  'ru-RU'?: string;
}

export interface MasterVariant {
  id: number;
  sku: string;
  key?: string;
  prices: Price[];
  images: Image[];
  attributes: MasterVariantAttribute[];
}

export interface MasterVariantAttribute {
  name: string;
  value: number;
}

export interface ValueValueClass {
  key: string;
  label: string;
}

export enum ValueEnum {
  HappyAnniversary = 'Happy Anniversary',
  Массив = 'массив',
  Пластик = 'пластик',
  Россия = 'Россия',
}

export interface Image {
  url: string;
  dimensions: Dimensions;
}

export interface Dimensions {
  w: number;
  h: number;
}

export interface Price {
  id: string;
  value: DiscountedValue;
  country?: Country;
  discounted?: Discounted;
}

export enum Country {
  Au = 'AU',
  De = 'DE',
  Es = 'ES',
  Us = 'US',
}

export interface Discounted {
  value: DiscountedValue;
  discount: ProductType;
}

export interface DiscountedValue {
  type: Type;
  currencyCode: CurrencyCode;
  centAmount: number;
  fractionDigits: number;
}

export enum CurrencyCode {
  Aud = 'AUD',
  Eur = 'EUR',
  Rub = 'RUB',
  Usd = 'USD',
}

export enum Type {
  CentPrecision = 'centPrecision',
}

export interface Meta {
  'en-US': string;
  'de-DE': string;
  es: string;
  'ru-RU': string;
}

export interface Variant {
  id: number;
  sku: string;
  key: string;
  prices: Price[];
  images: Image[];
  attributes: VariantAttribute[];
}

export interface VariantAttribute {
  name: string;
  value: boolean | ValueValueClass;
}
