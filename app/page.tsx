import Header from './components/Header';
import ProductArea from './components/ProductsArea';
import ShopArea from './components/ShopArea';

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <ShopArea />
        <ProductArea />
        <ShopArea />
      </main>
    </>
  )
}
