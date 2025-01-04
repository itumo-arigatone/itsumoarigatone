'use server'

import { PrismaClient } from '@prisma/client';
import { cache } from "react"

export const getCategoryProducts = cache(async (categoryId: number) => {
  const prisma = new PrismaClient();

  if (!categoryId) {
    return { error: true, errorMessage: 'categoryId is required' };
  }

  const products = await prisma.product.findMany({
    where: {
      categories: {
        some: {
          id: categoryId, // ここに対象のcategoryIdを指定
        },
      },
    },
    include: {
      categories: true, // 必要に応じてCategoryの情報も取得
      images: true,     // ProductImageも含める場合
    },
  });

  if (!products) {
    return { error: true, errorMessage: 'Product not found' };
  }

  return { products: products, error: false, errorMessage: "" };
});
