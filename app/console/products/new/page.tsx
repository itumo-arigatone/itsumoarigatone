import { PrismaClient } from '@prisma/client';
import { redirect } from 'next/navigation'
import ProductForm from '@/app/(components)/ProductForm'
import { isNumber } from '@/lib/isNumber'
import Link from 'next/link';
import '@/app/stylesheets/console/products/new.css'

async function CreateProduct(data: FormData) {
  'use server'

  const name = data.get('name')?.toString();
  const description = data.get('description')?.toString();
  const price = Number(data.get('price'));
  const slug = data.get('slug')?.toString();
  let images = data.get('images')?.toString();

  console.log(images)
  if (images) {
    images = JSON.parse(images)
  }

  if (!name || !description || !price || !slug) {
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
      productImages: {
        create: images?.map((key: string) => ({
          key: key
        }))
      },
    },
  });

  if (result) {
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