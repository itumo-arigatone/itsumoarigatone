type ProductProps = {
  id: number,
  name: string,
  price: number,
  images: ProductImgProps[],
  description: string,
  slug: string,
}

type ProductImgProps = {
  id: number,
  key: string,
  productId: number,
}