import { PrismaClient } from '@prisma/client';
import { use } from 'react';
import { redirect } from 'next/navigation'
import { isNumber } from '@/lib/isNumber'
import Link from 'next/link';
import '@/app/stylesheets/console/products/edit.css'
import ProductForm from '@/app/(components)/ProductForm'
import {
  GetObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { s3Client } from "@/lib/s3Client"

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  slug: string;
  images: [key: string]
}

interface ImgSrc {
  [src: string]: string | {};
}

async function GetProduct(id: string) {
  'use server'

  const prisma = new PrismaClient();
  const Bucket = process.env.AMPLIFY_BUCKET;

  if (!id) {
    return null;
  }

  const product = await prisma.product.findUnique({
    where: { id: parseInt(id) },
    include: {
      images: true,
    },
  });

  if (!product) {
    return null;
  }

  let imgSrc = {} as ImgSrc
  product.images.forEach(async record => {
    let command = new GetObjectCommand({ Bucket, Key: record.key })
    imgSrc[record.key] = await getSignedUrl(s3Client(), command, { expiresIn: 3600 });
  })

  return { product: product, images: imgSrc };
}

async function UpdateProduct(data: FormData) {
  'use server'

  const id = data.get('id')?.toString();
  const name = data.get('name')?.toString();
  const description = data.get('description')?.toString();
  const price = Number(data.get('price'));
  const slug = data.get('slug')?.toString();
  let images = data.get('images')?.toString();

  if (images) {
    images = JSON.parse(images)
  }

  if (!id || !name || !description || !price || !slug) {
    return;
  }

  if (!isNumber(price)) {
    return;
  }

  const prisma = new PrismaClient();

  const result = await prisma.product.update({
    where: { id: parseInt(id) },
    data: {
      name: name,
      description: description,
      price: price,
      slug: slug,
      images: {
        create: images?.map((key: string) => ({
          key: key
        }))
      },
    }
  });

  if (result) {
    redirect('/console/products');
  }
}


export default function Page({ params }: { params: { id: string } }) {
  const productInfo = use(GetProduct(params.id))
  const product = productInfo?.product

  return (
    <>
      <h1 className="text-sub">商品情報</h1>
      <Link href='/console/products' className="text-accent">一覧</Link>
      <form action={UpdateProduct} className="product-editor text-sub">
        <ProductForm
          id={params.id}
          name={product?.name || null}
          price={product?.price || null}
          slug={product?.slug || null}
          description={product?.description || null}
          imgSrc={productInfo?.images} />
        <div className="bottom-button-area">
          <button type="submit" className='text-sub bg-accent submit-button'>登録</button>
        </div>
      </form>
    </>
  );
};