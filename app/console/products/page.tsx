import Link from 'next/link';
import { PrismaClient } from '@prisma/client';
import '@/stylesheets/blog/page.css';
import { use } from 'react';
import { formatDate } from '@/lib/formatDate';

async function GetProducts() {
  'use server'
  const prisma = new PrismaClient();
  return await prisma.product.findMany();
}

const Page = () => {
  const products = use(GetProducts());

  return (
    <div>
      <section>
        <ul>
          {products.map((product) => (
            <li key={product.id}>
              <Link href={`${product.slug}`}>
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