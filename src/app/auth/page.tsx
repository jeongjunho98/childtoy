'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import styles from './auth.module.css';
import homeStyles from '../page.module.css';
import { useAuth } from '@/context/AuthContext';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [detailAddress, setDetailAddress] = useState('');
  
  // SMS Verification simulation
  const [smsCode, setSmsCode] = useState('');
  const [isSmsSent, setIsSmsSent] = useState(false);
  const [isSmsVerified, setIsSmsVerified] = useState(false);

  const { user, login, signup, logout, deleteAccount } = useAuth();
  const router = useRouter();

  const handleSendSms = () => {
    if (!phone) {
      alert('휴대폰 번호를 먼저 입력해주세요.');
      return;
    }
    setIsSmsSent(true);
    alert('인증번호 [1234]가 발송되었습니다. (테스트용)');
  };

  const handleVerifySms = () => {
    if (smsCode === '1234') {
      setIsSmsVerified(true);
      alert('인증이 완료되었습니다! ✅');
    } else {
      alert('인증번호가 일치하지 않습니다.');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLogin) {
      const success = login(username, password);
      if (success) {
        alert('로그인 성공! 🎉');
        router.push('/');
      } else {
        alert('아이디 또는 비밀번호가 틀렸거나 사용자를 찾을 수 없습니다.');
      }
    } else {
      if (!isSmsVerified) {
        alert('휴대폰 본인인증을 완료해주세요.');
        return;
      }
      signup({ 
        username, 
        password, 
        name, 
        email, 
        phone, 
        address, 
        detailAddress 
      });
      alert('회원가입 성공! 🎉');
      router.push('/');
    }
  };

  const handleSocialLogin = (platform: string) => {
    const socialUser = {
      username: `${platform.toLowerCase()}_user`,
      password: '', // Social login usually doesn't need a local password
      name: `${platform} 친구`,
      email: `${platform.toLowerCase()}@toy.pang`,
      phone: '010-0000-0000',
      address: '서울시 어딘가',
      detailAddress: '동심 가득한 아파트 101호'
    };
    signup(socialUser);
    alert(`${platform} 계정으로 간편 가입되었습니다! 🎈`);
    router.push('/');
  };

  if (user) {
    return (
      <div className={styles.container}>
        <Link href="/" className={homeStyles.logo}>토이팡팡 🎈</Link>
        <div className={styles.userInfo}>
          <h2 className={styles.title}>환영합니다, {user.name}님!</h2>
          <p>ID: {user.username}</p>
          <p>Email: {user.email}</p>
          <p>Phone: {user.phone}</p>
          <p>Address: {user.address} {user.detailAddress}</p>
          <button className={styles.logoutBtn} onClick={logout}>로그아웃</button>
          <br />
          <button className={styles.deleteBtn} onClick={() => {
            if (confirm('정말 탈퇴하시겠습니까? 모든 정보가 사라집니다.')) {
              deleteAccount();
              router.push('/');
            }
          }}>회원 탈퇴하기</button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container} style={{ maxWidth: '500px' }}>
      <Link href="/" className={homeStyles.logo}>토이팡팡 🎈</Link>
      <div className={styles.tabs}>
        <button 
          className={`${styles.tab} ${isLogin ? styles.activeTab : ''}`}
          onClick={() => setIsLogin(true)}
        >
          로그인
        </button>
        <button 
          className={`${styles.tab} ${!isLogin ? styles.activeTab : ''}`}
          onClick={() => setIsLogin(false)}
        >
          회원가입
        </button>
      </div>

      <form className={styles.form} onSubmit={handleSubmit}>
        <input 
          className={styles.input}
          type="text" 
          placeholder="아이디" 
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input 
          className={styles.input}
          type="password" 
          placeholder="비밀번호" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {!isLogin && (
          <>
            <input 
              className={styles.input}
              type="text" 
              placeholder="이름" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input 
              className={styles.input}
              type="email" 
              placeholder="이메일 주소" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <div style={{ display: 'flex', gap: '5px' }}>
              <input 
                className={styles.input}
                style={{ flex: 1 }}
                type="tel" 
                placeholder="휴대폰 번호 (-포함)" 
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
              <button 
                type="button" 
                onClick={handleSendSms}
                style={{ background: '#eee', borderRadius: '8px', padding: '0 10px', fontSize: '12px' }}
                disabled={isSmsVerified}
              >
                {isSmsSent ? '재발송' : '인증요청'}
              </button>
            </div>
            {isSmsSent && !isSmsVerified && (
              <div style={{ display: 'flex', gap: '5px' }}>
                <input 
                  className={styles.input}
                  style={{ flex: 1 }}
                  type="text" 
                  placeholder="인증번호 입력 (1234)" 
                  value={smsCode}
                  onChange={(e) => setSmsCode(e.target.value)}
                />
                <button 
                  type="button" 
                  onClick={handleVerifySms}
                  style={{ background: 'var(--primary-blue)', color: 'white', borderRadius: '8px', padding: '0 10px', fontSize: '12px' }}
                >
                  확인
                </button>
              </div>
            )}
            {isSmsVerified && <p style={{ color: 'green', fontSize: '12px', textAlign: 'left' }}>인증이 완료되었습니다.</p>}
            
            <div style={{ display: 'flex', gap: '5px' }}>
              <input className={styles.input} style={{ flex: 1 }} type="text" placeholder="우편번호" readOnly value="12345" />
              <button type="button" style={{ padding: '0 10px', background: '#eee', borderRadius: '8px', fontSize: '12px' }}>주소검색</button>
            </div>
            <input 
              className={styles.input}
              type="text" 
              placeholder="기본 주소" 
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
            <input 
              className={styles.input}
              type="text" 
              placeholder="상세 주소" 
              value={detailAddress}
              onChange={(e) => setDetailAddress(e.target.value)}
              required
            />
          </>
        )}
        <button className={styles.submitBtn} type="submit">
          {isLogin ? '로그인' : '회원가입'}
        </button>
      </form>

      <div className={styles.socialGroup}>
        <p style={{ fontSize: '12px', color: '#aaa', margin: '15px 0' }}>또는 간편 로그인</p>
        <button className={styles.naverBtn} onClick={() => handleSocialLogin('Naver')}>
          <span>N</span> 네이버 로그인
        </button>
        <button className={styles.kakaoBtn} onClick={() => handleSocialLogin('Kakao')}>
          <span>K</span> 카카오 로그인
        </button>
      </div>
    </div>
  );
}
