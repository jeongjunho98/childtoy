'use server';

import { prisma } from '@/lib/prisma';

export async function loginAction(username: string, password?: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { username },
    });

    if (!user) return null;

    // 비밀번호가 있는 경우 비교 (실제 서비스는 bcrypt 등 사용 필수)
    if (password && user.password !== password) {
      return null;
    }

    return user;
  } catch (error) {
    console.error('Login action error:', error);
    return null;
  }
}

export async function signupAction(userData: any) {
  try {
    const user = await prisma.user.create({
      data: {
        username: userData.username,
        password: userData.password,
        name: userData.name,
        email: userData.email,
        phone: userData.phone,
        zipcode: userData.zipcode || '',
        address: userData.address,
        detailAddress: userData.detailAddress,
        role: userData.role || 'USER'
      },
    });
    return user;
  } catch (error) {
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
