'use server'

import { PrismaClient } from '@prisma/client';
import { cache } from "react";

export const GetAllProducts = cache(async () => {
  const prisma = new PrismaClient();

  try {
    const products: ProductProps[] = await prisma.product.findMany({
      include: {
        images: true,
      },
    });

    if (!products || products.length === 0) {
      console.warn("No products found.");
      return null;
    }

    return products
  } catch (error) {
    console.error("Error fetching products from database:", error);
    throw new Error("Failed to fetch products.");
  } finally {
    // PrismaClientを明示的に閉じる
    await prisma.$disconnect();
  }
});
