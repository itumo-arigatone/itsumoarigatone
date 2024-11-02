import ProductDetail from '@/app/_components/_product/ProductDetail';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '【公式】Itsumoarigatoneコレクションサイト|商品詳細',
  description: 'Itsumoarigatoneの商品詳細|Itsumoarigatone since 2023. 丁寧につくられた新作アイテムを紹介。レザーポーチ、財布、小物などなど。',
}

export default function Page({ params }: { params: { slug: string } }) {

  return (
    <>
      <ProductDetail slug={params.slug} />
    </>
  )
}