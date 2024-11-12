"use client"

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import { useState } from 'react';
import LoadingAnimation from '@/app/_components/LoadingAnimation';
import '@/app/stylesheets/loading_black_patch.scss'

import 'swiper/css';
import "../stylesheets/product.scss";

type ProductProps = {
  images: ImgSrcProps,
  title: string,
  price: number,
  colors: Array<string>,
  product_key: string,
  touchMove: boolean
}

interface ImgSrcProps {
  [key: string]: string;
}

const Product = ({ images, title, price, colors, product_key, touchMove }: ProductProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  // 必要なデータ
  // 画像、タイトル、値段、色
  return (
    <a className="text-sub group" href={`/product/${encodeURIComponent(product_key)}`} onClick={() => setLoading(true)}>
      <div className="slide-image-area">
        {loading ? (
          <div className="loading-wrapper black" >
            <LoadingAnimation isBlack={true} />
          </div >
        ) : (
          <Swiper
            spaceBetween={0}
            centeredSlides={true}
            allowTouchMove={touchMove}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            modules={[Autoplay]}
          >
            {
              Object.keys(images).map((key: string) => (
                <SwiperSlide key={key}>
                  <img key={key} src={images[key] || ''} alt={key} width={450} height={280} loading="lazy" />
                </SwiperSlide>
              ))
            }
          </Swiper>
        )}
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
