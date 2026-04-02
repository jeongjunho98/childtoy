'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from './checkout.module.css';
import homeStyles from '../page.module.css';
import { useCart } from '@/context/CartContext';
import { useAuth } from '@/context/AuthContext';

declare global {
  interface Window {
    daum: any;
  }
}

export default function CheckoutPage() {
  const { cart, totalPrice } = useCart();
  const { user } = useAuth();
  const router = useRouter();

  const [zipcode, setZipcode] = useState('');
  const [address, setAddress] = useState('');
  const [detailAddress, setDetailAddress] = useState('');
  const [phone, setPhone] = useState(user?.phone || '');
  const [deliveryMemo, setDeliveryMemo] = useState('문 앞에 놓아주세요');
  const [paymentMethod, setPaymentMethod] = useState('card');

  useEffect(() => {
    // Daum 우편번호 스크립트 로드
    const script = document.createElement('script');
    script.src = '//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';
    script.async = true;
    document.head.appendChild(script);
    
    if (user) {
      setAddress(user.address);
      setDetailAddress(user.detailAddress);
    }
  }, [user]);

  const handleAddressSearch = () => {
    new window.daum.Postcode({
      oncomplete: function(data: any) {
        let fullAddress = data.address;
        let extraAddress = '';

        if (data.addressType === 'R') {
          if (data.bname !== '') {
            extraAddress += data.bname;
          }
          if (data.buildingName !== '') {
            extraAddress += (extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName);
          }
          fullAddress += (extraAddress !== '' ? ` (${extraAddress})` : '');
        }

        setZipcode(data.zonecode);
        setAddress(fullAddress);
        document.getElementById('detailAddress')?.focus();
      }
    }).open();
  };

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;
    
    const methodNames: Record<string, string> = {
      card: '카드 결제',
      bank: '무통장 입금',
      kakao: '카카오페이',
      naver: '네이버페이',
      samsung: '삼성페이'
    };

    alert(`${methodNames[paymentMethod]} 승인 중입니다... 잠시만 기다려주세요! 💳`);
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
            <h2 className={styles.sectionTitle}>1. 배송 정보</h2>
            <div className={styles.form}>
              <input 
                className={styles.input} 
                type="text" 
                placeholder="받는 분 성함" 
                defaultValue={user?.name || ''} 
                required 
              />
              <input 
                className={styles.input} 
                type="tel" 
                placeholder="휴대폰 번호 (- 제외)" 
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required 
              />
              <div style={{ display: 'flex', gap: '5px' }}>
                <input className={styles.input} style={{ flex: 1 }} type="text" placeholder="우편번호" readOnly value={zipcode} />
                <button 
                  type="button" 
                  onClick={handleAddressSearch}
                  style={{ padding: '0 15px', background: 'var(--primary-yellow)', borderRadius: '8px', fontWeight: 'bold' }}
                >
                  주소검색
                </button>
              </div>
              <input 
                className={styles.input} 
                type="text" 
                placeholder="기본 주소" 
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                readOnly
                required 
              />
              <input 
                id="detailAddress"
                className={styles.input} 
                type="text" 
                placeholder="상세 주소 (아파트/동/호수 등)" 
                value={detailAddress}
                onChange={(e) => setDetailAddress(e.target.value)}
                required 
              />
              <select 
                className={styles.input}
                value={deliveryMemo}
                onChange={(e) => setDeliveryMemo(e.target.value)}
              >
                <option value="문 앞에 놓아주세요">문 앞에 놓아주세요</option>
                <option value="경비실에 맡겨주세요">경비실에 맡겨주세요</option>
                <option value="택배함에 넣어주세요">택배함에 넣어주세요</option>
                <option value="직접 수령하겠습니다">직접 수령하겠습니다</option>
                <option value="직접 입력">직접 입력</option>
              </select>
            </div>
          </section>

          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>2. 결제 수단</h2>
            <div className={styles.paymentGrid}>
              <label className={`${styles.paymentOption} ${paymentMethod === 'card' ? styles.activePayment : ''}`}>
                <input type="radio" name="pay" value="card" checked={paymentMethod === 'card'} onChange={() => setPaymentMethod('card')} />
                카드결제
              </label>
              <label className={`${styles.paymentOption} ${paymentMethod === 'bank' ? styles.activePayment : ''}`}>
                <input type="radio" name="pay" value="bank" checked={paymentMethod === 'bank'} onChange={() => setPaymentMethod('bank')} />
                무통장입금
              </label>
              <label className={`${styles.paymentOption} ${paymentMethod === 'kakao' ? styles.activePayment : ''}`}>
                <input type="radio" name="pay" value="kakao" checked={paymentMethod === 'kakao'} onChange={() => setPaymentMethod('kakao')} />
                카카오페이
              </label>
              <label className={`${styles.paymentOption} ${paymentMethod === 'naver' ? styles.activePayment : ''}`}>
                <input type="radio" name="pay" value="naver" checked={paymentMethod === 'naver'} onChange={() => setPaymentMethod('naver')} />
                네이버페이
              </label>
              <label className={`${styles.paymentOption} ${paymentMethod === 'samsung' ? styles.activePayment : ''}`}>
                <input type="radio" name="pay" value="samsung" checked={paymentMethod === 'samsung'} onChange={() => setPaymentMethod('samsung')} />
                삼성페이
              </label>
            </div>
            
            {paymentMethod === 'card' && (
              <div className={styles.form} style={{ marginTop: '15px' }}>
                <input className={styles.input} type="text" placeholder="카드 번호 (16자리)" maxLength={16} required />
                <div style={{ display: 'flex', gap: '10px' }}>
                  <input className={styles.input} style={{ flex: 1 }} type="text" placeholder="MM/YY" required />
                  <input className={styles.input} style={{ flex: 1 }} type="password" placeholder="CVC" maxLength={3} required />
                </div>
              </div>
            )}

            {paymentMethod === 'bank' && (
              <div className={styles.bankInfo}>
                <p>입금 계좌: <strong>국민은행 123456-01-789101</strong></p>
                <p>예금주: <strong>(주)토이팡팡</strong></p>
                <p style={{ fontSize: '12px', color: '#888', marginTop: '5px' }}>* 주문 후 24시간 이내에 입금해주셔야 주문이 완료됩니다.</p>
              </div>
            )}
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
            {(totalPrice + 3000).toLocaleString()}원 결제하기
          </button>
        </form>
      </main>
    </div>
  );
}
