'use client';

import Link from 'next/link';
import homeStyles from '../page.module.css';
import styles from './cs.module.css';

export default function CustomerServicePage() {
  return (
    <div className={homeStyles.main}>
      <header className={homeStyles.header}>
        <div className="container" style={{ display: 'flex', alignItems: 'center' }}>
          <Link href="/" className={homeStyles.logo}>ToyPangPang</Link>
          <h1 style={{ marginLeft: '20px', fontSize: '20px' }}>고객센터</h1>
        </div>
      </header>
      <main className="container" style={{ padding: '60px 0' }}>
        <div className={styles.csBox}>
          <h2>무엇을 도와드릴까요?</h2>
          <div className={styles.grid}>
            <div className={styles.item}>
              <h3>자주 묻는 질문 (FAQ)</h3>
              <p>배송, 반품, 취소에 대한 안내</p>
            </div>
            <div className={styles.item}>
              <h3>1:1 문의하기</h3>
              <p>상담원이 직접 답변해 드립니다</p>
            </div>
            <div className={styles.item}>
              <h3>전화 상담</h3>
              <p className={homeStyles.csNumber}>1588-1234</p>
              <p>평일 09:00 ~ 18:00</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
