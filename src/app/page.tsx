'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./page.module.css";
import { products } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";

const LiveTimer = () => {
  const [timeLeft, setTimeLeft] = useState(1800);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className={styles.timer}>
      방송 종료까지 🚨 {formatTime(timeLeft)}
    </div>
  );
};

export default function Home() {
  const { addToCart, cart } = useCart();
  const { user } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', name: '전체' },
    { id: 'robot', name: '로봇/변신' },
    { id: 'doll', name: '인형/피규어' },
    { id: 'car', name: '자동차/탈것' },
    { id: 'education', name: '교구/학습' },
    { id: 'boardgame', name: '보드게임' },
  ];

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  return (
    <div className={styles.main}>
      <header className={styles.header}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
          <Link href="/" className={styles.logo}>토이팡팡 🎈</Link>
          <nav className={styles.nav}>
            <Link href="/">홈</Link>
            <Link href="/auth">{user ? `${user.name}님` : '로그인'}</Link>
            <Link href="/cart">장바구니 ({cart.length})</Link>
          </nav>
        </div>
      </header>

      <section className={styles.hero}>
        <div className="container">
          <span className={styles.liveBadge}>인기 급상승 중</span>
          <h1 className={styles.heroTitle}>아이들이 좋아하는 국내 최고 장난감!</h1>
          <p style={{ fontSize: '20px', color: '#555' }}>부모님들이 믿고 사는 대한민국 1등 장난감 샵 🧸</p>
          <LiveTimer />
        </div>
      </section>

      <main className="container">
        <nav className={styles.categoryNav}>
          {categories.map(cat => (
            <button 
              key={cat.id}
              className={`${styles.categoryTab} ${selectedCategory === cat.id ? styles.activeTab : ''}`}
              onClick={() => setSelectedCategory(cat.id)}
            >
              {cat.name}
            </button>
          ))}
        </nav>

        <h2 style={{ fontSize: '28px', margin: '40px 0 30px', textAlign: 'center' }}>
          {categories.find(c => c.id === selectedCategory)?.name} 추천 상품
        </h2>
        
        <div className={styles.productGrid}>
          {filteredProducts.map((product) => (
            <div key={product.id} className={styles.card}>
              <span className={styles.tag}>{categories.find(c => c.id === product.category)?.name}</span>
              <Link href={`/products/${product.id}`}>
                <div className={styles.imagePlaceholder}>
                  <Image 
                    src={product.image} 
                    alt={product.name} 
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    style={{ objectFit: 'cover' }}
                  />
                </div>
              </Link>
              <div className={styles.info}>
                <h3 className={styles.title}>{product.name}</h3>
                <p className={styles.price}>{product.price.toLocaleString()}원</p>
                <button 
                  className={styles.buyBtn}
                  onClick={() => addToCart({
                    id: parseInt(product.id),
                    title: product.name,
                    price: product.price.toLocaleString(),
                    imageUrl: product.image,
                    description: product.description
                  })}
                >
                  장바구니 담기
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      <footer style={{ background: '#f9f9f9', padding: '80px 0', marginTop: '100px', textAlign: 'center', borderTop: '1px solid #eee' }}>
        <div className="container">
          <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#ccc', marginBottom: '20px' }}>ToyPangPang</div>
          <p style={{ color: '#888' }}>© 2026 토이팡팡 (ToyPangPang). All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
