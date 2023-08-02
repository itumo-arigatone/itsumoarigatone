import Header from './components/Header';
import ProductArea from './components/ProductsArea';
import ShopArea from './components/ShopArea';
import Footer from './components/Footer';

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex min-h-screen flex-col items-center justify-between p-8">
        <ShopArea />
        <ProductArea />
        <ShopArea />
      </main>
      <Footer />
    </>
  )
}
