import Product from './Product';

export default function ProductsArea() {
  // 必要なデータ
  // 画像、タイトル、値段、色
  const price:number = 100
  const products = [
    {
      img: "https://images.coach.com/is/image/Coach/ck019_b4nq4_a0",
      title: "product1",
      price: 100,
      color: ["#ff00ff"]
    },
    {
      img: "https://images.coach.com/is/image/Coach/ck019_b4nq4_a0",
      title: "product2",
      price: 200,
      color: ["#ff2356"]
    }
  ]
  return (
    <div id="products-area" className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
      {products.map((product, index) => (
        <Product img={product.img} title={product.title} price={product.price} colors={product.color}/>
      ))}
    </div>
  )
}