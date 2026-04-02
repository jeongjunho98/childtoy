'use client';

import { useState, useEffect } from "react";
import Link from "next/link";
import styles from "./page.module.css";
import { products, Product } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";

const FlashTimer = () => {
  const [timeLeft, setTimeLeft] = useState(14400); // 4시간

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return <span className={styles.timer}>{formatTime(timeLeft)} 남음</span>;
};

const ProductCard = ({ product }: { product: Product }) => {
  const discountRate = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) 
    : 0;

  return (
    <Link href={`/products/${product.id}`} className={styles.card}>
      <div className={styles.imageArea}>
        <img src={product.image} alt={product.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      </div>
      <div className={styles.info}>
        <h3 className={styles.productTitle}>{product.name}</h3>
        <div className={styles.priceArea}>
          {product.originalPrice && (
            <div className={styles.originalPrice}>{product.originalPrice.toLocaleString()}원</div>
          )}
          <div className={styles.discountArea}>
            {discountRate > 0 && <span className={styles.discountRate}>{discountRate}%</span>}
            <span className={styles.currentPrice}>{product.price.toLocaleString()}원</span>
          </div>
          {product.isPangPang && <div className={styles.pangpangBadge}>🚀 팡팡배송</div>}
        </div>
        <div className={styles.socialInfo}>
          <span className={styles.stars}>{"★".repeat(Math.floor(product.rating))}</span>
          <span className={styles.reviewCount}>({product.reviewCount.toLocaleString()})</span>
        </div>
      </div>
    </Link>
  );
};

export default function Home() {
  const { cart } = useCart();
  const { user } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'robot', name: '로봇/변신', icon: '🤖' },
    { id: 'doll', name: '인형/피규어', icon: '🧸' },
    { id: 'car', name: '자동차/탈것', icon: '🚗' },
    { id: 'education', name: '교구/학습', icon: '📚' },
    { id: 'boardgame', name: '보드게임', icon: '🎲' },
  ];

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  return (
    <div className={styles.main}>
      {/* Utility Bar */}
      <div className={styles.utilityBar}>
        <div className="container">
          <div className={styles.utilityContent}>
            <Link href="/auth">로그인</Link>
            <Link href="/auth">회원가입</Link>
            <Link href="#">고객센터</Link>
            <Link href="#">주문배송조회</Link>
          </div>
        </div>
      </div>

      {/* Header */}
      <header className={styles.header}>
        <div className="container">
          <div className={styles.headerContent}>
            <Link href="/" className={styles.logo}>ToyPangPang</Link>
            <div className={styles.searchBar}>
              <input type="text" className={styles.searchInput} placeholder="찾고 싶은 장난감을 검색해보세요!" />
              <div className={styles.searchBtn}>🔍</div>
            </div>
            <div className={styles.headerIcons}>
              <Link href="/auth" className={styles.iconItem}>
                <span>👤</span>
                {user ? user.name : '마이팡'}
              </Link>
              <Link href="/cart" className={styles.iconItem}>
                <span>🛒</span>
                장바구니 ({cart.length})
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Bar */}
      <nav className={styles.navBar}>
        <div className="container">
          <div className={styles.navContent}>
            <div className={styles.categoryBtn}>☰ 카테고리</div>
            <Link href="#" className={styles.navItem}>팡팡배송 🚀</Link>
            <Link href="#" className={styles.navItem}>골드박스</Link>
            <Link href="#" className={styles.navItem}>베스트</Link>
            <Link href="#" className={styles.navItem}>기획전</Link>
          </div>
        </div>
      </nav>

      {/* Hero Banner */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>어린이날 미리 준비 특가! 🎁</h1>
          <p className={styles.heroSubtitle}>최대 50% 할인 + 팡팡배송으로 내일 바로 도착</p>
        </div>
      </section>

      <main className="container">
        {/* Quick Menu */}
        <div className={styles.quickMenu}>
          {categories.map(cat => (
            <button 
              key={cat.id} 
              className={styles.menuItem}
              onClick={() => setSelectedCategory(cat.id)}
            >
              <div className={styles.menuIcon}>{cat.icon}</div>
              <span>{cat.name}</span>
            </button>
          ))}
          <button className={styles.menuItem} onClick={() => setSelectedCategory('all')}>
            <div className={styles.menuIcon}>🔥</div>
            <span>전체보기</span>
          </button>
        </div>

        {/* Flash Deals Section */}
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>오늘의 골드박스 📦</h2>
            <FlashTimer />
          </div>
          <div className={styles.productGrid}>
            {products.slice(0, 4).map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        {/* Recommended Section */}
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>
              {selectedCategory === 'all' ? '추천 상품' : categories.find(c => c.id === selectedCategory)?.name + ' 추천'}
            </h2>
          </div>
          <div className={styles.productGrid}>
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className="container">
          <div className={styles.footerContent}>
            <div className={styles.footerLeft}>
              <div className={styles.footerLogo}>ToyPangPang</div>
              <div className={styles.companyInfo}>
                <p>(주)토이팡팡 | 대표이사: 재미나이 | 사업자등록번호: 123-45-67890</p>
                <p>서울특별시 강남구 테헤란로 123 토이타워 15층</p>
                <p>통신판매업신고: 2026-서울강남-1234호 | 개인정보보호책임자: 홍길동</p>
                <p>© 2026 ToyPangPang. All rights reserved.</p>
              </div>
            </div>
            <div className={styles.footerRight}>
              <div className={styles.csCenter}>
                <h3>고객센터</h3>
                <div className={styles.csNumber}>1588-1234</div>
                <p>365일 오전 9시 - 오후 6시 운영</p>
                <p>이메일: help@toypang.com</p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
