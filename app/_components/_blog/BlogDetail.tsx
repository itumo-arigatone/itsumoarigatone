'use client'

import Footer from "@/app/_components/Footer";
import Header from "@/app/_components/SimpleHeader";
import SafeHTML from '@/app/_components/SafeHTML';
import { getBlog } from '@/lib/blog/getBlog';
import { useEffect, useState } from 'react';
import LoadingAnimation from '@/app/_components/LoadingAnimation';
import { getWithoutCurrentProducts } from "@/lib/product/getWithoutCurrentProducts";
import { Product as ProductProps } from '@prisma/client';
import ProductRecommend from '@/app/_components/_product/ProductRecommend'
import '/app/stylesheets/blog/detail_page.scss';
import '@/app/stylesheets/loading_black_patch.scss'
import '@/app/stylesheets/components/code_highlight.scss';

interface Props {
  id: string
}

interface Post {
  title: string;
  content: string;
}

interface ProductPropsWithImg {
  product: ProductProps
  images: ImgSrcProps
}

interface ImgSrcProps {
  [src: string]: string;
}

export default function BlogDetail({ id }: Props) {
  const [post, setPost] = useState<Post | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [isLoadingRecommend, setIsLoadingRecommend] = useState<boolean>(true)
  const [fiveProducts, setFiveProducts] = useState<ProductPropsWithImg[]>([])

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await getBlog(Number(id));
        if (result.error) {
          throw new Error(result.errorMessage);
        }
        setPost(result as Post);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);  // データ取得が完了したらローディングを解除
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    async function fetchRecommendProduct() {
      try {
        const result = await getWithoutCurrentProducts();
        console.log(result)
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
      <Header />
      <div className="blog-detail">
        <a href="/blog" className="list-link">
          <span>一覧へ</span>
        </a>
        <div className="blog-contents">
          {isLoading ? (
            <div className="loading-wrapper">
              <LoadingAnimation />
            </div>
          ) : post ? (
            <>
              <h1>{post.title}</h1>
              <SafeHTML className="blog-content" html={post.content} />
            </>
          ) : (
            <p>記事が見つかりませんでした。</p>
          )}
        </div>
        <div className="recommend-section">
          <h2 className="text-sub">Itsumoarigatoneの作品</h2>
          {isLoadingRecommend ? (
            <div className="loading-wrapper">
              <LoadingAnimation />
            </div>
          ) : fiveProducts ? (
            <ProductRecommend products={fiveProducts} />
          ) : (<div>商品情報の取得に失敗しました</div>)}
        </div>
      </div>
      <Footer />
    </>
  );
};