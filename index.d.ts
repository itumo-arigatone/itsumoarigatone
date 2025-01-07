type ProductProps = {
  id: number,
  name: string,
  price: number,
  images: ProductImgProps[],
  description: string,
  slug: string,
  categories?: Category[],
  updated_at: Date,
  created_at: Date,
}

type ProductImgProps = {
  id: number,
  key: string,
  productId: number,
}

type PostImageProps = {
  id: number,
  key: string,
  postId: number
}