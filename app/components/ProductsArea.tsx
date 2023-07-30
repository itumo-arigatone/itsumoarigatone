import Product from './Product';

export default function ProductsArea() {
  // 必要なデータ
  // 画像、タイトル、値段、色
  const price:number = 100
  return (
    <Product img="haha" title="hello" price={price} color="#ff00ff"/>
  )
}