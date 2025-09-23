
"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import type { User, Customer, Shopkeeper, Transaction } from '@/lib/types';
import { users as initialUsers, transactions as initialTransactions } from '@/lib/mock-data';

interface AuthContextType {
  currentUser: User | null;
  users: User[];
  transactions: Transaction[];
  loading: boolean;
  login: (email: string, password: string) => User | null;
  logout: () => void;
  register: (userData: Partial<User>) => User | null;
  addTransaction: (transactionData: Omit<Transaction, 'id' | 'date'>) => void;
  updateUser: (updatedUser: User) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const savedUsers = localStorage.getItem('users');
      const parsedUsers = savedUsers ? JSON.parse(savedUsers) : initialUsers;
      setUsers(parsedUsers);

      const savedTransactions = localStorage.getItem('transactions');
      setTransactions(savedTransactions ? JSON.parse(savedTransactions) : initialTransactions);
      
      const savedUser = localStorage.getItem('currentUser');
      if (savedUser) {
        const parsedCurrentUser = JSON.parse(savedUser);
        const userInList = parsedUsers.find((u: User) => u.id === parsedCurrentUser.id);
        if(userInList) {
          // Sync with the main users list to get the latest data
          setCurrentUser(userInList);
        } else {
          // If user from localStorage is not in our canonical user list, log them out.
          localStorage.removeItem('currentUser');
        }
      }
    } catch (error) {
      console.error("Failed to parse from localStorage", error);
      // If parsing fails, start fresh
      setUsers(initialUsers);
      setTransactions(initialTransactions);
      localStorage.clear();
    } finally {
        setLoading(false);
    }
  }, []);

  useEffect(() => {
    // Persist users to localStorage whenever they change, but not during initial load
    if (!loading) {
      localStorage.setItem('users', JSON.stringify(users));
    }
  }, [users, loading]);

  useEffect(() => {
    // Persist transactions to localStorage whenever they change, but not during initial load
    if (!loading) {
      localStorage.setItem('transactions', JSON.stringify(transactions));
    }
  }, [transactions, loading]);

  const login = (email: string, password: string): User | null => {
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
      const userToStore = {...user};
      delete userToStore.password;
      setCurrentUser(userToStore);
      localStorage.setItem('currentUser', JSON.stringify(userToStore));
      return user;
    }
    return null;
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
  };

  const register = (userData: Partial<User>): User | null => {
    // In a real app, email should be unique.
    if (users.some(u => u.email === userData.email)) {
      return null;
    }

    const newUser: User = {
      id: (users.length + 1).toString(),
      ...userData,
    } as User;

    // Initialize points/bottles for new users
    if (newUser.type === 'customer') {
      (newUser as Customer).points = 0;
    } else {
      (newUser as Shopkeeper).bottles = 0;
    }
    
    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    
    // Automatically log in the new user
    const userToLogin = updatedUsers.find(u => u.id === newUser.id);
    if (userToLogin) {
        const userToStore = {...userToLogin};
        delete userToStore.password;
        setCurrentUser(userToStore);
        localStorage.setItem('currentUser', JSON.stringify(userToStore));
    }
    return newUser;
  };
  
  const addTransaction = (transactionData: Omit<Transaction, 'id' | 'date'>) => {
    const newTransaction: Transaction = {
      ...transactionData,
      id: (transactions.length + 1).toString(),
      date: new Date().toLocaleDateString('bn-BD'), // Bengali locale for date
    };
    setTransactions(prev => [...prev, newTransaction]);
  };
  
  const updateUser = (updatedUser: User) => {
    let finalUpdatedUser: User | undefined;
    
    // Update the canonical list of users
    const newUsers = users.map(u => {
        if (u.id === updatedUser.id) {
            // Merge existing user data with updated data
            finalUpdatedUser = { ...u, ...updatedUser };
            return finalUpdatedUser;
        }
        return u;
    });
    setUsers(newUsers);

    // If the updated user is the currently logged-in user, update their state
    if (currentUser && finalUpdatedUser && currentUser.id === finalUpdatedUser.id) {
        const userToStore = {...finalUpdatedUser};
        delete userToStore.password;
        setCurrentUser(userToStore);
        localStorage.setItem('currentUser', JSON.stringify(userToStore));
    }
  };

  return (
    <AuthContext.Provider value={{ currentUser, users, transactions, loading, login, logout, register, addTransaction, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
