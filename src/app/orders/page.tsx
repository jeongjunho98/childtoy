'use client';

import Link from 'next/link';
import homeStyles from '../page.module.css';
import { useAuth } from '@/context/AuthContext';

export default function OrdersPage() {
  const { user } = useAuth();

  return (
    <div className={homeStyles.main}>
      <header className={homeStyles.header}>
        <div className="container" style={{ display: 'flex', alignItems: 'center' }}>
          <Link href="/" className={homeStyles.logo}>ToyPangPang</Link>
          <h1 style={{ marginLeft: '20px', fontSize: '20px' }}>주문/배송 조회</h1>
        </div>
      </header>
      <main className="container" style={{ padding: '60px 0' }}>
        <div style={{ background: 'white', padding: '40px', borderRadius: '12px', textAlign: 'center' }}>
          {!user ? (
            <>
              <h2>로그인이 필요한 서비스입니다.</h2>
              <p style={{ margin: '20px 0', color: '#666' }}>주문 내역을 확인하시려면 로그인을 해주세요.</p>
              <Link href="/auth?mode=login" style={{ 
                display: 'inline-block', 
                padding: '15px 40px', 
                background: '#0071e3', 
                color: 'white', 
                borderRadius: '8px',
                fontWeight: 'bold',
                textDecoration: 'none'
              }}>로그인하러 가기</Link>
            </>
          ) : (
            <>
              <h2>{user.name}님의 최근 주문 내역</h2>
              <div style={{ marginTop: '40px', borderTop: '1px solid #eee', padding: '40px 0' }}>
                <p style={{ color: '#aaa' }}>최근 3개월 내 주문하신 내역이 없습니다.</p>
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
}
