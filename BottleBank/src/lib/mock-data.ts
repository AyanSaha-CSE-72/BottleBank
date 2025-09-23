import type { User, Transaction } from './types';

export const users: User[] = [
  { 
    id: "1", 
    name: "Mohammad Rahim", 
    email: "customer@example.com", 
    password: "password1", 
    points: 45, 
    type: "customer",
    phone: "01712345678"
  },
  { 
    id: "2", 
    shopName: "Fresh Corner", 
    shopId: "SHOP001", 
    nid: "1982739473", 
    email: "shop@example.com", 
    password: "password2", 
    bottles: 120, 
    type: "shopkeeper",
    phone: "0187654321"
  }
];

export const transactions: Transaction[] = [];
