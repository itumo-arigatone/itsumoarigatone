'use client'

import Link from 'next/link';
import '@/app/stylesheets/blog/page.css';
import { GetAllProducts } from '@/app/console/products/GetAllProducts';
import { useEffect, useState } from 'react';
import { formatDate } from '@/lib/formatDate';

interface ProductProps {
  id: number;
  name: string;
  price: number;
  description: string;
  slug: string;
  created_at: Date;
  images: ImagesProps[];
}

interface ImagesProps {
  id: number;
  key: string;
  productId: number;
}

interface ImgSrcProps {
  [src: string]: string;
}

interface ProductPropsWithImg {
  product: ProductProps
  images: ImgSrcProps
}

const Page = () => {
  let [products, setProducts] = useState<ProductPropsWithImg[]>([])
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
            <li key={product.product.id}>
              <Link href={`${product.product.id}`}>
                <h3 className="text-sub">{product.product.name}</h3>
                <div className="text-accent blog-created">
                  {formatDate(product.product.created_at)}
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