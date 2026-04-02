'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { loginAction, signupAction, deleteAccountAction } from '@/app/actions/auth';

interface User {
  id: string;
  username: string;
  password?: string;
  name: string;
  email: string;
  phone: string;
  zipcode?: string;
  address: string;
  detailAddress: string;
  role: string;
}

interface AuthContextType {
  user: User | null;
  signup: (userData: Omit<User, 'id'>) => Promise<boolean>;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  deleteAccount: () => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('toy_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const signup = async (userData: Omit<User, 'id'>) => {
    const newUser = await signupAction(userData);
    if (newUser) {
      localStorage.setItem('toy_user', JSON.stringify(newUser));
      setUser(newUser as any);
      return true;
    }
    return false;
  };

  const login = async (username: string, password: string) => {
    console.log('AuthContext: login attempt for', username);
    try {
      const dbUser = await loginAction(username, password);
      console.log('AuthContext: loginAction returned', dbUser ? 'user' : 'null');
      if (dbUser) {
        localStorage.setItem('toy_user', JSON.stringify(dbUser));
        setUser(dbUser as any);
        return true;
      }
    } catch (err) {
      console.error('AuthContext: login error', err);
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem('toy_user');
    setUser(null);
  };

  const deleteAccount = async () => {
    if (user) {
      const success = await deleteAccountAction(user.id);
      if (success) {
        localStorage.removeItem('toy_user');
        setUser(null);
        alert('회원 탈퇴가 완료되었습니다. 이용해주셔서 감사합니다.');
        return true;
      }
    }
    return false;
  };

  return (
    <AuthContext.Provider value={{ user, signup, login, logout, deleteAccount }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
