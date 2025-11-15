'use client';

import { useState, useEffect } from 'react';
import { LoginForm } from '@/components/login-form';
import { SignupForm } from '@/components/signup-form';
import { AdminDashboard } from '@/components/admin-dashboard';
import { UserDashboard } from '@/components/user-dashboard';
import { StoreOwnerDashboard } from '@/components/store-owner-dashboard';
import { User, Store, Rating } from '@/lib/types';
import {
  INITIAL_USERS,
  INITIAL_STORES,
  INITIAL_RATINGS,
  INITIAL_STORE_OWNERS,
  INITIAL_NORMAL_USERS,
} from '@/lib/store';

type AuthPage = 'login' | 'signup';

export default function Home() {
  const [authPage, setAuthPage] = useState<AuthPage>('login');
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([]);
  const [stores, setStores] = useState<Store[]>([]);
  const [ratings, setRatings] = useState<Rating[]>([]);

  // Initialize data
  useEffect(() => {
    const allUsers = [...INITIAL_USERS, ...INITIAL_STORE_OWNERS, ...INITIAL_NORMAL_USERS];
    setUsers(allUsers);
    setStores(INITIAL_STORES);
    setRatings(INITIAL_RATINGS);
  }, []);

  const handleLogin = (user: User) => {
    setCurrentUser(user);
  };

  const handleSignup = (user: User) => {
    setUsers(prev => [...prev, user]);
    setCurrentUser(user);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setAuthPage('login');
  };

  const handleAddUser = (user: User) => {
    setUsers(prev => [...prev, user]);
  };

  const handleAddStore = (store: Store) => {
    setStores(prev => [...prev, store]);
  };

  const handleRating = (storeId: string, rating: number) => {
    const existingRating = ratings.find(
      r => r.storeId === storeId && r.userId === currentUser?.id
    );

    if (existingRating) {
      // Update existing rating
      setRatings(prev =>
        prev.map(r =>
          r.id === existingRating.id
            ? {
                ...r,
                rating,
                createdAt: new Date(),
              }
            : r
        )
      );
    } else {
      // Create new rating
      const newRating: Rating = {
        id: `rating_${Date.now()}`,
        storeId,
        userId: currentUser?.id || '',
        rating,
        createdAt: new Date(),
      };
      setRatings(prev => [...prev, newRating]);
    }
  };

  if (!currentUser) {
    return (
      <AuthPage 
        currentAuthPage={authPage}
        onSetAuthPage={setAuthPage}
        onLogin={handleLogin}
        onSignup={handleSignup}
        allUsers={users}
      />
    );
  }

  // Route to appropriate dashboard based on role
  if (currentUser.role === 'admin') {
    return (
      <AdminDashboard
        currentUser={currentUser}
        users={users}
        stores={stores}
        ratings={ratings}
        onAddUser={handleAddUser}
        onAddStore={handleAddStore}
        onLogout={handleLogout}
      />
    );
  }

  if (currentUser.role === 'user') {
    return (
      <UserDashboard
        currentUser={currentUser}
        stores={stores}
        ratings={ratings}
        onRating={handleRating}
        onLogout={handleLogout}
      />
    );
  }

  if (currentUser.role === 'store_owner') {
    return (
      <StoreOwnerDashboard
        currentUser={currentUser}
        stores={stores}
        ratings={ratings}
        onLogout={handleLogout}
      />
    );
  }

  return null;
}

interface AuthPageProps {
  currentAuthPage: 'login' | 'signup';
  onSetAuthPage: (page: 'login' | 'signup') => void;
  onLogin: (user: User) => void;
  onSignup: (user: User) => void;
  allUsers: User[];
}

function AuthPage({ currentAuthPage, onSetAuthPage, onLogin, onSignup, allUsers }: AuthPageProps) {
  if (currentAuthPage === 'signup') {
    return <SignupForm onSignup={onSignup} onToggleLogin={() => onSetAuthPage('login')} />;
  }

  return <LoginForm onLogin={onLogin} onToggleSignup={() => onSetAuthPage('signup')} allUsers={allUsers} />;
}
