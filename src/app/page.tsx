'use client';

import { useState, useEffect, useRef, useMemo, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import { products as staticProducts, Product } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { getProducts } from "./actions/product";

const FlashTimer = () => {
  const [timeLeft, setTimeLeft] = useState(14400);
  useEffect(() => {
    const timer = setInterval(() => setTimeLeft(p => p > 0 ? p - 1 : 0), 1000);
    return () => clearInterval(timer);
  }, []);
  const formatTime = (s: number) => {
    const h = Math.floor(s / 3600);
    const m = Math.floor((s % 3600) / 60);
    const sec = s % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
  };
  return <span className={styles.timer}>⏰ {formatTime(timeLeft)}</span>;
};

const ProductCard = ({ product }: { product: Product }) => {
  const { addToCart, setDirectBuy } = useCart();
  const router = useRouter();
  const discountRate = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) 
    : 0;

  return (
    <div className={styles.card} onClick={() => router.push(`/products/${product.id}`)}>
      <div className={styles.imageArea}>
        <Image 
          src={product.image} 
          alt={product.name} 
          fill 
          sizes="(max-width: 768px) 50vw, 20vw"
          style={{ objectFit: 'cover' }}
          className={styles.optimizedImage}
        />
      </div>
      <div className={styles.info}>
        <h3 className={styles.productTitle}>{product.name}</h3>
        <div className={styles.priceArea}>
          {product.originalPrice && <div className={styles.originalPrice}>{product.originalPrice.toLocaleString()}원</div>}
          <div className={styles.discountArea}>
            {discountRate > 0 && <span className={styles.discountRate}>{discountRate}%</span>}
            <span className={styles.currentPrice}>{product.price.toLocaleString()}원</span>
          </div>
          {product.isPangPang && <div className={styles.pangpangBadge}>🚀 내일도착</div>}
        </div>
        <div className={styles.socialInfo}>
          <span className={styles.stars}>{"★".repeat(Math.floor(product.rating))}</span>
          <span className={styles.reviewCount}>({product.reviewCount.toLocaleString()})</span>
        </div>
        <div className={styles.cardBtns}>
          <button onClick={(e) => {
            e.stopPropagation();
            addToCart({...product, price: product.price.toLocaleString(), title: product.name, imageUrl: product.image});
            alert('장바구니에 쏙! 🛒');
          }} className={styles.miniCartBtn}>장바구니</button>
          <button onClick={(e) => {
            e.stopPropagation();
            setDirectBuy({...product, price: product.price.toLocaleString(), title: product.name, imageUrl: product.image});
            router.push('/checkout');
          }} className={styles.miniBuyBtn}>바로구매</button>
        </div>
      </div>
    </div>
  );
};

