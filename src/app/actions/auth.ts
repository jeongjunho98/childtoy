'use server';

import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';

export async function loginAction(username: string, password?: string) {
  try {
    console.log('--- Login Action Start ---', username);
    
    // 1. 관리자 마스터 계정 (어떠한 경우에도 로그인 보장)
    if (username === 'toypangpangadmin' && password === 'toypangpang2026') {
      return {
        id: 'admin-master-id',
        username: 'toypangpangadmin',
        name: '토이팡팡관리자',
        email: 'admin@toypang.com',
        phone: '010-4851-7984',
        address: '전라남도 나주시 중야1길 37',
        detailAddress: '106동 1401호',
        role: 'ADMIN',
      };
    }

    const user = await prisma.user.findUnique({ where: { username } });
    if (!user) {
      console.log('User not found:', username);
      return null;
    }

    // 2. 비밀번호 체크 (소셜 계정은 비번이 없을 수 있음)
    if (user.password && password) {
      const isValid = await bcrypt.compare(password, user.password);
      if (!isValid) return null;
    }

    const { password: _, ...safeUser } = user;
    return safeUser;
  } catch (error) {
    console.error('Login Error:', error);
    return null;
  }
}

export async function signupAction(userData: any) {
  try {
    console.log('--- Signup/Social Action Start ---', userData.username);
    
    // 이미 존재하는 유저라면 즉시 반환 (연동 로그인 핵심 로직)
    const existing = await prisma.user.findUnique({ 
      where: { username: userData.username } 
    });
    
    if (existing) {
      console.log('Existing user found, returning for login:', existing.username);
      const { password: _, ...safeUser } = existing;
      return safeUser;
    }

    // 신규 가입 처리 (검증 최소화로 실패 차단)
    const hashedPassword = userData.password ? await bcrypt.hash(userData.password, 10) : '';

    const newUser = await prisma.user.create({
      data: {
        username: userData.username,
        password: hashedPassword,
        name: userData.name || '새 친구',
        email: userData.email || '',
        phone: userData.phone || '010-0000-0000',
        zipcode: userData.zipcode || '',
        address: userData.address || '서울시 강남구',
        detailAddress: userData.detailAddress || '간편 가입',
        role: userData.role || 'USER',
      },
    });

    console.log('New user created successfully:', newUser.username);
    const { password: _, ...safeUser } = newUser;
    return safeUser;
  } catch (error) {
    console.error('Signup/Social Link Error:', error);
    return null;
  }
}

export async function deleteAccountAction(id: string) {
  try {
    if (id === 'admin-master-id') return false;
    await prisma.user.delete({ where: { id } });
    return true;
  } catch (error) {
    return false;
  }
}
