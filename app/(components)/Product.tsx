"use client"

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';

import 'swiper/css';
import "../stylesheets/product.css";

type ProductProps = {
  images: Array<string>,
  title: string,
  price: number,
  colors: Array<string>,
  product_key: string,
}

interface ImgSrcProps {
  [src: string]: string | {};
}

const Product = ({ images, title, price, colors, product_key }: ProductProps) => {
  // 必要なデータ
  // 画像、タイトル、値段、色
  return (
    <a className="text-sub group" href={`/product/${encodeURIComponent(product_key)}`}>
      <div className="slide-image-area">
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
      <p className="text-xl font-bold">{title}</p>
      <span>￥{price}</span>
      <div className="colors">
        {colors.map((color, index) => (
          <div key={index} style={{ background: color }} className="color"></div>
        ))}
      </div>
    </a>
  )
}

export default Product
