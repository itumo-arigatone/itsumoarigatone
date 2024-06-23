import { PrismaClient } from '@prisma/client';
import { use } from 'react';
import { redirect } from 'next/navigation'
import '@/app/stylesheets/console/blogs/page.css'

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
    <form action={PatchProduct} className="product-editor">
      <input type='hidden' name='id' value={product.id.toString()} />
      <input type='text' name='name' defaultValue={product.name} className='name' />
      <input type='text' name='price' defaultValue={product.price} className='price' />
      <input type='text' name='slug' defaultValue={product.slug} className='slug' />
      <textarea defaultValue={product.description} />
      <div className="bottom-button-area bg-sub">
        <button type="submit">登録</button>
      </div>
    </form>
  );
};