import Link from 'next/link';
import { PrismaClient } from '@prisma/client';
import '@/stylesheets/blog/page.css';
import { use } from 'react';
import { formatDate } from '@/lib/formatDate';

interface ProductProps {
  id: number;
  name?: string;
  price: number;
  description: string;
  slug: string;
  baseLink?: string;
  created_at: Date;
}

interface ImagesProps {
  id: number;
  key: string;
  productId: number;
}

async function GetProducts() {
  'use server'
  const prisma = new PrismaClient();
  return await prisma.product.findMany();
}

const Page = () => {
  const products: ProductProps[] = use(GetProducts());

  return (
    <div>
      <h1 className='text-sub'>商品一覧</h1>
      <Link href="/console" className='text-accent'>一覧へ</Link>
      <section className='text-sub'>
        <ul>
          <div className='button-area'>
            <Link href={'new'} className='create-button bg-accent'>新しい製品を登録</Link>
          </div>
          {products.map((product) => (
            <li key={product.id}>
              <Link href={`${product.id}`}>
                <h3 className="text-sub">{product.name}</h3>
                <div className="text-accent blog-created">
                  {formatDate(product.created_at)}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default Page;