export default function Home() {
  const { cart } = useCart();
  const { user, logout } = useAuth();
  const router = useRouter();
  
  const [dbProducts, setDbProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [specialFilter, setSpecialFilter] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
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

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await getProducts();
      if (data && data.length > 0) setDbProducts(data as any);
      else setDbProducts(staticProducts);
    };
    fetchProducts();
  }, []);

  const filteredProducts = useMemo(() => {
    const listToFilter = dbProducts.length > 0 ? dbProducts : staticProducts;
    let list = [...listToFilter];
    if (searchTerm) {
      list = list.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()) || p.description.toLowerCase().includes(searchTerm.toLowerCase()));
    }
    if (specialFilter === 'pangpang') list = list.filter(p => p.isPangPang);
    else if (specialFilter === 'best') list = list.sort((a, b) => b.reviewCount - a.reviewCount).slice(0, 12);
    else if (specialFilter === 'sale') list = list.filter(p => p.originalPrice && (p.originalPrice > p.price));
    if (selectedCategory !== 'all') list = list.filter(p => p.category === selectedCategory);
    return list;
  }, [dbProducts, selectedCategory, specialFilter, searchTerm]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setSpecialFilter(null);
    setSelectedCategory('all');
    productListRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    const clickOutside = (e: MouseEvent) => {
      if (categoryRef.current && !categoryRef.current.contains(e.target as Node)) setIsCategoryOpen(false);
    };
    document.addEventListener("mousedown", clickOutside);
    return () => document.removeEventListener("mousedown", clickOutside);
  }, []);

  return (
    <div className={styles.main}>
      <div className={styles.utilityBar}>
        <div className="container" style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
          <span className={styles.welcomeMsg}>{user ? `✨ ${user.name} 친구 반가워요!` : '반가워요! 로그인을 해주세요'}</span>
          <Link href="/cs" className={styles.utilityLink}>고객센터</Link>
          <Link href="/orders" className={styles.utilityLink}>배송조회</Link>
          {user && <button onClick={logout} className={styles.utilityLink}>로그아웃</button>}
        </div>
      </div>

      <header className={styles.header}>
        <div className="container">
          <div className={styles.headerContent}>
            <div onClick={() => { setSearchTerm(''); setSpecialFilter(null); setSelectedCategory('all'); window.scrollTo(0,0); }} className={styles.logo}>토이팡팡 🎈</div>
            <form className={styles.searchBar} onSubmit={handleSearch}>
              <input type="text" className={styles.searchInput} placeholder="검색어 입력 (예: 카봇, 티니핑)" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
              <button type="submit" className={styles.searchBtn}>🔍</button>
            </form>
            <div className={styles.headerIcons}>
              <Link href="/auth" className={styles.iconItem}>
                <div className={styles.icon}>👤</div>
                <span className={styles.iconText}>{user ? '내정보' : '로그인'}</span>
              </Link>
              <Link href="/cart" className={styles.iconItem}>
                <div className={styles.icon}>🛒</div>
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
              <div className={styles.categoryBtn} onClick={() => setIsCategoryOpen(!isCategoryOpen)}>🌈 카테고리</div>
              {isCategoryOpen && (
                <div className={styles.categoryDropdown}>
                  <div className={styles.categoryItem} onClick={() => { setSelectedCategory('all'); setIsCategoryOpen(false); }}>✨ 모두보기</div>
                  {categories.map(cat => (
                    <div key={cat.id} className={styles.categoryItem} onClick={() => { setSelectedCategory(cat.id); setSpecialFilter(null); setIsCategoryOpen(false); }}>{cat.icon} {cat.name}</div>
                  ))}
                </div>
              )}
            </div>
            <button className={`${styles.navItem} ${specialFilter === 'pangpang' ? styles.activeNavItem : ''}`} onClick={() => { setSpecialFilter('pangpang'); setSelectedCategory('all'); }}>팡팡배송 🚀</button>
            <button className={styles.navItem} onClick={() => goldBoxRef.current?.scrollIntoView({behavior:'smooth'})}>황금상자</button>
            <button className={`${styles.navItem} ${specialFilter === 'best' ? styles.activeNavItem : ''}`} onClick={() => { setSpecialFilter('best'); setSelectedCategory('all'); }}>인기짱!</button>
            <button className={`${styles.navItem} ${specialFilter === 'sale' ? styles.activeNavItem : ''}`} onClick={() => { setSpecialFilter('sale'); setSelectedCategory('all'); }}>반값파티</button>
          </div>
        </div>
      </nav>

      <main className="container">
        <section className={styles.hero}>
          <div className={styles.heroContent}>
            <h1 className={styles.heroTitle}>우리 아이를 위한 특별한 선물 🏰</h1>
            <p className={styles.heroSubtitle}>품격 있는 고퀄리티 장난감을 만나보세요 ✨</p>
          </div>
        </section>

        <div className={styles.quickMenu}>
          {categories.map(cat => (
            <button key={cat.id} className={`${styles.menuItem} ${selectedCategory === cat.id ? styles.activeMenu : ''}`} onClick={() => { setSelectedCategory(cat.id); setSpecialFilter(null); }}>
              <div className={styles.menuIcon}>{cat.icon}</div>
              <span>{cat.name}</span>
            </button>
          ))}
          <button className={`${styles.menuItem} ${selectedCategory === 'all' && !specialFilter && !searchTerm ? styles.activeMenu : ''}`} onClick={() => { setSelectedCategory('all'); setSpecialFilter(null); setSearchTerm(''); }}>
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
            {(dbProducts.length > 0 ? dbProducts : staticProducts).slice(0, 4).map(product => (
              <ProductCard key={product.id} product={product as any} />
            ))}
          </div>
        </section>

        <section className={styles.section} ref={productListRef}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>
              {searchTerm ? `'${searchTerm}' 검색 결과` : 
               specialFilter === 'pangpang' ? '🚀 팡팡배송 상품' :
               specialFilter === 'best' ? '🏆 인기짱! 베스트' :
               selectedCategory !== 'all' ? categories.find(c => c.id === selectedCategory)?.name : '추천 상품'}
            </h2>
          </div>
          <div className={styles.productGrid}>
            {filteredProducts.length > 0 ? (
              filteredProducts.map(product => (
                <ProductCard key={product.id} product={product as any} />
              ))
            ) : (
              <div className={styles.noResult}>
                <p>찾으시는 장난감이 없어요.. 😢</p>
                <button onClick={() => {setSearchTerm(''); setSelectedCategory('all');}} className={styles.resetBtn}>전체 상품 보기</button>
              </div>
            )}
          </div>
        </section>
      </main>

      <footer className={styles.footer}>
        <div className="container">
          <div className={styles.footerContent}>
            <div className={styles.footerLeft}>
              <div className={styles.footerLogo}>토이팡팡 🎈</div>
              <div className={styles.companyInfo}>
                <p>(주)토이팡팡 | 대표이사: 정준호 | 전라남도 나주시 중야1길 37</p>
                <p>© 2026 ToyPangPang. All rights reserved.</p>
              </div>
            </div>
            <div className={styles.footerRight}>
              <div className={styles.csCenter}>
                <h3>도움이 필요하신가요?</h3>
                <div className={styles.csNumber}>010-4851-7984</div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
