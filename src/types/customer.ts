export type Customer = {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  dateOfBirth: string;
};

export interface CustomerWithAddress extends Customer {
  addresses: Address[];
}

export interface FullCustomer extends CustomerWithAddress {
  id: string;
  version: string;
}

export type Address = {
  streetName: string;
  postalCode: string;
  city: string;
  country: 'RU';
};
