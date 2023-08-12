import "../stylesheets/product.css";

type ProductProps = {
  img: string,
  title: string,
  price: number,
  colors: Array<string>,
  product_key: string,
}

const Product = ({img, title, price, colors, product_key}:ProductProps) => {
  // 必要なデータ
  // 画像、タイトル、値段、色
  return (
    <a className="text-sub group" href={`/product/${encodeURIComponent(product_key)}`}>
      <img src={img} alt={title} />
      <p className="text-xl font-bold">{title}</p>
      <span>￥{price}</span>
      <div className="colors">
        {colors.map((color, index) => (
          <div style={{background: color}} className="color"></div>
        ))}
      </div>
    </a>
  )
}

export default Product