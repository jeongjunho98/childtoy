'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
}

interface AuthContextType {
  user: User | null;
  signup: (userData: Omit<User, 'id'>) => void;
  login: (email: string) => boolean;
  logout: () => void;
  deleteAccount: () => void;
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

  const signup = (userData: Omit<User, 'id'>) => {
    const newUser = { ...userData, id: Date.now().toString() };
    localStorage.setItem('toy_user', JSON.stringify(newUser));
    setUser(newUser);
  };

  const login = (email: string) => {
    // 실제 서비스라면 DB 검증을 하겠지만, 여기서는 가입된 유저가 있는지 체크하는 시뮬레이션입니다.
    const savedUser = localStorage.getItem('toy_user');
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);
      if (parsedUser.email === email) {
        setUser(parsedUser);
        return true;
      }
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    // 세션 로그아웃 시 데이터는 유지 (localStorage는 그대로 둠)
  };

  const deleteAccount = () => {
    localStorage.removeItem('toy_user');
    setUser(null);
    alert('회원 탈퇴가 완료되었습니다. 이용해주셔서 감사합니다.');
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
