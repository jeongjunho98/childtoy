'use server';

import { prisma } from '@/lib/prisma';
import bcrypt from 'bcrypt';
import { z } from 'zod';

// 유효성 검증 스크마 정의
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
    const user = await prisma.user.findUnique({
      where: { username },
    });

    if (!user || !user.password) return null;

    // bcrypt 비밀번호 비교
    const isPasswordValid = await bcrypt.compare(password || '', user.password);
    if (!isPasswordValid) return null;

    // DTO: 비밀번호 제외하고 반환 (보안 최우선)
    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  } catch (error) {
    console.error('Login action error:', error);
    return null;
  }
}

export async function signupAction(rawData: any) {
  try {
    // 1. 데이터 검증 (Zod)
    const validatedData = signupSchema.parse(rawData);

    // 2. 비밀번호 해싱 (Salt rounds: 10)
    const hashedPassword = await bcrypt.hash(validatedData.password, 10);

    // 3. DB 저장
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
      console.error('Validation error:', error.errors);
    }
    console.error('Signup action error:', error);
    return null;
  }
}

export async function deleteAccountAction(id: string) {
  try {
    await prisma.user.delete({
      where: { id },
    });
    return true;
  } catch (error) {
    console.error('Delete account error:', error);
    return false;
  }
}
