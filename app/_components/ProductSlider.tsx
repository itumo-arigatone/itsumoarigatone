"use client"

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';

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
              <img key={key} src={images[key]} alt={key} />
            </SwiperSlide>
          ))
        }
      </Swiper>
    </div>
  )
}

export default ProductSlider
