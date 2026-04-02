'use client';

import { useState, useEffect, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import styles from "./product.module.css";
import homeStyles from "../../page.module.css";
import { products as staticProducts, Review } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";
import { getProductById } from "@/app/actions/product";

export default function ProductDetail() {
  const params = useParams();
  const router = useRouter();
  const { addToCart, setDirectBuy, cart } = useCart();
  const { user, logout } = useAuth();
  
  const id = params.id as string;
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('detail');

  const [reviews, setReviews] = useState<Review[]>([]);
  const [newReviewContent, setNewReviewContent] = useState('');
  const [rating, setRating] = useState(5);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      const data = await getProductById(id);
      if (data) setProduct(data);
      else setProduct(staticProducts.find(p => p.id === id));
      setLoading(false);
    };
    fetchProduct();
  }, [id]);

  useEffect(() => {
    if (product) {
      const savedReviews = localStorage.getItem(`reviews_${product.id}`);
      if (savedReviews) setReviews(JSON.parse(savedReviews));
      else setReviews(product.reviews || []);
    }
  }, [product]);

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) { router.push('/auth?mode=login'); return; }
    const newReview: Review = {
      id: Date.now().toString(),
      userName: user.name,
      rating: rating,
      content: newReviewContent,
      date: new Date().toISOString().split('T')[0]
    };
    const updatedReviews = [newReview, ...reviews];
    setReviews(updatedReviews);
    localStorage.setItem(`reviews_${id}`, JSON.stringify(updatedReviews));
    setNewReviewContent('');
    alert('소중한 리뷰가 등록되었습니다! ✨');
  };

  if (loading) return <div className={homeStyles.main} style={{padding:'100px 0', textAlign:'center'}}>상품 정보를 불러오는 중... 🎈</div>;
  if (!product) return <div className={homeStyles.main} style={{padding:'100px 0', textAlign:'center'}}>상품을 찾을 수 없습니다.</div>;

  const discountRate = product.originalPrice ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) : 0;

  return (
    <div className={homeStyles.main}>
      {/* Header */}
      <div className={homeStyles.utilityBar}>
        <div className="container" style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
          {user && <span className={homeStyles.welcomeMsg}>✨ {user.name} 친구 반가워요!</span>}
          <Link href="/cs" className={homeStyles.utilityLink}>고객센터</Link>
          <Link href="/orders" className={homeStyles.utilityLink}>배송조회</Link>
          {user && <button onClick={logout} className={homeStyles.utilityLink}>로그아웃</button>}
        </div>
      </div>

      <header className={homeStyles.header}>
        <div className="container">
          <div className={homeStyles.headerContent}>
            <Link href="/" className={homeStyles.logo}>토이팡팡 🎈</Link>
            <div style={{ flex: 1 }}></div>
            <div className={homeStyles.headerIcons}>
              <Link href="/auth" className={homeStyles.iconItem}>
                <div className={homeStyles.icon}>👤</div>
                <span className={homeStyles.iconText}>{user ? '내정보' : '로그인'}</span>
              </Link>
              <Link href="/cart" className={homeStyles.iconItem}>
                <div className={homeStyles.icon}>🛒</div>
                <span className={homeStyles.iconText}>장바구니</span>
                <span className={homeStyles.cartBadge}>{cart.length}</span>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className={styles.container}>
        {/* 상단 요약 섹션 */}
        <div className={styles.detailWrapper}>
          <div className={styles.imageArea}>
            <Image src={product.image} alt={product.name} fill style={{ objectFit: 'cover' }} priority />
          </div>
          <div className={styles.infoArea}>
            <span className={styles.brandName}>{product.brand || '토이팡팡'}</span>
            <h1 className={styles.title}>{product.name}</h1>
            <div className={styles.ratingRow}>
              <span className={styles.stars}>{"★".repeat(Math.floor(product.rating || 5))}</span>
              <span>{product.reviewCount?.toLocaleString()}개 상품평</span>
            </div>

            <div className={styles.priceArea}>
              {product.originalPrice && <div className={styles.originalPrice}>{product.originalPrice.toLocaleString()}원</div>}
              <div className={styles.currentPrice}>
                {discountRate > 0 && <span className={styles.discountBadge}>{discountRate}%</span>}
                {product.price.toLocaleString()}원
              </div>
            </div>

            <div className={styles.deliveryInfo}>
              <span className={styles.deliveryTitle}>🚀 팡팡배송 무료배송</span>
              <p style={{fontSize:'14px', color:'#555'}}>내일(금) 4/4 도착 보장 (밤 12시 전 주문 시)</p>
            </div>

            <div className={styles.btnGroup}>
              <button className={styles.cartBtn} onClick={() => {
                addToCart({...product, price: product.price.toLocaleString(), title: product.name, imageUrl: product.image});
                alert('장바구니에 담겼습니다! 🛒');
              }}>장바구니 담기</button>
              <button className={styles.buyBtn} onClick={() => {
                setDirectBuy({...product, price: product.price.toLocaleString(), title: product.name, imageUrl: product.image});
                router.push('/checkout');
              }}>바로 구매하기</button>
            </div>
          </div>
        </div>

        {/* 탭 메뉴 */}
        <nav className={styles.tabMenu}>
          <div className={`${styles.tabItem} ${activeTab === 'detail' ? styles.activeTab : ''}`} onClick={() => setActiveTab('detail')}>상품상세</div>
          <div className={`${styles.tabItem} ${activeTab === 'review' ? styles.activeTab : ''}`} onClick={() => setActiveTab('review')}>리뷰 ({reviews.length})</div>
          <div className={`${styles.tabItem} ${activeTab === 'info' ? styles.activeTab : ''}`} onClick={() => setActiveTab('info')}>상품정보</div>
        </nav>

        {/* 탭 내용 영역 */}
        {activeTab === 'detail' && (
          <div className={styles.detailContent}>
            <p className={styles.detailText}>{product.description}</p>
            {product.detailImage && (
              <div className={styles.detailImageWrapper}>
                <img src={product.detailImage} alt="상세설명" style={{ width: '100%', maxWidth: '800px' }} />
              </div>
            )}
            <div style={{marginTop:'40px'}}>
              <h3 style={{fontWeight:900, fontSize:'24px', marginBottom:'20px'}}>우리 아이를 위한 최고의 선택 🎁</h3>
              <p style={{color:'#777'}}>토이팡팡은 엄격한 품질 검사를 거친 정품만을 판매합니다.</p>
            </div>
          </div>
        )}

        {activeTab === 'review' && (
          <section className={styles.reviewSection}>
            <div className={styles.reviewHeaderRow}>
              <h2 className={styles.reviewTitle}>솔직한 리뷰 📝</h2>
              <div className={styles.reviewStats}>
                <span>평점 {product.rating?.toFixed(1) || '5.0'}</span>
                <span>{'⭐'.repeat(Math.floor(product.rating || 5))}</span>
              </div>
            </div>

            <form className={styles.reviewForm} onSubmit={handleAddReview}>
              <div className={styles.ratingSelect}>
                <span>별점 선택: </span>
                <select value={rating} onChange={(e) => setRating(Number(e.target.value))} style={{ padding: '8px', borderRadius: '10px', border: '1px solid #ddd' }}>
                  {[5,4,3,2,1].map(n => <option key={n} value={n}>{'⭐'.repeat(n)}</option>)}
                </select>
              </div>
              <textarea 
                className={styles.reviewInput} 
                placeholder={user ? "사용 후기를 길고 자세하게 남겨주세요! 다른 친구들에게 큰 도움이 됩니다. ✨" : "로그인 후 작성이 가능합니다."} 
                value={newReviewContent} 
                onChange={(e) => setNewReviewContent(e.target.value)} 
                required 
                disabled={!user} 
              />
              <button className={styles.submitReviewBtn} type="submit" disabled={!user}>리뷰 등록하기</button>
            </form>

            <div className={styles.reviewList}>
              {reviews.length === 0 ? <p style={{textAlign:'center', color:'#ccc', padding: '50px 0'}}>아직 리뷰가 없습니다. 첫 번째 리뷰의 주인공이 되어보세요! 🎈</p> :
                reviews.map((r) => (
                  <div key={r.id} className={styles.reviewItem}>
                    <div className={styles.reviewUserRow}>
                      <span className={styles.userName}>{r.userName}</span>
                      <span className={styles.reviewDate}>{r.date}</span>
                    </div>
                    <span className={styles.itemStars}>{'★'.repeat(r.rating)}</span>
                    <p className={styles.reviewContentText}>{r.content}</p>
                  </div>
                ))
              }
            </div>
          </section>
        )}

        {activeTab === 'info' && (
          <div className={styles.detailContent}>
            <h2 style={{textAlign:'left', fontWeight:900, marginBottom:'20px'}}>상품 정보 고시 📋</h2>
            <table className={styles.infoTable}>
              <tbody>
                <tr><th>브랜드</th><td>{product.brand || '토이팡팡'}</td></tr>
                <tr><th>제조사</th><td>{product.manufacturer || '(주)토이팡팡 협력사'}</td></tr>
                <tr><th>권장연령</th><td>{product.ageRange || '3세 이상'}</td></tr>
                <tr><th>KC인증 유무</th><td>인증 유 (인증번호: CB063R1234-5678)</td></tr>
                <tr><th>소재</th><td>ABS, PP 외</td></tr>
                <tr><th>제조국</th><td>대한민국 / 중국</td></tr>
                <tr><th>AS 책임자</th><td>토이팡팡 고객센터 (010-4851-7984)</td></tr>
              </tbody>
            </table>
          </div>
        )}
      </main>
    </div>
  );
}
