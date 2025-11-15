import { User, Store, Rating } from './types';

export const INITIAL_USERS: User[] = [
  {
    id: 'admin1',
    name: 'System Administrator',
    email: 'admin@example.com',
    password: 'Admin@1234',
    address: '123 Admin Street, City, State',
    role: 'admin',
    createdAt: new Date(),
  },
  {
    id: 'owner1',
    name: 'John Store Owner',
    email: 'john@store.com',
    password: 'Owner@1234',
    address: '456 Store Avenue, City, State',
    role: 'store_owner',
    storeId: 'store1',
    createdAt: new Date(),
  },
  {
    id: 'user1',
    name: 'Jane User Account',
    email: 'jane@example.com',
    password: 'User@1234',
    address: '789 User Lane, City, State',
    role: 'user',
    createdAt: new Date(),
  },
];

export const INITIAL_STORES: Store[] = [
  {
    id: 'store1',
    name: 'Premium Electronics',
    email: 'store1@example.com',
    address: '100 Main Street, Downtown',
    ownerId: 'owner1',
    createdAt: new Date(),
  },
  {
    id: 'store2',
    name: 'Fashion Hub',
    email: 'store2@example.com',
    address: '200 Fashion Boulevard, Mall',
    ownerId: 'owner2',
    createdAt: new Date(),
  },
  {
    id: 'store3',
    name: 'Tech Paradise',
    email: 'store3@example.com',
    address: '300 Tech Park, Silicon Valley',
    ownerId: 'owner3',
    createdAt: new Date(),
  },
];

export const INITIAL_RATINGS: Rating[] = [
  {
    id: 'rating1',
    storeId: 'store1',
    userId: 'user1',
    rating: 5,
    createdAt: new Date(),
  },
  {
    id: 'rating2',
    storeId: 'store1',
    userId: 'user2',
    rating: 4,
    createdAt: new Date(),
  },
  {
    id: 'rating3',
    storeId: 'store2',
    userId: 'user1',
    rating: 3,
    createdAt: new Date(),
  },
];

// Initialize additional store owners
export const INITIAL_STORE_OWNERS: User[] = [
  {
    id: 'owner2',
    name: 'Sarah Fashion Owner',
    email: 'sarah@store.com',
    password: 'Owner@1234',
    address: '500 Fashion District, City, State',
    role: 'store_owner',
    storeId: 'store2',
    createdAt: new Date(),
  },
  {
    id: 'owner3',
    name: 'Mike Tech Owner',
    email: 'mike@store.com',
    password: 'Owner@1234',
    address: '600 Tech Center, City, State',
    role: 'store_owner',
    storeId: 'store3',
    createdAt: new Date(),
  },
];

export const INITIAL_NORMAL_USERS: User[] = [
  {
    id: 'user2',
    name: 'Bob Customer Account',
    email: 'bob@example.com',
    password: 'User@1234',
    address: '900 Customer Way, City, State',
    role: 'user',
    createdAt: new Date(),
  },
];
