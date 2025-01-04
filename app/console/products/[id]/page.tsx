import { PrismaClient } from '@prisma/client';
import { use } from 'react';
import { redirect } from 'next/navigation'
import { isNumber } from '@/lib/isNumber'
import Link from 'next/link';
import ProductForm from '@/app/_components/ProductForm'
import { uploadImages } from '@/lib/uploadImages';
import { syncKeyAndFile } from '@/lib/syncKeyAndFile'
import { ProductDeleteButton } from '@/app/_components/ProductDeleteButton'
import { convertToFiles } from '@/lib/convertToFiles'
import { Category } from '@prisma/client';
import '@/app/stylesheets/console/products/edit.scss'
import { revalidateTag } from 'next/cache';
import updateProductCategory from "@/lib/updateProductCategory"

interface ProductProps {
  id: number;
  name?: string;
  price: number;
  description: string;
  slug: string;
  baseLink?: string | null;
  images: ImagesProps[];
  categories: Category[];
}

interface ImagesProps {
  id: number;
  key: string;
  productId: number;
}

interface ImgSrc {
  [src: string]: Urls,
}

type Urls = {
  url?: string,
  id?: number,
}

type ImageKey = {
  [id: string]: string,
}

type ImageKeyWithId = {
  new: string[],
  already: ImageKey
}

type CategoryProdctRelation = {
  categoriesToConnect: number[]
  categoriesToDisconnect: number[]
} | null

async function GetProduct(id: string) {
  'use server'

  const prisma = new PrismaClient();

  if (!id) {
    return null;
  }

  const product: ProductProps | null = await prisma.product.findUnique({
    where: { id: parseInt(id) },
    include: {
      images: true,
      categories: true,
    },
  });

  if (!product) {
    return null;
  }

  let imgSrc: ImgSrc = {}
  product.images.forEach(async record => {
    if (!imgSrc[record.key]) {
      imgSrc[record.key] = {}
    }
    imgSrc[record.key].url = `${process.env.IMAGE_HOST}/product/${id}/${record.key}`
    imgSrc[record.key].id = record.id
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

  revalidateTag('product')
  const id = data.get('id')?.toString()
  const name = data.get('name')?.toString()
  const description = data.get('description')?.toString()
  const price = Number(data.get('price'))
  const baseLink = data.get('base-link')?.toString() || null
  const slug = data.get('slug')?.toString()
  const imageKeysJson = data.get('imageKeys')?.toString()
  const imageFiles = data.getAll('imageData')
  const deletedImageIdsJson = data.get('deletedImageIds')?.toString()
  const categoryId = Number(data.get('categoryId')) // 最初は一つしか選択できないようにする

  let imageKeys = { new: [], already: {} }
  if (imageKeysJson) {
    imageKeys = JSON.parse(imageKeysJson)
  }

  let deletedImageIds = []
  if (deletedImageIdsJson) {
    deletedImageIds = JSON.parse(deletedImageIdsJson)
  }

  if (!id || !name || !description || !price || !slug) {
    alert("登録に失敗しました。");
    return;
  }

  if (!isNumber(price)) {
    alert("値段が数字じゃなくなっている");
    return;
  }

  const prisma = new PrismaClient();

  const prodCategory: CategoryProdctRelation = await updateProductCategory(prisma, Number(id), categoryId)

  const result = await prisma.product.update({
    where: { id: parseInt(id) },
    data: {
      name: name,
      description: description,
      price: price,
      baseLink: baseLink,
      slug: slug,
      images: {
        upsert: imageUpdate(imageKeys)
      },
      categories: {
        connect: prodCategory?.categoriesToConnect.map(id => ({ id })), // 新しく追加するカテゴリ
        disconnect: prodCategory?.categoriesToDisconnect.map(id => ({ id })), // 削除するカテゴリ
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
    const syncedFiles = syncKeyAndFile(imageKeys, convertToFiles(imageFiles))
    uploadImages(`product/${result.id}/`, syncedFiles)
    redirect('/console/products');
  }
}

async function DeleteProduct(id: string) {
  'use server'

  revalidateTag('product')
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
        name={product?.name}
        price={product?.price}
        slug={product?.slug}
        description={product?.description}
        imgSrc={productInfo?.imgSrc}
        uploadedImageKeys={productInfo?.imageKeys || {}}
        categories={product?.categories}
        baseLink={product?.baseLink || null}
        serverAction={UpdateProduct} />
    </>
  );
};