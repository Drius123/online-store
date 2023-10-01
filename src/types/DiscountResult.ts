export interface DiscountResult {
  id: string;
  version: number;
  versionModifiedAt: Date;
  createdAt: Date;
  lastModifiedAt: Date;
  lastModifiedBy: EdBy;
  createdBy: EdBy;
  value: Value;
  predicate: string;
  name: Name;
  description?: Description;
  isActive: boolean;
  sortOrder: string;
  // references: any[];
  attributeTypes: AttributeTypes;
  key?: string;
}

export interface AttributeTypes {}

export interface EdBy {
  isPlatformClient: boolean;
  user: User;
}

export interface User {
  typeId: string;
  id: string;
}

export interface Description {
  'en-US': string;
}

export interface Name {
  'en-US': string;
  'de-DE'?: string;
  es?: string;
  'ru-RU'?: string;
}

export interface Value {
  type: string;
  permyriad?: number;
  money?: Money[];
}

export interface Money {
  type: string;
  currencyCode: string;
  centAmount: number;
  fractionDigits: number;
}
