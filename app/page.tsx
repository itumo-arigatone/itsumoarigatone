import ProductIndex from '@/app/_components/_product/ProductIndex'
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '【公式】Itsumoarigatoneコレクションサイト',
  description: 'Itsumoarigatone since 2023. 丁寧につくられた新作アイテムを紹介。レザーポーチ、財布、小物などなど。',
}

export default function page() {

  return (
    <>
      <ProductIndex />
    </>
  )
}
