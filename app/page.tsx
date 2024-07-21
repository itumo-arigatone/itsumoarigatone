'use client'

import Header from './(components)/Header';
import ProductArea from './(components)/ProductsArea';
import ShopArea from './(components)/ShopArea';
import Footer from './(components)/Footer';
import { GetAllProducts } from '@/app/console/products/GetAllProducts';
import { useEffect, useState } from 'react';

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

interface ImgSrcProps {
  [src: string]: string;
}

interface ProductPropsWithImg {
  product: ProductProps
  images: ImgSrcProps
}

export default function Page() {
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
    <>
      <Header />
      <main className="flex min-h-screen flex-col items-center justify-between p-8">
        <ShopArea />
        <ProductArea products={products} />
        <ShopArea />
      </main>
      <Footer />
    </>
  )
}
