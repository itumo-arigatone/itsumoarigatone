'use server'

import { PrismaClient } from '@prisma/client';
import { Product as PrismaProduct } from '@prisma/client';
import { viewS3Client } from "@/lib/viewS3Client"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { GetObjectCommand } from "@aws-sdk/client-s3";

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

export async function getProduct(slug: string) {
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
    let command = new GetObjectCommand({ Bucket, Key: `product/${product.id}/${record.key}` })
    imgSrc[record.key] = await getSignedUrl(viewS3Client(), command, { expiresIn: 3600 });
  })

  return { product: product, images: imgSrc, error: false, errorMessage: "" }
}