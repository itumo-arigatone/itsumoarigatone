import { PrismaClient } from '@prisma/client';
import { redirect } from 'next/navigation'
import ProductForm from '@/app/(components)/ProductForm'
import { isNumber } from '@/lib/isNumber'
import Link from 'next/link';
import { uploadImages } from '@/lib/uploadImages';
import '@/app/stylesheets/console/products/new.css'

async function CreateProduct(data: FormData) {
  'use server'

  const id = data.get('id')?.toString()
  const name = data.get('name')?.toString()
  const description = data.get('description')?.toString()
  const price = Number(data.get('price'))
  const slug = data.get('slug')?.toString()
  const imagesJson = data.get('images')?.toString()

  let images = []
  if (imagesJson) {
    images = JSON.parse(imagesJson)
  }

  if (!id || !name || !description || !price || !slug) {
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
      slug: slug,
      images: {
        create: images?.map((key: string) => ({
          key: key
        }))
      },
    },
  });


  if (result) {
    uploadImages(`product/${result.id}/`, data.files)
    redirect('/console/products');
  }
}

export default function Page() {
  return (
    <>
      <h1 className="text-sub">商品情報</h1>
      <Link href='/console/products' className="text-accent">一覧</Link>
      <form action={CreateProduct} className="product-editor">
        <ProductForm />
        <div className="bottom-button-area">
          <button type="submit" className='text-sub bg-accent submit-button'>登録</button>
        </div>
      </form>
    </>
  );
};