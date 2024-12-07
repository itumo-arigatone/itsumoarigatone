"use client"

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { imageUrl } from '@/lib/imageUrl';

interface ProductSliderProps {
  images: ProductImgProps[];
}

interface ProductImgProps {
  id: number;
  key: string;
  productId: number
}

const ProductSlider = ({ images }: ProductSliderProps) => {
  const url = imageUrl();

  return (
    <div className="product-slide-area">
      <Swiper
        spaceBetween={0}
        centeredSlides={true}
      >
        {
          images.map((image: ProductImgProps, index: number) => (
            <SwiperSlide key={index}>
              <img key={image.id} src={`${url}/product/${image.productId}/${image.key}` || ''} alt={image.key} width={450} height={280} />
            </SwiperSlide>
          ))
        }
      </Swiper>
    </div>
  )
}

export default ProductSlider
