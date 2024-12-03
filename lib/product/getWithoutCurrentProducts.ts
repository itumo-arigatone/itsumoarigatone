'use server'

import { PrismaClient } from '@prisma/client';
import { cache } from 'react'

interface ImgSrcProps {
  [src: string]: string;
}

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

    const productWithImages = products.map(product => {
      let imgSrc = {} as ImgSrcProps
      product.images?.forEach(async record => {
        imgSrc[record.key] = `${process.env.IMAGE_HOST}/${process.env.AMPLIFY_BUCKET}/product/${product.id}/${record.key}`
      });
      return { product: product, images: imgSrc }
    });
    return {
      error: false,
      errorMessage: "",
      products: productWithImages,
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

  const productWithImages = products.map(product => {
    let imgSrc = {} as ImgSrcProps
    product.images?.forEach(async record => {
      imgSrc[record.key] = `${process.env.IMAGE_HOST}/${process.env.AMPLIFY_BUCKET}/product/${product.id}/${record.key}`
    });
    return { product: product, images: imgSrc }
  });

  return {
    error: false,
    errorMessage: "",
    products: productWithImages,
  }
});