import Header from './components/Header';
import ProductArea from './components/ProductsArea';

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <ProductArea />
      </main>
    </>
  )
}
