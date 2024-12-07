'use client'

import { useEffect, useState } from 'react';
import LoadingAnimation from '@/app/_components/LoadingAnimation';
import { getWithoutCurrentProducts } from "@/lib/product/getWithoutCurrentProducts";
import ProductRecommend from '@/app/_components/_product/ProductRecommend'

export default function BlogDetail() {
  const [isLoadingRecommend, setIsLoadingRecommend] = useState<boolean>(true)
  const [fiveProducts, setFiveProducts] = useState<ProductProps[]>([])

  useEffect(() => {
    async function fetchRecommendProduct() {
      try {
        const result = await getWithoutCurrentProducts();
        if (result.error || !result.products) {
          throw new Error(result.errorMessage);
        } else {
          setFiveProducts(result.products);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoadingRecommend(false);  // データ取得が完了したらローディングを解除
      }
    }

    fetchRecommendProduct();
  }, []);

  return (
    <>
      {isLoadingRecommend ? (
        <div className="loading-wrapper">
          <LoadingAnimation />
        </div>
      ) : fiveProducts ? (
        <ProductRecommend products={fiveProducts} />
      ) : (<div>商品情報の取得に失敗しました</div>)}
    </>
  );
};