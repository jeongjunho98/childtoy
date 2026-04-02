'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from './checkout.module.css';
import homeStyles from '../page.module.css';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';

export default function CheckoutPage() {
  const { cart, totalPrice } = useCart();
  const { user } = useAuth();
  const router = useRouter();

  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [cardNumber, setCardNumber] = useState('');

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;
    
    // 결제 시뮬레이션 (딜레이)
    alert('결제 승인 중입니다... 잠시만 기다려주세요! 💳');
    setTimeout(() => {
      router.push('/checkout/success');
    }, 1500);
  };

  if (cart.length === 0) {
    return (
      <div className={styles.container} style={{ textAlign: 'center' }}>
        <h1 className={styles.title}>장바구니가 비어있어요!</h1>
        <Link href="/" style={{ color: 'var(--primary-blue)' }}>장난감 구경하러 가기</Link>
      </div>
    );
  }

  return (
    <div>
      <header className={homeStyles.header}>
        <div className="container" style={{ display: 'flex', justifyContent: 'center', width: '100%', alignItems: 'center' }}>
          <Link href="/" className={homeStyles.logo}>토이팡팡 🎈</Link>
        </div>
      </header>

      <main className={styles.container}>
        <h1 className={styles.title}>주문서 작성 🧾</h1>

        <form className={styles.form} onSubmit={handlePay}>
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>배송 정보</h2>
            <div className={styles.form}>
              <input 
                className={styles.input} 
                type="text" 
                placeholder="받는 사람" 
                defaultValue={user?.name || ''} 
                required 
              />
              <input 
                className={styles.input} 
                type="tel" 
                placeholder="연락처 (- 제외)" 
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required 
              />
              <input 
                className={styles.input} 
                type="text" 
                placeholder="배송 주소" 
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required 
              />
            </div>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>결제 정보</h2>
            <div className={styles.form}>
              <input 
                className={styles.input} 
                type="text" 
                placeholder="카드 번호 (16자리)" 
                maxLength={16}
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                required 
              />
              <div style={{ display: 'flex', gap: '10px' }}>
                <input className={styles.input} style={{ flex: 1 }} type="text" placeholder="MM/YY" required />
                <input className={styles.input} style={{ flex: 1 }} type="password" placeholder="CVC" maxLength={3} required />
              </div>
            </div>
          </section>

          <div className={styles.summary}>
            <div className={styles.summaryRow}>
              <span>총 상품 금액</span>
              <span>{totalPrice.toLocaleString()}원</span>
            </div>
            <div className={styles.summaryRow}>
              <span>배송비</span>
              <span>3,000원</span>
            </div>
            <div className={styles.summaryRow} style={{ fontWeight: 'bold', fontSize: '20px', color: 'var(--primary-pink)', marginTop: '10px' }}>
              <span>최종 결제 금액</span>
              <span>{(totalPrice + 3000).toLocaleString()}원</span>
            </div>
          </div>

          <button className={styles.payBtn} type="submit">
            결제하기
          </button>
        </form>
      </main>
    </div>
  );
}
