'use server';

import { prisma } from '@/lib/prisma';
import { z } from 'zod';

const orderSchema = z.object({
  userId: z.string().optional(),
  receiverName: z.string(),
  phone: z.string(),
  zipcode: z.string(),
  address: z.string(),
  detailAddress: z.string(),
  deliveryMemo: z.string().optional(),
  paymentMethod: z.string(),
  items: z.array(z.object({
    productId: z.string(),
    quantity: z.number().min(1),
  })),
});

export async function createOrderAction(rawData: any) {
  try {
    const validatedData = orderSchema.parse(rawData);

    // 1. 서버 사이드 가격 검증 및 데이터 준비
    const itemsWithDetails = await Promise.all(
      validatedData.items.map(async (item) => {
        const product = await prisma.product.findUnique({ where: { id: item.productId } });
        if (!product) throw new Error(`Product ${item.productId} not found`);
        return {
          productId: item.productId,
          quantity: item.quantity,
          price: product.price, // 조작 불가능하도록 DB 가격 사용
        };
      })
    );

    const totalPrice = itemsWithDetails.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    // 2. DB 트랜잭션 (주문 + 상세 항목을 한 번에 원자적으로 처리)
    const order = await prisma.$transaction(async (tx) => {
      const newOrder = await tx.order.create({
        data: {
          userId: validatedData.userId,
          receiverName: validatedData.receiverName,
          phone: validatedData.phone,
          zipcode: validatedData.zipcode,
          address: validatedData.address,
          detailAddress: validatedData.detailAddress,
          deliveryMemo: validatedData.deliveryMemo,
          paymentMethod: validatedData.paymentMethod,
          totalPrice: totalPrice,
          orderItems: {
            create: itemsWithDetails.map(item => ({
              productId: item.productId,
              quantity: item.quantity,
              price: item.price
            }))
          }
        }
      });
      return newOrder;
    });

    return { success: true, orderId: order.id };
  } catch (error) {
    console.error('Order creation error:', error);
    return { success: false, error: '주문 처리 중 오류가 발생했습니다.' };
  }
}
