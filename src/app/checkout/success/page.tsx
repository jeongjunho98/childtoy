'use client';

import Link from 'next/link';
import { useEffect } from 'react';
import { useCart } from '@/context/CartContext';
import homeStyles from '../../page.module.css';

export default function CheckoutSuccessPage() {
  const { clearCart } = useCart();

  // 페이지 진입 시 장바구니 비우기 (주문 완료 처리 시뮬레이션)
  useEffect(() => {
    clearCart();
  }, []);

  return (
    <div style={{ textAlign: 'center', padding: '100px 20px' }}>
      <header className={homeStyles.header} style={{ position: 'fixed', top: 0, width: '100%', left: 0 }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'center', width: '100%', alignItems: 'center' }}>
          <Link href="/" className={homeStyles.logo}>토이팡팡 🎈</Link>
        </div>
      </header>

      <div style={{ marginTop: '80px' }}>
        <h1 style={{ fontSize: '60px', marginBottom: '20px' }}>🎉 주문 완료! 🎉</h1>
        <p style={{ fontSize: '24px', color: '#555', marginBottom: '40px' }}>
          축하해요! 주문하신 장난감이 곧 출발합니다! 🚚💨
        </p>
        <div style={{ fontSize: '80px', marginBottom: '40px' }}>🧸🎁🤖</div>
        <Link 
          href="/" 
          style={{ 
            display: 'inline-block',
            padding: '15px 40px',
            background: 'var(--primary-blue)',
            color: 'white',
            borderRadius: '50px',
            fontWeight: 'bold',
            fontSize: '20px',
            textDecoration: 'none'
          }}
        >
          장난감 더 구경하기
        </Link>
      </div>
    </div>
  );
}
