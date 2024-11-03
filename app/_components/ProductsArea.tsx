'use client'

import Product from './Product';

interface ProductProps {
  id: number;
  name: string;
  price: number;
  description: string;
  slug: string;
  images: ImagesProps[];
}

interface ImagesProps {
  id: number;
  key: string;
  productId: number;
}

interface ImgSrcProps {
  [src: string]: string;
}

interface ProductPropsWithImg {
  product: ProductProps
  images: ImgSrcProps
}

export default function ProductsArea({ products }: { products: ProductPropsWithImg[] }) {
  // 必要なデータ
  // 画像、タイトル、値段、色
  return (
    <div id="products-area" className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
      {products?.map((product, index) => (
        <Product key={index} images={product.images} title={product.product.name}
          price={product.product.price} colors={[]} product_key={product.product.slug} touchMove={true} />
      ))}
    </div>
  )
}
