'use server';

import { prisma } from '@/lib/prisma';
import bcrypt from 'bcryptjs';
import { z } from 'zod';

const signupSchema = z.object({
  username: z.string().min(4).max(30),
  password: z.string().min(0).optional().or(z.literal('')), // 간편 로그인을 위해 비밀번호 자율화
  name: z.string().min(1),
  email: z.string().email(),
  phone: z.string().min(9),
  zipcode: z.string().optional(),
  address: z.string(),
  detailAddress: z.string(),
  role: z.enum(['USER', 'ADMIN']).default('USER'),
});

export async function loginAction(username: string, password?: string) {
  try {
    // [보안 세이프가드] 마스터 계정 로직 우선 확인
    if (username === 'toypangpangadmin' && password === 'toypangpang2026') {
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

    if (!user) return null;

    // 관리자 계정인데 비번이 일치하는 경우 (DB에 저장된 경우 대비)
    if (user.password && password) {
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (isPasswordValid) {
        const { password: _, ...userWithoutPassword } = user;
        return userWithoutPassword;
      }
    } else if (!user.password && !password) {
      // 비번 없는 계정(간편로그인)인 경우
      const { password: _, ...userWithoutPassword } = user;
      return userWithoutPassword;
    }

    return null;
  } catch (error) {
    console.error('Login action error:', error);
    return null;
  }
}

export async function signupAction(rawData: any) {
  try {
    const validatedData = signupSchema.parse(rawData);
    
    // 이미 존재하는 유저인지 확인
    const existingUser = await prisma.user.findUnique({
      where: { username: validatedData.username }
    });

    if (existingUser) return existingUser; // 이미 있으면 해당 유저 반환 (간편로그인용)

    const hashedPassword = validatedData.password ? await bcrypt.hash(validatedData.password, 10) : '';

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
    if (id === 'admin-master-id') return false;
    await prisma.user.delete({ where: { id } });
    return true;
  } catch (error) {
    console.error('Delete account error:', error);
    return false;
  }
}
