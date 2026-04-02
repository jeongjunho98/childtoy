'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import styles from './auth.module.css';
import homeStyles from '../page.module.css';
import { useAuth } from '@/context/AuthContext';

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const { user, login, signup, logout, deleteAccount } = useAuth();
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isLogin) {
      const success = login(email);
      if (success) {
        alert('로그인 성공! 🎉');
        router.push('/');
      } else {
        alert('사용자를 찾을 수 없습니다. 가입을 먼저 진행해주세요.');
      }
    } else {
      signup({ name, email });
      alert('회원가입 성공! 🎉');
      router.push('/');
    }
  };

  if (user) {
    return (
      <div className={styles.container}>
        <Link href="/" className={homeStyles.logo}>토이팡팡 🎈</Link>
        <div className={styles.userInfo}>
          <h2 className={styles.title}>환영합니다, {user.name}님!</h2>
          <p>{user.email}</p>
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
    <div className={styles.container}>
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
        {!isLogin && (
          <input 
            className={styles.input}
            type="text" 
            placeholder="이름" 
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        )}
        <input 
          className={styles.input}
          type="email" 
          placeholder="이메일 주소" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button className={styles.submitBtn} type="submit">
          {isLogin ? '로그인' : '회원가입'}
        </button>
      </form>
      <p style={{ marginTop: '20px', fontSize: '14px', color: '#999' }}>
        * Mock 시스템으로 실제 이메일 인증은 수행하지 않습니다.
      </p>
    </div>
  );
}
