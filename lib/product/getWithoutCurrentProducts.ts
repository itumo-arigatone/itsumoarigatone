'use server'

import { PrismaClient } from '@prisma/client';
import { viewS3Client } from "@/lib/viewS3Client"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { GetObjectCommand } from "@aws-sdk/client-s3";
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
        let command = new GetObjectCommand({ Bucket, Key: `product/${product.id}/${record.key}` })
        imgSrc[record.key] = await getSignedUrl(viewS3Client(), command, { expiresIn: 3600 });
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
      let command = new GetObjectCommand({ Bucket, Key: `product/${product.id}/${record.key}` })
      imgSrc[record.key] = await getSignedUrl(viewS3Client(), command, { expiresIn: 3600 });
    });
    return { product: product, images: imgSrc }
  });

  return {
    error: false,
    errorMessage: "",
    products: productWithImages,
  }
});