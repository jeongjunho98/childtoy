'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import styles from "./page.module.css";
import { PRODUCTS } from "@/data/products";
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

  return (
    <div className={styles.main}>
      <header className={styles.header}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
          <Link href="/" className={styles.logo}>토이팡팡 🎈</Link>
          <nav className={styles.nav}>
            <Link href="/">홈</Link>
            <Link href="#">카테고리</Link>
            <Link href="/auth">{user ? `${user.name}님` : '로그인'}</Link>
            <Link href="/cart">장바구니 ({cart.length})</Link>
          </nav>
        </div>
      </header>

      <section className={styles.hero}>
        <div className="container">
          <span className={styles.liveBadge}>LIVE 방송 중</span>
          <h1 className={styles.heroTitle}>지금 이 시간, 팡팡 터지는 할인가!</h1>
          <p style={{ fontSize: '20px', color: '#555' }}>오늘의 주인공: 슈퍼 히어로 로봇 세트 🤖</p>
          <LiveTimer />
        </div>
      </section>

      <main className="container">
        <h2 style={{ fontSize: '28px', margin: '60px 0 30px', textAlign: 'center' }}>🔥 오늘의 추천 장난감 🔥</h2>
        <div className={styles.productGrid}>
          {PRODUCTS.map((product) => (
            <div key={product.id} className={styles.card}>
              {product.tag && <span className={styles.tag}>{product.tag}</span>}
              <Link href={`/products/${product.id}`}>
                <div className={styles.imagePlaceholder}>
                  <Image 
                    src={product.imageUrl} 
                    alt={product.title} 
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    style={{ objectFit: 'cover' }}
                    priority={product.id <= 3}
                  />
                </div>
              </Link>
              <div className={styles.info}>
                <h3 className={styles.title}>{product.title}</h3>
                <p className={styles.price}>{product.price}원</p>
                <button 
                  className={styles.buyBtn}
                  onClick={() => addToCart(product)}
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
