"use client"

import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';

interface ProductSliderProps {
  images: ImgSrcProps;
}

interface ImgSrcProps {
  [key: string]: string;
}

const ProductSlider = ({ images }: ProductSliderProps) => {
  return (
    <div className="product-slide-area">
      <Swiper
        spaceBetween={0}
        centeredSlides={true}
      >
        {
          Object.keys(images).map((key) => (
            <SwiperSlide key={key}>
              <img key={key} src={images[key]} alt={key} width={450} height={280} />
            </SwiperSlide>
          ))
        }
      </Swiper>
    </div>
  )
}

export default ProductSlider
