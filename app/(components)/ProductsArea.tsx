import Product from './Product';

export default function ProductsArea() {
  // 必要なデータ
  // 画像、タイトル、値段、色
  return (
    <div id="products-area" className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
      {Object.entries({}).map(([p_key, product], index) => (
        <Product key={index} img={product.image_path} title={product.name} price={product.price} colors={product.color} product_key={p_key} />
      ))}
    </div>
  )
}
