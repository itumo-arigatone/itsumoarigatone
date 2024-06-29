import { PrismaClient } from '@prisma/client';
import { use } from 'react';
import { redirect } from 'next/navigation'
import Link from 'next/link';
import '@/app/stylesheets/console/products/edit.css'

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

  console.log(product)

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
  const price = data.get('price')?.toString();

  if (!id || !name || !description || !price) {
    return;
  }

  const prisma = new PrismaClient();

  const result = await prisma.product.upsert({
    where: { id: parseInt(id) },
    update: {
      name: name,
      description: description,
    },
    create: {
      name: name,
      description: description,
    },
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
        <input type='hidden' name='id' value={product.id.toString()} />
        <section className='input-section'>
          <div className='input-box'>
            <label for='name-box'>名前</label>
            <input type='text' id='name-box' name='name' defaultValue={product.name} className='name bg-sub text-base' />
          </div>
          <div className='input-box'>
            <label for='price-box'>値段</label>
            <input type='text' id='price-box' name='price-box' defaultValue={product.price} className='price bg-sub text-base' />
          </div>
          <div className='input-box'>
            <label for='slug'>スラグ</label>
            <input type='text' id='slug' name='slug' defaultValue={product.slug} className='slug bg-sub text-base' />
          </div>
          <div className='input-box'>
            <label for='description'>説明</label>
            <textarea id='description' name='description' defaultValue={product.description} className='description bg-sub text-base' />
          </div>
        </section>
        <div className="bottom-button-area">
          <button type="submit" className='text-sub bg-accent submit-button'>登録</button>
        </div>
      </form>
    </>
  );
};