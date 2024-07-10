import { PrismaClient } from '@prisma/client';
import { use } from 'react';
import { redirect } from 'next/navigation'
import { isNumber } from '@/lib/isNumber'
import Link from 'next/link';
import '@/app/stylesheets/console/products/edit.css'
import ProductForm from '@/app/(components)/ProductForm'

interface Product {
  id: number;
  name: string;
  price: string;
  description: string;
  slug: string;
}

async function GetProduct(id: string) {
  'use server'

  const prisma = new PrismaClient();

  if (!id) {
    return null;
  }

  const product = await prisma.product.findUnique({
    where: { id: parseInt(id) },
  });

  if (!product) {
    return null;
  }

  return product;
}

async function PatchProduct(data: FormData) {
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
    redirect('/console/blogs');
  }
}


export default function Page({ params }: { params: { id: string } }) {
  const product = use(GetProduct(params.id)) as Product;

  return (
    <>
      <h1 className="text-sub">商品情報</h1>
      <Link href='/console/products' className="text-accent">一覧</Link>
      <form action={PatchProduct} className="product-editor text-sub">
        <ProductForm id={params.id} name={product.name} price={product.price} slug={product.slug} description={product.description} />
        <div className="bottom-button-area">
          <button type="submit" className='text-sub bg-accent submit-button'>登録</button>
        </div>
      </form>
    </>
  );
};