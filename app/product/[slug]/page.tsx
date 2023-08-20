import Footer from "@/app/components/Footer";
import Header from "@/app/components/SimpleHeader"
import ProductsInfo from "@/app/product_info";
import { notFound } from 'next/navigation'

export default function Page({ params }: { params: { slug: string } }) {
  // fetch
  const product = ProductsInfo[params.slug];

  if (!product) {
    return notFound();
  }

  const baseLogo = '/base_logo_horizontal_white.png'
  const amazonLogo = '/icons8-amazon.svg'

  return (
    <>
      <Header />
      <main className="bg-base">
        <div className="flex flex-col justify-between">
          <div className="mx-auto mt-16 max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
            <div className="mx-auto flex flex-col lg:flex-row">
              <img className="rounded-lg" src={product.image_path} alt={product.name} width={639}/>
              <div className="mt-10 flex flex-col sm:mt-0 sm:ml-10">
                <h1 className="mt-1 text-4xl font-bold text-sub sm:text-5xl sm:tracking-tight lg:text-5xl">{product.name}</h1>
                <h1 className="mt-3 text-xl font-bold text-sub sm:text-3xl sm:tracking-tight lg:text-3xl">￥{product.price}</h1>
                <div className="grid grid-cols-2 gap-x-6 gap-y-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8 pt-6">
                  <a href="#" className="group">
                    <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-accent xl:aspect-h-8 xl:aspect-w-7 flex justify-center">
                      <img src={baseLogo} height={48}
                        alt="ベイスリンク" />
                    </div>
                  </a>
                  <a href="#" className="group">
                    <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-accent xl:aspect-h-8 xl:aspect-w-7 flex justify-center">
                      <img src={amazonLogo}
                        alt="amazonリンク" />
                    </div>
                  </a>
                </div>
                <div>
                  <div className="mt-10 mb-5 border-t bd-accent text-sub pt-10"></div>
                  <div className="bg-sub p-3">
                    <div className="text-base font-bold">description</div>
                    <p className="max-w-xl text-base">{product.description}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}