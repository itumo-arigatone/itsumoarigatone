'use client'

import Product from '@/app/_components/Product';
import { Product as ProductProps } from '@prisma/client';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';

interface ImgSrcProps {
  [src: string]: string;
}

interface Props {
  products: ProductPropsWithImg[];
}

interface ProductPropsWithImg {
  product: ProductProps
  images: ImgSrcProps
}

export default function ProductRecommend({ products }: Props) {
  return (
    <div className="recommend-swiper">
      <Swiper
        slidesPerView={1}
        spaceBetween={10}
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 50,
          },
        }}
        centeredSlides={false}
        loop={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: true,
        }}
        modules={[Autoplay]}
      >
        {products?.map((product: ProductPropsWithImg, index: number) => (
          <SwiperSlide key={index}>
            <div>
              <Product key={index} images={product.images} title={product.product.name}
                price={product.product.price} colors={[]} product_key={product.product.slug}
                touchMove={false} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}
