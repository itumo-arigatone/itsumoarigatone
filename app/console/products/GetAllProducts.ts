'use server'

import { PrismaClient } from '@prisma/client';
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { viewS3Client } from "@/lib/viewS3Client"

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

export async function GetAllProducts() {
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
      let command = new GetObjectCommand({ Bucket, Key: `product/${product.id}/${record.key}` })
      imgSrc[record.key] = await getSignedUrl(viewS3Client(), command, { expiresIn: 3600 });
    })
    return { product: product, images: imgSrc }
  })
}