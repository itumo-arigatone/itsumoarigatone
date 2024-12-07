'use server'

import { PrismaClient } from '@prisma/client';
import { cache } from 'react'

export const getWithoutCurrentProducts = cache(async (slug: string | null = null) => {
  const prisma = new PrismaClient();
  const Bucket = process.env.AMPLIFY_BUCKET;

  if (!slug) {
    const products = await prisma.product.findMany({
      include: {
        images: true
      },
      take: 5,
    });
    if (!products) {
      return { error: true, errorMessage: 'Product not found' };
    }

    return {
      error: false,
      errorMessage: "",
      products: products,
    }
  }

  const products = await prisma.product.findMany({
    where: {
      slug: {
        not: slug,
      },
    },
    include: {
      images: true
    },
    take: 5,
  });
  if (!products) {
    return { error: true, errorMessage: 'Product not found' };
  }

  return {
    error: false,
    errorMessage: "",
    products: products,
  }
});