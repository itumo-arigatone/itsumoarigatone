'use client'

import Footer from "@/app/_components/Footer";
import Header from "@/app/_components/SimpleHeader"
import ProductSlider from "@/app/_components/ProductSlider"
import LoadingAnimation from '@/app/_components/LoadingAnimation';
import ProductRecommend from '@/app/_components/_product/ProductRecommend'
import { Product as ProductProps } from '@prisma/client';
import { useState, useEffect } from 'react';
import { getProduct } from "@/lib/product/getProduct";

import 'swiper/css';
import '@/app/stylesheets/product/detail_page.scss'
import { getWithoutCurrentProducts } from "@/lib/product/getWithoutCurrentProducts";

interface Props {
  slug: string;
}

interface ProductResultProps {
  product?: ExtendedProduct;
  images?: ImgSrcProps;
  error: boolean;
  errorMessage?: string;
}

interface ExtendedProduct extends ProductProps {
  images?: ImagesProps[];
}

interface ProductPropsWithImg {
  product: ProductProps
  images: ImgSrcProps
}

interface ImagesProps {
  id: number;
  key: string;
  productId: number;
}

interface ImgSrcProps {
  [src: string]: string;
}

export default function ProductDetail({ slug }: Props) {
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [isLoadingRecommend, setIsLoadingRecommend] = useState<boolean>(true)
  const [productInfo, setProductInfo] = useState<ProductResultProps | null>(null)
  const [fiveProducts, setFiveProducts] = useState<ProductPropsWithImg[]>([])

  const baseLogo = '/base_logo_horizontal_white.png'
  const amazonLogo = '/icons8-amazon.svg'

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await getProduct(slug);
        if (result.error) {
          throw new Error(result.errorMessage);
        } else {
          setProductInfo(result);
        }
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
        const result = await getWithoutCurrentProducts(slug);
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
      <main className="bg-base">
        <div className="product">
          {isLoading ? (
            <div className="loading-wrapper">
              <LoadingAnimation />
            </div>
          ) : productInfo?.product ? (
            <>
              <ProductSlider images={productInfo.images || {}} />
              <div className="flex flex-col">
                <h1 className="mt-1 text-4xl font-bold text-sub sm:text-5xl sm:tracking-tight lg:text-5xl">{productInfo.product.name}</h1>
                <div className="mt-3 text-xl font-bold text-sub sm:text-3xl sm:tracking-tight lg:text-3xl">￥{productInfo.product.price}</div>
                <div className="grid grid-cols-2 gap-x-6 gap-y-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8 pt-6">
                  <a href={productInfo.product.baseLink || 'https://itsumogatone.base.ec/'} className="group">
                    <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-accent xl:aspect-h-8 xl:aspect-w-7 flex justify-center">
                      <img src={baseLogo} height={48} width={118} alt="ベイスリンク" className="max-h-12" />
                    </div>
                  </a>
                </div>
                <div>
                  <div className="mt-10 mb-5 border-t bd-accent text-sub pt-10"></div>
                  <div className="bg-sub p-3">
                    <div className="text-base font-bold">この商品について</div>
                    <p className="max-w-xl text-base product-description">
                      {productInfo.product.description}
                    </p>
                  </div>
                </div>
              </div>
            </>
          ) : (<div>商品情報の取得に失敗しました</div>)}
        </div>
        <div className="recommend-section">
          <h2 className="text-sub">その他の作品</h2>
          {isLoadingRecommend ? (
            <div className="loading-wrapper">
              <LoadingAnimation />
            </div>
          ) : fiveProducts ? (
            <ProductRecommend products={fiveProducts} />
          ) : (<div>商品情報の取得に失敗しました</div>)}
        </div>
      </main>
      <Footer />
    </>
  )
}