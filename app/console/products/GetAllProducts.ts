'use server'

import { PrismaClient } from '@prisma/client';
import { cache } from "react";

interface ProductProps {
  id: number;
  name: string;
  price: number;
  description: string;
  slug: string;
  created_at: Date;
  images: ImagesProps[];
}

interface ImagesProps {
  id: number;
  key: string;
  productId: number;
}

interface ImgSrcProps {
  [src: string]: string;
}

export const GetAllProducts = cache(async () => {
  const prisma = new PrismaClient();
  const Bucket = process.env.AMPLIFY_BUCKET;

  const products: ProductProps[] = await prisma.product.findMany({
    include: {
      images: true
    }
  });

  if (!products) {
    return null;
  }

  return products.map(product => {
    let imgSrc = {} as ImgSrcProps
    product.images.forEach(async (record: ImagesProps) => {
      // TODO:認証けす
      imgSrc[record.key] = `${process.env.IMAGE_HOST}/${process.env.AMPLIFY_BUCKET}/product/${product.id}/${record.key}`
    })

    return { product: product, images: imgSrc }
  })
});