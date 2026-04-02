'use server';

import { prisma } from '@/lib/prisma';

export async function getProducts() {
  try {
    const products = await prisma.product.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    });
    return products;
  } catch (error) {
    console.error('Failed to fetch products:', error);
    return [];
  }
}

export async function getProductById(id: string) {
  try {
    const product = await prisma.product.findUnique({
      where: { id },
      include: {
        reviews: {
          orderBy: {
            createdAt: 'desc'
          }
        }
      }
    });
    return product;
  } catch (error) {
    console.error(`Failed to fetch product ${id}:`, error);
    return null;
  }
}
