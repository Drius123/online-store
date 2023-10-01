export interface CategoriesResult {
  id: string;
  version: number;
  versionModifiedAt: Date;
  lastMessageSequenceNumber: number;
  createdAt: Date;
  lastModifiedAt: Date;
  lastModifiedBy: EdBy;
  createdBy: EdBy;
  key?: string;
  name: Description;
  slug: Slug;
  orderHint: string;
  description?: Description;
}

export interface EdBy {
  isPlatformClient: boolean;
  user: User;
}

export interface User {
  typeId: TypeID;
  id: string;
}

export enum TypeID {
  User = 'user',
}

export interface Description {
  [key: string]: string;
}

export interface Slug {
  'en-US': string;
}
