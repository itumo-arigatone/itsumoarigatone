'use client'

import { useState, useEffect } from 'react';
import '@/app/stylesheets/product_form.scss';
import LoadingAnimation from '@/app/_components/LoadingAnimation'
import ProductsArea from '@/app/_components/ProductsArea';
import { getCategoryProducts } from '@/lib/product/getCategoryProducts';

type Props = {
  categoryId?: number,
}

const CategoryProducts = ({ categoryId }: Props) => {
  const [products, setProducts] = useState<ProductProps[]>([])
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState<boolean>(false)

  useEffect(() => {
    async function fetchData() {
      try {
        if (!categoryId) { throw 'required categoryId' }
        const result = await getCategoryProducts(categoryId);
        setProducts(result.products || []);
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsError(true);
      } finally {
        setIsLoading(false);  // データ取得が完了したらローディングを解除
      }
    }
    fetchData();
  }, []);

  return (
    <div>
      {isLoading ? (
        <div className="loading-wrapper">
          <LoadingAnimation />
        </div>
      ) : isError ? (
        <div>商品情報の取得に失敗しました</div>
      ) :
        (
          <ProductsArea products={products} />
        )}
    </div>
  )
}

export default CategoryProducts;
