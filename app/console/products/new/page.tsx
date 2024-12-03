import { PrismaClient } from '@prisma/client';
import { redirect } from 'next/navigation'
import ProductForm from '@/app/_components/ProductForm'
import { isNumber } from '@/lib/isNumber'
import Link from 'next/link';
import { uploadImages } from '@/lib/uploadImages';
import { syncKeyAndFile } from '@/lib/syncKeyAndFile'
import { convertToFiles } from '@/lib/convertToFiles'
import { revalidateTag } from 'next/cache';
import '@/app/stylesheets/console/products/new.css'

async function CreateProduct(data: FormData) {
  'use server'

  revalidateTag('product')
  const name = data.get('name')?.toString()
  const description = data.get('description')?.toString()
  const price = Number(data.get('price'))
  const baseLink = data.get('base-link')?.toString() || null
  const slug = data.get('slug')?.toString()
  const imageKeysJson = data.get('imageKeys')?.toString()
  const imageFiles = data.getAll('imageData')

  let imageKeys = []
  if (imageKeysJson) {
    imageKeys = JSON.parse(imageKeysJson)
  }

  if (!name || !description || !price || !baseLink || !slug) {
    return;
  }

  if (!isNumber(price)) {
    return;
  }

  const prisma = new PrismaClient();

  const result = await prisma.product.create({
    data: {
      name: name,
      description: description,
      price: price,
      baseLink: baseLink,
      slug: slug,
      images: {
        create: imageKeys.new?.map((key: string) => ({
          key: key
        }))
      },
    },
  })


  if (result) {
    const syncedFiles = syncKeyAndFile(imageKeys, convertToFiles(imageFiles))
    uploadImages(`product/${result.id}/`, syncedFiles)
    redirect('/console/products')
  }
}

export default function Page() {
  return (
    <>
      <h1 className="text-sub">商品情報</h1>
      <Link href='/console/products' className="text-accent">一覧</Link>
      <ProductForm serverAction={CreateProduct} />
    </>
  );
};