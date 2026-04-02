'use client';

import Link from "next/link";
import { useRouter } from "next/navigation";
import styles from "./cart.module.css";
import homeStyles from "../page.module.css";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/context/AuthContext";

export default function CartPage() {
  const { cart, removeFromCart, totalPrice } = useCart();
  const { user } = useAuth();
  const router = useRouter();

  const handleCheckout = () => {
    if (cart.length === 0) return;
    router.push('/checkout');
  };

  return (
    <div>
      <header className={homeStyles.header}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
          <Link href="/" className={homeStyles.logo}>토이팡팡 🎈</Link>
          <nav className={homeStyles.nav}>
            <Link href="/">홈</Link>
            <Link href="/auth">{user ? `${user.name}님` : '로그인'}</Link>
            <Link href="/cart">장바구니 ({cart.length})</Link>
          </nav>
        </div>
      </header>

      <main className={styles.container}>
        <h1 className={styles.title}>내 장바구니 🛒</h1>

        {cart.length === 0 ? (
          <div className={styles.emptyMsg}>
            <p>장바구니가 비어 있습니다.</p>
            <Link href="/" style={{ color: 'var(--primary-blue)', textDecoration: 'underline', marginTop: '20px', display: 'inline-block' }}>장난감 구경하러 가기</Link>
          </div>
        ) : (
          <>
            <div className={styles.cartList}>
              {cart.map((item) => (
                <div key={item.id} className={styles.cartItem}>
                  <img 
                    className={styles.itemImage} 
                    src={item.imageUrl} 
                    alt={item.title} 
                    style={{ width: '80px', height: '80px', objectFit: 'cover', borderRadius: '8px' }}
                  />
                  <div className={styles.itemInfo}>
                    <div className={styles.itemName}>{item.title}</div>
                    <div className={styles.itemPrice}>{item.price}원 x {item.quantity}개</div>
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
              <div>
                <span>총 주문 금액:</span>
                <span className={styles.totalPrice}>{totalPrice.toLocaleString()}원</span>
              </div>
              <button className={styles.checkoutBtn} onClick={handleCheckout}>
                주문하기
              </button>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
