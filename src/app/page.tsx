'use client';

import { useState, useEffect, useRef } from "react";
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

  return <span className={styles.timer}>⏰ {formatTime(timeLeft)} 남았어요!</span>;
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
          {product.isPangPang && <div className={styles.pangpangBadge}>🚀 내일 도착!</div>}
        </div>
        <div className={styles.socialInfo}>
          <span className={styles.stars}>{"★".repeat(Math.floor(product.rating))}</span>
          <span className={styles.reviewCount}>({product.reviewCount.toLocaleString()}명의 친구들)</span>
        </div>
      </div>
    </Link>
  );
};

export default function Home() {
  const { cart } = useCart();
  const { user, logout } = useAuth();
  
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [specialFilter, setSpecialFilter] = useState<string | null>(null);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const categoryRef = useRef<HTMLDivElement>(null);
  const goldBoxRef = useRef<HTMLElement>(null);
  const productListRef = useRef<HTMLElement>(null);

  const categories = [
    { id: 'robot', name: '멋진 로봇', icon: '🤖' },
    { id: 'doll', name: '귀여운 인형', icon: '🧸' },
    { id: 'car', name: '쌩쌩 자동차', icon: '🚗' },
    { id: 'education', name: '똑똑한 교구', icon: '📚' },
    { id: 'boardgame', name: '꿀잼 게임', icon: '🎲' },
  ];

  // 필터링 로직 개선
  let filteredProducts = [...products];
  if (specialFilter === 'pangpang') {
    filteredProducts = products.filter(p => p.isPangPang);
  } else if (specialFilter === 'best') {
    filteredProducts = [...products].sort((a, b) => b.reviewCount - a.reviewCount).slice(0, 8);
  } else if (specialFilter === 'sale') {
    filteredProducts = products.filter(p => p.originalPrice && (p.originalPrice > p.price));
  } else if (selectedCategory !== 'all') {
    filteredProducts = products.filter(p => p.category === selectedCategory);
  }

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (categoryRef.current && !categoryRef.current.contains(event.target as Node)) {
        setIsCategoryOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleCategorySelect = (id: string) => {
    setSelectedCategory(id);
    setSpecialFilter(null);
    setIsCategoryOpen(false);
    productListRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSpecialFilter = (filter: string) => {
    setSpecialFilter(filter);
    setSelectedCategory('all');
    productListRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToGoldBox = () => {
    goldBoxRef.current?.scrollIntoView({ behavior: 'smooth' });
    setSpecialFilter(null);
    setSelectedCategory('all');
  };

  const resetFilters = () => {
    setSelectedCategory('all');
    setSpecialFilter(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const getSectionTitle = () => {
    if (specialFilter === 'pangpang') return "🚀 슈웅~ 팡팡배송 상품!";
    if (specialFilter === 'best') return "🏆 지금 제일 잘 나가요!";
    if (specialFilter === 'sale') return "🎁 와! 신나는 할인 파티!";
    if (selectedCategory !== 'all') return categories.find(c => c.id === selectedCategory)?.name + " 모여라!";
    return "친구들에게 추천하는 상품";
  };

  return (
    <div className={styles.main}>
      <div className={styles.utilityBar}>
        <div className="container" style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
          {user && <span style={{ fontWeight: '800', color: '#555', fontSize: '12px' }}>✨ {user.name} 친구, 반가워요!</span>}
          <Link href="/cs" className={styles.utilityLink}>고객센터</Link>
          <Link href="/orders" className={styles.utilityLink}>배송조회</Link>
          {user && <button onClick={logout} className={styles.utilityLink}>로그아웃</button>}
        </div>
      </div>

      <header className={styles.header}>
        <div className="container">
          <div className={styles.headerContent}>
            <div onClick={resetFilters} style={{ cursor: 'pointer' }} className={styles.logo}>토이팡팡 🎈</div>
            <div className={styles.searchBar}>
              <input type="text" className={styles.searchInput} placeholder="어떤 장난감을 찾고 있나요?" />
              <div className={styles.searchBtn}>🔍</div>
            </div>
            <div className={styles.headerIcons}>
              <Link href="/auth" className={styles.iconItem}>
                <span className={styles.icon}>👤</span>
                <span className={styles.iconText}>{user ? '내정보' : '로그인'}</span>
              </Link>
              <Link href="/cart" className={styles.iconItem}>
                <span className={styles.icon}>🛒</span>
                <span className={styles.iconText}>장바구니</span>
                <span className={styles.cartBadge}>{cart.length}</span>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <nav className={styles.navBar}>
        <div className="container">
          <div className={styles.navContent}>
            <div className={styles.categoryMenuWrapper} ref={categoryRef}>
              <div className={styles.categoryBtn} onClick={() => setIsCategoryOpen(!isCategoryOpen)}>
                🌈 장난감 카테고리
              </div>
              {isCategoryOpen && (
                <div className={styles.categoryDropdown}>
                  <div className={styles.categoryItem} onClick={() => { resetFilters(); setIsCategoryOpen(false); }}>
                    ✨ 모두보기
                  </div>
                  {categories.map(cat => (
                    <div key={cat.id} className={styles.categoryItem} onClick={() => handleCategorySelect(cat.id)}>
                      {cat.icon} {cat.name}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <button className={`${styles.navItem} ${!specialFilter && selectedCategory === 'all' ? styles.activeNavItem : ''}`} onClick={resetFilters}>전체상품</button>
            <button className={`${styles.navItem} ${specialFilter === 'pangpang' ? styles.activeNavItem : ''}`} onClick={() => handleSpecialFilter('pangpang')}>팡팡배송 🚀</button>
            <button className={styles.navItem} onClick={scrollToGoldBox}>황금상자</button>
            <button className={`${styles.navItem} ${specialFilter === 'best' ? styles.activeNavItem : ''}`} onClick={() => handleSpecialFilter('best')}>인기짱!</button>
            <button className={`${styles.navItem} ${specialFilter === 'sale' ? styles.activeNavItem : ''}`} onClick={() => handleSpecialFilter('sale')}>반값파티</button>
          </div>
        </div>
      </nav>

      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>장난감 나라에 오신걸 환영해요! 🏰</h1>
          <p className={styles.heroSubtitle}>매일매일 새로운 즐거움이 팡팡 터져요 ✨</p>
        </div>
      </section>

      <main className="container">
        <div className={styles.quickMenu}>
          {categories.map(cat => (
            <button key={cat.id} className={`${styles.menuItem} ${selectedCategory === cat.id ? styles.activeMenu : ''}`} onClick={() => handleCategorySelect(cat.id)}>
              <div className={styles.menuIcon}>{cat.icon}</div>
              <span>{cat.name}</span>
            </button>
          ))}
          <button className={`${styles.menuItem} ${selectedCategory === 'all' && !specialFilter ? styles.activeMenu : ''}`} onClick={resetFilters}>
            <div className={styles.menuIcon}>🎈</div>
            <span>모두보기</span>
          </button>
        </div>

        <section className={styles.section} ref={goldBoxRef}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>오늘의 황금상자 📦</h2>
            <FlashTimer />
          </div>
          <div className={styles.productGrid}>
            {products.slice(0, 4).map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        <section className={styles.section} ref={productListRef}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>{getSectionTitle()}</h2>
          </div>
          <div className={styles.productGrid}>
            {filteredProducts.length > 0 ? (
              filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))
            ) : (
              <p style={{ gridColumn: '1/-1', textAlign: 'center', padding: '100px 0', fontSize: '20px', color: '#aaa' }}>
                아쉽게도 조건에 맞는 장난감이 없어요.. 😢
              </p>
            )}
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <div className="container">
          <div className={styles.footerContent} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div className={styles.footerLeft}>
              <div className={styles.footerLogo}>토이팡팡 🎈</div>
              <div className={styles.companyInfo} style={{ fontSize: '14px', lineHeight: '1.8' }}>
                <p>우리아이 장난감 친구 <strong>토이팡팡</strong></p>
                <p>(주)토이팡팡 | 대표이사: 정준호 | 전라남도 나주시 중야1길 37 대방엘리움1차아파트 106동 1401호</p>
                <p>© 2026 ToyPangPang. All rights reserved.</p>
              </div>
            </div>
            <div className={styles.footerRight} style={{ textAlign: 'right' }}>
              <div className={styles.csCenter}>
                <h3 style={{ fontSize: '20px', marginBottom: '10px' }}>도움이 필요하신가요?</h3>
                <div className={styles.csNumber}>010-4851-7984</div>
                <p>친구들의 웃음을 위해 언제나 열려있어요!</p>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
