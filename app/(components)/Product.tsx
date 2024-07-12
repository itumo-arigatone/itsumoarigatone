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
        {
          Object.keys(images).map((key) => (
            <img key={key} src={images[key]} alt={key} />
          ))
        }
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
