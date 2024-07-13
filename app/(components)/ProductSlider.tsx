"use client"

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';

import 'swiper/css';
import "../stylesheets/product.css";

interface ImgSrcProps {
  [src: string]: string | {};
}

const ProductSlider = ({ images }: ImgSrcProps) => {
  return (
    <div className="product-slide-area">
      <Swiper
        spaceBetween={0}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        modules={[Autoplay]}
      >
        {
          Object.keys(images).map((key) => (
            <SwiperSlide>
              <img key={key} src={images[key]} alt={key} />
            </SwiperSlide>
          ))
        }
      </Swiper>
    </div>
  )
}

export default ProductSlider
