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
import { ProductDeleteButton } from '@/app/(components)/ProductDeleteButton'
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
  [src: string]: Urls,
}

type Urls = {
  url?: string,
  id?: string,
}

type ImageKey = {
  [id: string]: string,
}

type ImageKeyWithId = {
  new: string[],
  already: ImageKey
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

  let imgSrc: ImgSrc = {}
  product.images.forEach(async record => {
    let command = new GetObjectCommand({ Bucket, Key: `product/${id}/${record.key}` })
    if (!imgSrc[record.key]) {
      imgSrc[record.key] = {}
    }
    imgSrc[record.key].url = await getSignedUrl(viewS3Client(), command, { expiresIn: 3600 });
    imgSrc[record.key].id = record.id.toString()
  })

  let imageKeys: ImageKey = {}
  product.images.forEach(record => {
    imageKeys[record.id.toString()] = record.key;
  })

  return { product: product, imgSrc: imgSrc, imageKeys: imageKeys };
}

function imageUpdate(keyObj: ImageKeyWithId) {

  const newArray = keyObj.new.map(key => (
    {
      where: { id: 0 },
      update: { key: key },
      create: { key: key },
    }
  ))

  const alreadyArray = Object.entries(keyObj.already).map(([id, key]) => ({
    where: { id: Number(id) },
    update: { key: key },
    create: { key: key },
  }))

  return [...newArray, ...alreadyArray];
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
  const deletedImageIdsJson = data.get('deletedImageIds')?.toString()

  let imageKeys = {}
  if (imageKeysJson) {
    imageKeys = JSON.parse(imageKeysJson)
  }

  let deletedImageIds = []
  if (deletedImageIdsJson) {
    deletedImageIds = JSON.parse(deletedImageIdsJson)
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
        upsert: imageUpdate(imageKeys)
      },
    }
  })

  const deletedRecord = await prisma.productImage.deleteMany({
    where: {
      id: {
        in: deletedImageIds,
      },
    },
  });

  if (result && deletedRecord) {
    const syncedFiles = syncKeyAndFile(imageKeys, imageFiles)
    uploadImages(`product/${result.id}/`, syncedFiles)
    redirect('/console/products');
  }
}

async function DeleteProduct(id: string) {
  'use server'

  const prisma = new PrismaClient()

  const deletedImageRecord = await prisma.productImage.deleteMany({
    where: { productId: Number(id) },
  });

  if (deletedImageRecord) {
    const deletedRecord = await prisma.product.delete({
      where: {
        id: Number(id),
      },
    });

    if (deletedRecord) {
      redirect('/console/products');
    }
  }

  alert('削除に失敗しました')
}

export default function Page({ params }: { params: { id: string } }) {
  const productInfo = use(GetProduct(params.id))
  const product = productInfo?.product

  return (
    <>
      <h1 className="text-sub">商品情報</h1>
      <Link href='/console/products' className="text-accent">一覧</Link>
      <ProductDeleteButton type='button' handleDelete={DeleteProduct} productId={params.id} />
      <ProductForm
        id={params.id}
        name={product?.name || null}
        price={product?.price || null}
        slug={product?.slug || null}
        description={product?.description || null}
        imgSrc={productInfo?.imgSrc}
        uploadedImageKeys={productInfo?.imageKeys || {}}
        serverAction={UpdateProduct} />
    </>
  );
};