'use server'

import { PrismaClient } from '@prisma/client';
import { Product as PrismaProduct } from '@prisma/client';
import { cache } from "react"

interface ExtendedProduct extends PrismaProduct {
  images?: ImagesProps[];
}

interface ImgSrcProps {
  [src: string]: string;
}

interface ImagesProps {
  id: number;
  key: string;
  productId: number;
}

export const getProduct = cache(async (slug: string) => {
  const prisma = new PrismaClient();
  const Bucket = process.env.AMPLIFY_BUCKET;

  if (!slug) {
    return { error: true, errorMessage: 'slug is required' };
  }

  const product: ExtendedProduct | null = await prisma.product.findUnique({
    where: { slug: slug },
    include: {
      images: true
    }
  });

  if (!product) {
    return { error: true, errorMessage: 'Product not found' };
  }

  let imgSrc = {} as ImgSrcProps
  product.images?.forEach(async record => {
    imgSrc[record.key] = `${process.env.IMAGE_HOST}/product/${product.id}/${record.key}`;
  })

  return { product: product, images: imgSrc, error: false, errorMessage: "" };
});
