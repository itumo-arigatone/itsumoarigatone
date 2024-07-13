import Footer from "@/app/(components)/Footer";
import Header from "@/app/(components)/SimpleHeader"
import ProductSlider from "@/app/(components)/ProductSlider"
import { notFound } from 'next/navigation'
import { PrismaClient } from '@prisma/client';
import { use } from 'react';
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { s3Client } from "@/lib/s3Client"

import 'swiper/css';
import '@/app/stylesheets/product/detail_page.scss'

interface ImgSrcProps {
  [src: string]: string;
}

async function GetProduct(slug: string) {
  'use server'

  const prisma = new PrismaClient();
  const Bucket = process.env.AMPLIFY_BUCKET;

  if (!slug) {
    return { error: 'slug is required' };
  }

  const product = await prisma.product.findUnique({
    where: { slug: slug },
    include: {
      images: true
    }
  });

  if (!product) {
    return { error: 'Product not found' };
  }

  let imgSrc = {} as ImgSrcProps
  product.images.forEach(async record => {
    let command = new GetObjectCommand({ Bucket, Key: record.key })
    imgSrc[record.key] = await getSignedUrl(s3Client(), command, { expiresIn: 3600 });
  })

  return { product: product, images: imgSrc }
}

export default function Page({ params }: { params: { slug: string } }) {
  // fetch
  const productInfo = use(GetProduct(params.slug as string))

  if (!productInfo.product) {
    return notFound();
  }

  const baseLogo = '/base_logo_horizontal_white.png'
  const amazonLogo = '/icons8-amazon.svg'

  return (
    <>
      <Header />
      <main className="bg-base">
        <div className="product">
          <ProductSlider images={productInfo.images || {}} />
          <div className="flex flex-col">
            <h1 className="mt-1 text-4xl font-bold text-sub sm:text-5xl sm:tracking-tight lg:text-5xl">{productInfo.product.name || 'eeeeee'}</h1>
            <div className="mt-3 text-xl font-bold text-sub sm:text-3xl sm:tracking-tight lg:text-3xl">￥{productInfo.product.price}</div>
            <div className="grid grid-cols-2 gap-x-6 gap-y-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8 pt-6">
              <a href="#" className="group">
                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-accent xl:aspect-h-8 xl:aspect-w-7 flex justify-center">
                  <img src={baseLogo} height={48} alt="ベイスリンク" className="max-h-12" />
                </div>
              </a>
              <a href="#" className="group">
                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-accent xl:aspect-h-8 xl:aspect-w-7 flex justify-center">
                  <img src={amazonLogo} height={48} alt="amazonリンク" className="max-h-12" />
                </div>
              </a>
            </div>
            <div>
              <div className="mt-10 mb-5 border-t bd-accent text-sub pt-10"></div>
              <div className="bg-sub p-3">
                <div className="text-base font-bold">この商品について</div>
                <p className="max-w-xl text-base">{productInfo.product.description}</p>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}