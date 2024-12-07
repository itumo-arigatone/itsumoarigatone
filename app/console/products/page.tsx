'use client'

import Link from 'next/link';
import { GetAllProducts } from '@/app/console/products/GetAllProducts';
import { useEffect, useState } from 'react';
import { formatDate } from '@/lib/formatDate';
import '@/app/stylesheets/console/products/page.scss';

const Page = () => {
  const [products, setProducts] = useState<ProductProps[]>([])
  useEffect(() => {
    async function fetchData() {
      try {
        const result = await GetAllProducts();
        setProducts(result || []);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, []);

  return (
    <div>
      <h1 className='text-sub'>商品一覧</h1>
      <Link href="/console" className='text-accent'>一覧へ</Link>
      <section className='text-sub'>
        <ul>
          <div className='button-area'>
            <Link href={'new'} className='create-button bg-accent'>新しい製品を登録</Link>
          </div>
          {products?.map((product) => (
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