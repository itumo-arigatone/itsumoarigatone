'use client'

import TopFirstView from '@/app/_components/TopFirstView';
import Header from '@/app/_components/SimpleHeader'
import ProductArea from '@/app/_components/ProductsArea'
import Footer from '@/app/_components/Footer';
import LoadingAnimation from '@/app/_components/LoadingAnimation'
import { GetAllProducts } from '@/app/console/products/GetAllProducts';
import { useEffect, useState } from 'react';
import '@/app/stylesheets/product/page.scss';

interface ProductProps {
  id: number;
  name: string;
  price: number;
  description: string;
  slug: string;
  images: ImagesProps[];
}

interface ImagesProps {
  id: number;
  key: string;
  productId: number;
}

export const revalidate = 3600

export default function Page() {
  const [products, setProducts] = useState<ProductProps[]>([])
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await GetAllProducts();
        setProducts(result || []);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);  // データ取得が完了したらローディングを解除
      }
    }
    fetchData();
  }, []);

  return (
    <>
      <Header />
      <TopFirstView />
      <main className="flex min-h-screen flex-col items-center justify-between p-8">
        <section className='products-section'>
          <h2>作品たち</h2>
          {isLoading ? (
            <div className="loading-wrapper">
              <LoadingAnimation />
            </div>
          ) : (
            <ProductArea products={products} />
          )}
        </section>
      </main>
      <Footer />
    </>
  )
}
