'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

export interface CartItem {
  id: number;
  title: string;
  price: string;
  color: string;
  imageUrl: string;
  quantity: number;
}

interface CartContextType {
  cart: CartItem[];
  directBuyItem: CartItem | null; // 단독 구매 상품 상태
  addToCart: (product: any) => void;
  setDirectBuy: (product: any) => void; // 단독 구매 설정 함수
  clearDirectBuy: () => void;
  removeFromCart: (id: number) => void;
  clearCart: () => void;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [directBuyItem, setDirectBuyItem] = useState<CartItem | null>(null);

  useEffect(() => {
    const savedCart = localStorage.getItem('toy_cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('toy_cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: any) => {
    setCart((prev) => {
      const existingItem = prev.find((item) => item.id === product.id);
      if (existingItem) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { 
        id: product.id, 
        title: product.title, 
        price: product.price, 
        color: product.color || '', 
        imageUrl: product.imageUrl, 
        quantity: 1 
      }];
    });
  };

  const setDirectBuy = (product: any) => {
    setDirectBuyItem({
      id: product.id,
      title: product.title,
      price: product.price,
      color: product.color || '',
      imageUrl: product.imageUrl,
      quantity: 1
    });
  };

  const clearDirectBuy = () => setDirectBuyItem(null);

  const removeFromCart = (id: number) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => setCart([]);

  // 결제 금액 계산 시 directBuyItem이 있으면 해당 금액만, 없으면 장바구니 합계
  const totalPrice = directBuyItem 
    ? parseInt(directBuyItem.price.replace(/,/g, ''))
    : cart.reduce((acc, item) => {
        const priceNum = parseInt(item.price.replace(/,/g, ''));
        return acc + priceNum * item.quantity;
      }, 0);

  return (
    <CartContext.Provider value={{ 
      cart, 
      directBuyItem, 
      addToCart, 
      setDirectBuy, 
      clearDirectBuy,
      removeFromCart, 
      clearCart, 
      totalPrice 
    }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
