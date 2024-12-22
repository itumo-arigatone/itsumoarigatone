import ProductDetail from '@/app/_components/_product/ProductDetail';
import Footer from "@/app/_components/Footer";
import Header from "@/app/_components/SimpleHeader"
import ProductSlider from "@/app/_components/ProductSlider"
import { Metadata } from 'next';
import { getProduct } from "@/lib/product/getProduct";
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const productInfo = await getProduct(params.slug);

  const getOgpUrl = () => {
    if (productInfo.product && productInfo.product.images) {
      return `${params.slug}/product/${productInfo.product?.id}/${productInfo.product.images[0].key}`
    }
    return "/ogp.png"
  }

  return {
    title: `${productInfo.product?.name} |【公式】Itsumoarigatoneコレクションサイト・レザー商品詳細 `,
    description: `${productInfo.product?.name} |Itsumoarigatone since 2023. 丁寧につくられた新作アイテムを紹介。レザーポーチ、財布、小物などなど。`,
    alternates: {
      canonical: `https://www.itsumoarigatone.com/product/${params.slug}/`,
    },
    openGraph: {
      images: [getOgpUrl()],
    },
  }
}

export default async function Page({ params }: { params: { slug: string } }) {
  const productInfo = await getProduct(params.slug)

  if (!productInfo.product) {
    return notFound();
  }

  const baseLogo = '/base_logo_horizontal_white.png'

  return (
    <>
      <Header />
      <main className="bg-base">
        <div className="product">
          <ProductSlider images={productInfo.product.images || []} />
          <div className="flex flex-col">
            <h1 className="mt-1 text-4xl font-bold text-sub sm:text-5xl sm:tracking-tight lg:text-5xl">{productInfo.product.name}</h1>
            <div className="mt-3 text-xl font-bold text-sub sm:text-3xl sm:tracking-tight lg:text-3xl">￥{productInfo.product.price}</div>
            <div className="grid grid-cols-2 gap-x-6 gap-y-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8 pt-6">
              <a href={productInfo.product.baseLink || 'https://itsumogatone.base.ec/'} className="group">
                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-accent xl:aspect-h-8 xl:aspect-w-7 flex justify-center">
                  <img src={baseLogo} height={48} width={118} alt="ベイスリンク" className="max-h-12" />
                </div>
              </a>
            </div>
            <div>
              <div className="mt-10 mb-5 border-t bd-accent text-sub pt-10"></div>
              <div className="bg-sub p-3">
                <div className="text-base font-bold">この商品について</div>
                <p className="max-w-xl text-base product-description">
                  {productInfo.product.description}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="recommend-section">
          <h2 className="text-sub">その他の作品</h2>
          <ProductDetail slug={params.slug} />
        </div>
      </main>
      <Footer />
    </>
  )
}