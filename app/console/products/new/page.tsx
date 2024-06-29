import { PrismaClient } from '@prisma/client';
import { redirect } from 'next/navigation'
import '@/app/stylesheets/console/products/new.css'

async function PatchProduct(data: FormData) {
  'use server'

  const name = data.get('name')?.toString();
  const description = data.get('description')?.toString();
  const price = data.get('price')?.toString();
  const slug = data.get('slug')?.toString();

  if (!name || !description || !price || !slug) {
    return;
  }

  const prisma = new PrismaClient();

  const result = await prisma.product.insert({
    create: {
      name: name,
      description: description,
      slug: slug,
    },
  });

  if (result) {
    redirect('/console/products');
  }
}

export default function Page() {
  return (
    <form action={PatchProduct} className="product-editor">
      <input type='text' name='name' className='name' />
      <input type='text' name='price' className='price' />
      <input type='text' name='slug' className='slug' />
      <textarea name='description' />
      <div className="bottom-button-area bg-sub">
        <button type="submit">登録</button>
      </div>
    </form>
  );
};