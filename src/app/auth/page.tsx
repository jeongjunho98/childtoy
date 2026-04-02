'use client';

import { useState, useEffect, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import styles from './auth.module.css';
import homeStyles from '../page.module.css';
import { useAuth } from '@/context/AuthContext';

declare global {
  interface Window {
    daum: any;
  }
}

function AuthContent() {
  const searchParams = useSearchParams();
  const initialMode = searchParams.get('mode') === 'signup' ? false : true;
  
  const [isLogin, setIsLogin] = useState(initialMode);
  const [isLoading, setIsLoading] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [zipcode, setZipcode] = useState('');
  const [address, setAddress] = useState('');
  const [detailAddress, setDetailAddress] = useState('');
  
  const [smsCode, setSmsCode] = useState('');
  const [isSmsSent, setIsSmsSent] = useState(false);
  const [isSmsVerified, setIsSmsVerified] = useState(false);

  const { user, login, signup, logout, deleteAccount } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const mode = searchParams.get('mode');
    if (mode === 'signup') setIsLogin(false);
    else if (mode === 'login') setIsLogin(true);
  }, [searchParams]);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = '//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';
    script.async = true;
    document.head.appendChild(script);
  }, []);

  const handleAddressSearch = () => {
    new window.daum.Postcode({
      oncomplete: function(data: any) {
        let fullAddress = data.address;
        let extraAddress = '';
        if (data.addressType === 'R') {
          if (data.bname !== '') extraAddress += data.bname;
          if (data.buildingName !== '') extraAddress += (extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName);
          fullAddress += (extraAddress !== '' ? ` (${extraAddress})` : '');
        }
        setZipcode(data.zonecode);
        setAddress(fullAddress);
        document.getElementById('detailAddress')?.focus();
      }
    }).open();
  };

  const handleSendSms = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!phone) { alert('휴대폰 번호를 먼저 입력해주세요.'); return; }
    setIsSmsSent(true);
    alert('인증번호 [1234]가 발송되었습니다. (테스트용)');
  };

  const handleVerifySms = (e: React.MouseEvent) => {
    e.preventDefault();
    if (smsCode === '1234') {
      setIsSmsVerified(true);
      alert('인증이 완료되었습니다! ✅');
    } else {
      alert('인증번호가 일치하지 않습니다.');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading) return;
    
    setIsLoading(true);
    try {
      if (isLogin) {
        const success = await login(username, password);
        if (success) {
          alert('로그인 성공! 🎉');
          router.push('/');
        } else {
          alert('아이디 또는 비밀번호가 틀렸습니다.');
        }
      } else {
        if (!isSmsVerified) {
          alert('휴대폰 본인인증을 완료해주세요.');
          setIsLoading(false);
          return;
        }
        const success = await signup({ 
          username, password, name, email, phone, zipcode, address, detailAddress, role: 'USER'
        });
        if (success) {
          alert('회원가입 성공! 🎉');
          router.push('/');
        } else {
          alert('가입에 실패했습니다. 아이디 중복을 확인해주세요.');
        }
      }
    } catch (err) {
      console.error(err);
      alert('처리 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSocialLogin = async (platform: string) => {
    if (isLoading) return;
    setIsLoading(true);
    console.log(`${platform} login start...`);
    try {
      const socialUser = {
        username: `${platform.toLowerCase()}_user_${Date.now()}`,
        password: '', 
        name: `${platform} 친구`,
        email: `${platform.toLowerCase()}@toy.pang`,
        phone: '010-0000-0000',
        zipcode: '12345',
        address: '서울시 어딘가',
        detailAddress: '간편 가입 회원',
        role: 'USER'
      };
      const success = await signup(socialUser);
      if (success) {
        alert(`${platform} 계정으로 로그인되었습니다! 🎈`);
        router.push('/');
      } else {
        alert(`${platform} 로그인에 실패했습니다.`);
      }
    } catch (err) {
      console.error(err);
      alert('간편 로그인 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  if (user) {
    const isAdmin = user.role === 'ADMIN';
    return (
      <div className={styles.container}>
        <Link href="/" className={homeStyles.logo}>토이팡팡 🎈</Link>
        <div className={styles.myPageBox}>
          <div className={styles.profileCard}>
            <div className={styles.avatar}>👤</div>
            <div className={styles.userBasic}>
              <h2>{user.name}님</h2>
              <span className={`${styles.roleBadge} ${isAdmin ? styles.adminBadge : ''}`}>
                {isAdmin ? '👑 관리자' : '멤버십 회원'}
              </span>
            </div>
          </div>
          <div className={styles.infoGrid}>
            <div className={styles.infoItem}><span className={styles.infoLabel}>아이디</span><span className={styles.infoValue}>{user.username}</span></div>
            <div className={styles.infoItem}><span className={styles.infoLabel}>이메일</span><span className={styles.infoValue}>{user.email}</span></div>
            <div className={styles.infoItem}><span className={styles.infoLabel}>연락처</span><span className={styles.infoValue}>{user.phone}</span></div>
            <div className={styles.infoItem}><span className={styles.infoLabel}>배송지</span><span className={styles.infoValue}>{user.address}</span></div>
          </div>
          <button className={styles.logoutBtn} onClick={logout}>로그아웃</button>
          {!isAdmin ? (
            <button className={styles.deleteBtn} onClick={async () => {
              if (confirm('정말 탈퇴하시겠습니까?')) { await deleteAccount(); router.push('/'); }
            }}>회원 탈퇴하기</button>
          ) : (
            <p style={{ marginTop: '20px', fontSize: '11px', color: '#ccc' }}>관리자 계정은 탈퇴가 불가능합니다.</p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container} style={{ maxWidth: '500px' }}>
      <Link href="/" className={homeStyles.logo}>토이팡팡 🎈</Link>
      <div className={styles.tabs}>
        <button type="button" className={`${styles.tab} ${isLogin ? styles.activeTab : ''}`} onClick={() => setIsLogin(true)}>로그인</button>
        <button type="button" className={`${styles.tab} ${!isLogin ? styles.activeTab : ''}`} onClick={() => setIsLogin(false)}>회원가입</button>
      </div>

      <form className={styles.form} onSubmit={handleSubmit}>
        <input className={styles.input} type="text" placeholder="아이디" value={username} onChange={(e) => setUsername(e.target.value)} required disabled={isLoading} />
        <input className={styles.input} type="password" placeholder="비밀번호" value={password} onChange={(e) => setPassword(e.target.value)} required disabled={isLoading} />
        {!isLogin && (
          <>
            <input className={styles.input} type="text" placeholder="이름" value={name} onChange={(e) => setName(e.target.value)} required />
            <input className={styles.input} type="email" placeholder="이메일 주소" value={email} onChange={(e) => setEmail(e.target.value)} required />
            <div style={{ display: 'flex', gap: '5px' }}>
              <input className={styles.input} style={{ flex: 1 }} type="tel" placeholder="휴대폰 번호" value={phone} onChange={(e) => setPhone(e.target.value)} required />
              <button type="button" onClick={handleSendSms} style={{ background: '#eee', borderRadius: '10px', padding: '0 10px', fontSize: '12px' }} disabled={isSmsVerified}>인증요청</button>
            </div>
            {isSmsSent && !isSmsVerified && (
              <div style={{ display: 'flex', gap: '5px' }}>
                <input className={styles.input} style={{ flex: 1 }} type="text" placeholder="인증번호 (1234)" value={smsCode} onChange={(e) => setSmsCode(e.target.value)} />
                <button type="button" onClick={handleVerifySms} style={{ background: 'var(--toy-blue)', color: 'white', borderRadius: '10px', padding: '0 10px', fontSize: '12px' }}>확인</button>
              </div>
            )}
            <div style={{ display: 'flex', gap: '5px' }}>
              <input className={styles.input} style={{ flex: 1 }} type="text" placeholder="우편번호" readOnly value={zipcode} />
              <button type="button" onClick={handleAddressSearch} style={{ padding: '0 15px', background: 'var(--toy-yellow)', borderRadius: '10px', fontWeight: 'bold' }}>주소검색</button>
            </div>
            <input className={styles.input} type="text" placeholder="기본 주소" value={address} readOnly required />
            <input id="detailAddress" className={styles.input} type="text" placeholder="상세 주소" value={detailAddress} onChange={(e) => setDetailAddress(e.target.value)} required />
          </>
        )}
        <button className={styles.submitBtn} type="submit" disabled={isLoading}>
          {isLoading ? '처리 중...' : (isLogin ? '로그인' : '가입하기')}
        </button>
      </form>

      <div className={styles.socialGroup}>
        <p style={{ fontSize: '12px', color: '#aaa', margin: '15px 0' }}>또는 간편 로그인</p>
        <button type="button" className={styles.naverBtn} onClick={() => handleSocialLogin('Naver')} disabled={isLoading}>
          {isLoading ? '잠시만요...' : '네이버 로그인'}
        </button>
        <button type="button" className={styles.kakaoBtn} onClick={() => handleSocialLogin('Kakao')} disabled={isLoading}>
          {isLoading ? '잠시만요...' : '카카오 로그인'}
        </button>
      </div>
    </div>
  );
}

export default function AuthPage() {
  return (
    <Suspense fallback={<div>로딩 중...</div>}>
      <AuthContent />
    </Suspense>
  );
}
