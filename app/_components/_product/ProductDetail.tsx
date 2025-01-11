'use client'

import LoadingAnimation from '@/app/_components/LoadingAnimation';
import ProductRecommend from '@/app/_components/_product/ProductRecommend';
import { useState, useEffect } from 'react';

import 'swiper/css';
import '@/app/stylesheets/product/detail_page.scss'
import { getWithoutCurrentProducts } from "@/lib/product/getWithoutCurrentProducts";

interface Props {
  slug: string;
}

export default function ProductDetail({ slug }: Props) {
  const [isLoadingRecommend, setIsLoadingRecommend] = useState<boolean>(true)
  const [fiveProducts, setFiveProducts] = useState<ProductProps[]>([])
  const [isError, setIsError] = useState<boolean>(false)

  useEffect(() => {
    async function fetchRecommendProduct() {
      try {
        const result = await getWithoutCurrentProducts(slug);
        if (result.error || !result.products) {
          throw new Error(result.errorMessage);
        } else {
          setFiveProducts(result.products);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsError(true);
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
      ) : fiveProducts && !isError ? (
        <ProductRecommend products={fiveProducts} />
      ) : (<div>商品情報の取得に失敗しました</div>)}
    </>
  )
}