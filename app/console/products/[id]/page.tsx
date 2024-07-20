import { PrismaClient } from '@prisma/client';
import { use } from 'react';
import { redirect } from 'next/navigation'
import { isNumber } from '@/lib/isNumber'
import Link from 'next/link';
import ProductForm from '@/app/(components)/ProductForm'
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { uploadImages } from '@/lib/uploadImages';
import { viewS3Client } from "@/lib/viewS3Client"
import { syncKeyAndFile } from '@/lib/syncKeyAndFile'
import '@/app/stylesheets/console/products/edit.css'

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
    let command = new GetObjectCommand({ Bucket, Key: `product/${id}/${record.key}` })
    imgSrc[record.key] = await getSignedUrl(viewS3Client(), command, { expiresIn: 3600 });
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
  const imageKeysJson = data.get('imageKeys')?.toString()
  const imageFiles = data.getAll('imageData')

  let imageKeys = []
  if (imageKeysJson) {
    imageKeys = JSON.parse(imageKeysJson)
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
        upsert: imageKeys?.map((key: string) => ({
          where: { key: key },
          update: { key: key },
          create: { key: key },
        }))
      },
    }
  });

  if (result) {
    const syncedFiles = syncKeyAndFile(imageKeys, imageFiles)
    uploadImages(`product/${result.id}/`, syncedFiles)
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
      <ProductForm
        id={params.id}
        name={product?.name || null}
        price={product?.price || null}
        slug={product?.slug || null}
        description={product?.description || null}
        imgSrc={productInfo?.images}
        serverAction={UpdateProduct} />
    </>
  );
};