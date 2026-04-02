'use client';

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import styles from "./cart.module.css";
import homeStyles from "../page.module.css";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";

export default function CartPage() {
  const { cart, removeFromCart, totalPrice } = useCart();
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleCheckout = () => {
    if (cart.length === 0) return;
    router.push('/checkout');
  };

  return (
    <div className={homeStyles.main}>
      {/* 최신 통합 헤더 적용 */}
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
        <h1 className={styles.title}>내 장바구니 🛒</h1>

        {cart.length === 0 ? (
          <div className={styles.emptyMsg}>
            <p>장바구니가 텅 비어있어요.. 😢</p>
            <Link href="/" className={styles.backBtn}>장난감 구경하러 가기</Link>
          </div>
        ) : (
          <div className={styles.cartContent}>
            <div className={styles.cartList}>
              {cart.map((item) => (
                <div key={item.id} className={styles.cartItem}>
                  <div className={styles.imageWrapper}>
                    <Image 
                      src={item.imageUrl} 
                      alt={item.title} 
                      fill 
                      style={{ objectFit: 'cover' }}
                      className={styles.roundedImg}
                    />
                  </div>
                  <div className={styles.itemInfo}>
                    <div className={styles.itemName}>{item.title}</div>
                    <div className={styles.itemPrice}>{item.price}원</div>
                    <div className={styles.itemQty}>수량: {item.quantity}개</div>
                  </div>
                  <button 
                    className={styles.removeBtn}
                    onClick={() => removeFromCart(item.id)}
                  >
                    삭제
                  </button>
                </div>
              ))}
            </div>

            <div className={styles.totalSection}>
              <div className={styles.summaryRow}>
                <span>총 주문 금액</span>
                <span className={styles.totalPrice}>{totalPrice.toLocaleString()}원</span>
              </div>
              <button className={styles.checkoutBtn} onClick={handleCheckout}>
                신나게 주문하기 🚀
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
