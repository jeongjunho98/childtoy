'use server';

import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { z } from 'zod';

// 검증 스키마를 더 유연하게 조정 (소셜 로그인 지원)
const authSchema = z.object({
  username: z.string().min(2).max(50),
  password: z.string().optional(),
  name: z.string().min(1),
  email: z.string().email().or(z.literal('')),
  phone: z.string().default('010-0000-0000'),
  zipcode: z.string().default(''),
  address: z.string().default('서울시 어딘가'),
  detailAddress: z.string().default('간편 가입 회원'),
  role: z.string().default('USER'),
});

export async function loginAction(username: string, password?: string) {
  try {
    // 1. 마스터 계정 세이프가드
    if (username === 'toypangpangadmin' && password === 'toypangpang2026') {
      return {
        id: 'admin-master-id',
        username: 'toypangpangadmin',
        name: '토이팡팡관리자',
        email: 'admin@toypang.com',
        phone: '010-4851-7984',
        address: '전라남도 나주시 중야1길 37',
        detailAddress: '대방엘리움1차아파트 106동 1401호',
        role: 'ADMIN',
      };
    }

    const user = await prisma.user.findUnique({ where: { username } });
    if (!user) return null;

    // 2. 비밀번호 비교 (비밀번호가 있는 계정만)
    if (user.password && password) {
      const isValid = await bcrypt.compare(password, user.password);
      if (!isValid) return null;
    }

    const { password: _, ...safeUser } = user;
    return safeUser;
  } catch (error) {
    console.error('Login error:', error);
    return null;
  }
}

export async function signupAction(rawData: any) {
  try {
    const validated = authSchema.parse(rawData);
    
    // 이미 있는 유저라면 가입 대신 해당 유저 정보 반환 (로그인 처리)
    const existing = await prisma.user.findUnique({ where: { username: validated.username } });
    if (existing) {
      const { password: _, ...safeUser } = existing;
      return safeUser;
    }

    const hashedPassword = validated.password ? await bcrypt.hash(validated.password, 10) : '';

    const user = await prisma.user.create({
      data: {
        ...validated,
        password: hashedPassword,
      },
    });

    const { password: _, ...safeUser } = user;
    return safeUser;
  } catch (error) {
    console.error('Signup error:', error);
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
