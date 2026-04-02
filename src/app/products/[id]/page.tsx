'use client';

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import styles from "./product.module.css";
import homeStyles from "../../page.module.css";
import { products, Review } from "@/data/products";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";

export default function ProductDetail() {
  const params = useParams();
  const router = useRouter();
  const { addToCart, cart } = useCart();
  const { user, logout } = useAuth();
  
  const id = params.id as string;
  const product = products.find((p) => p.id === id);

  const [reviews, setReviews] = useState<Review[]>([]);
  const [newReviewContent, setNewReviewContent] = useState('');
  const [rating, setRating] = useState(5);

  useEffect(() => {
    if (product) {
      const savedReviews = localStorage.getItem(`reviews_${product.id}`);
      if (savedReviews) {
        setReviews(JSON.parse(savedReviews));
      } else {
        setReviews(product.reviews || []);
      }
    }
  }, [product]);

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      alert('로그인이 필요한 기능입니다.');
      router.push('/auth');
      return;
    }

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
    alert('리뷰가 등록되었습니다! ✨');
  };

  if (!product) {
    return <div className="container">상품을 찾을 수 없습니다.</div>;
  }

  return (
    <div className={homeStyles.main}>
      {/* Utility Bar */}
      <div className={homeStyles.utilityBar}>
        <div className="container" style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
          {user && <span style={{ fontWeight: '800', color: '#555', fontSize: '12px' }}>✨ {user.name} 친구, 반가워요!</span>}
          <Link href="/cs" className={homeStyles.utilityLink}>고객센터</Link>
          <Link href="/orders" className={homeStyles.utilityLink}>배송조회</Link>
          {user && <button onClick={logout} className={homeStyles.utilityLink}>로그아웃</button>}
        </div>
      </div>

      {/* Improved Header */}
      <header className={homeStyles.header}>
        <div className="container">
          <div className={homeStyles.headerContent}>
            <Link href="/" className={homeStyles.logo}>토이팡팡 🎈</Link>
            <div className={homeStyles.searchBar}>
              <input type="text" className={homeStyles.searchInput} placeholder="어떤 장난감을 찾고 있나요?" />
              <div className={homeStyles.searchBtn}>🔍</div>
            </div>
            <div className={homeStyles.headerIcons}>
              <Link href="/auth" className={homeStyles.iconItem}>
                <span className={homeStyles.icon}>👤</span>
                <span className={homeStyles.iconText}>{user ? '내정보' : '로그인'}</span>
              </Link>
              <Link href="/cart" className={homeStyles.iconItem}>
                <span className={homeStyles.icon}>🛒</span>
                <span className={homeStyles.iconText}>장바구니</span>
                <span className={homeStyles.cartBadge}>{cart.length}</span>
              </Link>
            </div>
          </div>
        </div>
      </header>

      <main className={styles.container}>
        <div className={styles.detailWrapper}>
          <div className={styles.imageArea} style={{ background: '#fff' }}>
            <img 
              src={product.image} 
              alt={product.name} 
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
          </div>
          <div className={styles.infoArea}>
            <h1 className={styles.title}>{product.name}</h1>
            <p className={styles.price}>{product.price.toLocaleString()}원</p>
            <p className={styles.description}>{product.description}</p>
            
            <div className={styles.btnGroup}>
              <button 
                className={styles.cartBtn}
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
              <button 
                className={styles.buyBtn}
                onClick={() => {
                  addToCart({
                    id: parseInt(product.id),
                    title: product.name,
                    price: product.price.toLocaleString(),
                    imageUrl: product.image,
                    description: product.description
                  });
                  router.push('/checkout');
                }}
              >
                바로 구매하기
              </button>
            </div>
          </div>
        </div>

        <section className={styles.reviewSection}>
          <h2 className={styles.reviewTitle}>솔직한 리뷰 📝 ({reviews.length})</h2>
          
          <form className={styles.reviewForm} onSubmit={handleAddReview}>
            <div style={{ marginBottom: '10px' }}>
              <span>별점 선택: </span>
              <select 
                value={rating} 
                onChange={(e) => setRating(Number(e.target.value))}
                style={{ padding: '5px', borderRadius: '5px' }}
              >
                {[5,4,3,2,1].map(n => <option key={n} value={n}>{'⭐'.repeat(n)}</option>)}
              </select>
            </div>
            <textarea 
              className={styles.reviewInput}
              placeholder={user ? "아이들이 얼마나 좋아했나요? 리뷰를 남겨주세요!" : "로그인 후 리뷰를 작성할 수 있습니다."}
              value={newReviewContent}
              onChange={(e) => setNewReviewContent(e.target.value)}
              required
              disabled={!user}
            />
            <button className={styles.submitReviewBtn} type="submit" disabled={!user}>
              리뷰 등록하기
            </button>
          </form>

          <div className={styles.reviewList}>
            {reviews.length === 0 ? (
              <p style={{ color: '#aaa', textAlign: 'center' }}>아직 리뷰가 없습니다. 첫 번째 리뷰를 남겨보세요!</p>
            ) : (
              reviews.map((r) => (
                <div key={r.id} className={styles.reviewItem}>
                  <div className={styles.reviewHeader}>
                    <span className={styles.userName}>{r.userName}</span>
                    <span className={styles.rating}>{'⭐'.repeat(r.rating)}</span>
                    <span style={{ color: '#ccc', fontSize: '13px' }}>{r.date}</span>
                  </div>
                  <p>{r.content}</p>
                </div>
              ))
            )}
          </div>
        </section>
      </main>
    </div>
  );
}
