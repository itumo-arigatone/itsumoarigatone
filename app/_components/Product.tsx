"use client"

import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import { useEffect, useState } from 'react';
import { imageUrl } from '@/lib/imageUrl';
import LoadingAnimation from '@/app/_components/LoadingAnimation';
import '@/app/stylesheets/loading_black_patch.scss'

import 'swiper/css';
import "../stylesheets/product.scss";

type ProductProps = {
  product_id: number,
  images: ProductImgProps[],
  title: string,
  price: number,
  colors: Array<string>,
  product_key: string,
  touchMove: boolean
}

interface ProductImgProps {
  id: number;
  key: string;
  productId: number;
}

const Product = ({ product_id, images, title, price, colors, product_key, touchMove }: ProductProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [url, setUrl] = useState<string>(imageUrl() || "");
  // 必要なデータ
  // 画像、タイトル、値段、色
  return (
    <a className="text-sub group" href={`/product/${encodeURIComponent(product_key)}/`} onClick={() => setLoading(true)}>
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
              images.map((image: ProductImgProps, index: number) => (
                <SwiperSlide key={index}>
                  <img key={image.id} src={`${url}/product/${product_id}/${image.key}` || ''} alt={image.key} width={450} height={280} loading="lazy" />
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
