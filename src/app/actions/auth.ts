'use server';

import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { z } from 'zod';

const signupSchema = z.object({
  username: z.string().min(4).max(20),
  password: z.string().min(6),
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(10),
  zipcode: z.string().optional(),
  address: z.string(),
  detailAddress: z.string(),
  role: z.enum(['USER', 'ADMIN']).default('USER'),
});

export async function loginAction(username: string, password?: string) {
  try {
    // [보안 세이프가드] DB 연결 오류나 초기화 상태에서도 관리자 로그인을 보장함
    if (username === 'toypangpangadmin' && password === 'toypangpang2026') {
      console.log('--- 관리자 마스터 계정 로그인 시도 ---');
      return {
        id: 'admin-master-id',
        username: 'toypangpangadmin',
        name: '토이팡팡관리자(마스터)',
        email: 'admin@toypang.com',
        phone: '010-4851-7984',
        address: '전라남도 나주시 중야1길 37',
        detailAddress: '대방엘리움1차아파트 106동 1401호',
        role: 'ADMIN',
        createdAt: new Date()
      };
    }

    const user = await prisma.user.findUnique({
      where: { username },
    });

    if (!user || !user.password) return null;

    const isPasswordValid = await bcrypt.compare(password || '', user.password);
    if (!isPasswordValid) return null;

    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  } catch (error) {
    console.error('Login action error:', error);
    // 에러 발생 시에도 마스터 계정 체크는 위에서 이미 수행됨
    return null;
  }
}

export async function signupAction(rawData: any) {
  try {
    const validatedData = signupSchema.parse(rawData);
    const hashedPassword = await bcrypt.hash(validatedData.password, 10);

    const user = await prisma.user.create({
      data: {
        ...validatedData,
        password: hashedPassword,
      },
    });

    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error('Validation error:', error.issues);
    }
    console.error('Signup action error:', error);
    return null;
  }
}

export async function deleteAccountAction(id: string) {
  try {
    if (id === 'admin-master-id') return false; // 마스터 계정은 삭제 불가
    await prisma.user.delete({ where: { id } });
    return true;
  } catch (error) {
    console.error('Delete account error:', error);
    return false;
  }
}
