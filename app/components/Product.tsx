type ProductProps = {
  img: string,
  title: string,
  price: number,
  color: string,
}

const Product = ({img, title, price, color}:ProductProps) => {
  // 必要なデータ
  // 画像、タイトル、値段、色
  return (
    <div className="text-sub">
      {img}
      {title}
      {price}
      {color}
    </div>
  )
}

export default Product