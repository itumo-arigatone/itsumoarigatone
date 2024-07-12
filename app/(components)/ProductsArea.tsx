import Product from './Product';
import { PrismaClient } from '@prisma/client';
import { use } from 'react';
import {
  GetObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { s3Client } from "@/lib/s3Client"

interface ProductProps {
  id: number;
  name: string;
  price: number;
  description: string;
  slug: string;
}

interface ImgSrcProps {
  [src: string]: string | {};
}

interface ProductPropsWithImg {
  product: ProductProps
  images: ImgSrcProps
}

async function GetAllProducts() {
  'use server'

  const prisma = new PrismaClient();
  const Bucket = process.env.AMPLIFY_BUCKET;

  const products = await prisma.product.findMany({
    include: {
      images: true
    }
  });

  if (!products) {
    return null;
  }

  return products.map(product => {
    let imgSrc = {} as ImgSrcProps
    product.images.forEach(async record => {
      let command = new GetObjectCommand({ Bucket, Key: record.key })
      imgSrc[record.key] = await getSignedUrl(s3Client(), command, { expiresIn: 3600 });
    })
    return { product: product, images: imgSrc }
  })
}

export default function ProductsArea() {
  const products = use(GetAllProducts()) as Array<ProductPropsWithImg>
  // 必要なデータ
  // 画像、タイトル、値段、色
  return (
    <div id="products-area" className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
      {products.map((product, index) => (
        <Product key={index} images={product.images} title={product.product.name} price={product.product.price} colors={[]} product_key={product.product.slug} />
      ))}
    </div>
  )
}
