export type User = Customer | Shopkeeper;

export type Customer = {
  id: string;
  type: 'customer';
  name: string;
  email: string;
  phone: string;
  password?: string; // Should not be on client
  points: number;
};

export type Shopkeeper = {
  id: string;
  type: 'shopkeeper';
  shopName: string;
  shopId: string;
  nid: string;
  email: string;
  phone: string;
  password?: string; // Should not be on client
  bottles: number;
};

export type Transaction = {
  id: string;
  userId: string;
  userName: string;
  shopId: string;
  shopName: string;
  bottles: number;
  date: string;
  points: number;
};
