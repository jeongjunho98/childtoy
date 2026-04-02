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
    const user = await prisma.user.findUnique({
      where: { username },
    });

    if (!user || !user.password) return null;

    // bcryptjs로 비교 (평문 비교 방지)
    const isPasswordValid = await bcrypt.compare(password || '', user.password);
    if (!isPasswordValid) return null;

    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  } catch (error) {
    console.error('Login action error:', error);
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
    await prisma.user.delete({ where: { id } });
    return true;
  } catch (error) {
    console.error('Delete account error:', error);
    return false;
  }
}
