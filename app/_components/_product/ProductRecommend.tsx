'use client'

import Product from '@/app/_components/Product';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';

export default function ProductRecommend({ products }: { products: ProductProps[] }) {
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
        {products?.map((product: ProductProps, index: number) => (
          <SwiperSlide key={index}>
            <div>
              <Product product_id={product.id} key={index} images={product.images} title={product.name}
                price={product.price} colors={[]} product_key={product.slug}
                touchMove={false} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  )
}
