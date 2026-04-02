'use client';

import { useState } from 'react';
import Link from 'next/link';
import homeStyles from '../page.module.css';
import styles from './cs.module.css';

const FAQ_DATA = [
  { question: "배송은 얼마나 걸리나요?", answer: "팡팡배송 상품은 오늘 주문 시 내일 도착하며, 일반 배송 상품은 평균 2~3일 소요됩니다." },
  { question: "반품/교환은 어떻게 하나요?", answer: "마이페이지 > 주문내역에서 신청 가능하며, 단순 변심의 경우 배송비가 청구될 수 있습니다." },
  { question: "결제 수단은 무엇이 있나요?", answer: "카드결제, 무통장입금, 카카오페이, 네이버페이, 삼성페이를 지원합니다." },
  { question: "아이디/비밀번호를 잊어버렸어요.", answer: "로그인 화면 하단의 '아이디/비밀번호 찾기'를 통해 본인인증 후 찾으실 수 있습니다." },
];

export default function CustomerServicePage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('문의가 정상적으로 접수되었습니다! 빠른 시일 내에 답변 드릴게요. 🎈');
    setIsInquiryOpen(false);
  };

  return (
    <div className={homeStyles.main}>
      <header className={homeStyles.header}>
        <div className="container" style={{ display: 'flex', alignItems: 'center' }}>
          <Link href="/" className={homeStyles.logo}>토이팡팡 🎈</Link>
          <h1 style={{ marginLeft: '20px', fontSize: '20px', fontWeight: '900', color: '#555' }}>고객센터</h1>
        </div>
      </header>

      <main className="container" style={{ padding: '60px 0' }}>
        <div className={styles.csBox}>
          <h2 className={styles.mainTitle}>무엇을 도와드릴까요? ✨</h2>
          
          <div className={styles.grid}>
            {/* FAQ 아코디언 */}
            <div className={styles.card}>
              <div className={styles.iconCircle}>❓</div>
              <h3>자주 묻는 질문</h3>
              <div className={styles.faqList}>
                {FAQ_DATA.map((faq, index) => (
                  <div key={index} className={styles.faqItem}>
                    <div 
                      className={styles.faqQuestion} 
                      onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    >
                      {faq.question}
                    </div>
                    {openFaq === index && <div className={styles.faqAnswer}>{faq.answer}</div>}
                  </div>
                ))}
              </div>
            </div>

            {/* 1:1 문의하기 */}
            <div className={styles.card}>
              <div className={styles.iconCircle}>✍️</div>
              <h3>1:1 문의하기</h3>
              {!isInquiryOpen ? (
                <button className={styles.actionBtn} onClick={() => setIsInquiryOpen(true)}>문의 작성하기</button>
              ) : (
                <form onSubmit={handleInquirySubmit} className={styles.inquiryForm}>
                  <input type="text" placeholder="제목" required className={styles.csInput} />
                  <textarea placeholder="궁금하신 내용을 입력해주세요" required className={styles.csTextarea} />
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <button type="submit" className={styles.submitBtn}>제출</button>
                    <button type="button" className={styles.cancelBtn} onClick={() => setIsInquiryOpen(false)}>취소</button>
                  </div>
                </form>
              )}
            </div>

            {/* 전화 상담 */}
            <div className={styles.card}>
              <div className={styles.iconCircle}>📞</div>
              <h3>전화 상담</h3>
              <p className={styles.csNum}>010-4851-7984</p>
              <p style={{ fontSize: '13px', color: '#888', marginBottom: '15px' }}>평일 09:00 ~ 18:00</p>
              <a href="tel:010-4851-7984" className={styles.callBtn}>지금 바로 통화하기</a>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
