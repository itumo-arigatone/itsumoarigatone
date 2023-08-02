import '../stylesheets/product.css';

type ProductProps = {
  img: string,
  title: string,
  price: number,
  colors: Array<string>,
}

const Product = ({img, title, price, colors}:ProductProps) => {
  // 必要なデータ
  // 画像、タイトル、値段、色
  return (
    <a className="text-sub group" href={`/product/${encodeURIComponent(title)}`}>
      <img src={img} alt={title} />
      <p>{title}</p>
      <span>{price}</span>
      <div className="colors">
        {colors.map((color, index) => (
          <div style={{background: color}} className="color"></div>
        ))}
      </div>
    </a>
  )
}

export default Product