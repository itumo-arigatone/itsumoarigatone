import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import { getCategory } from '@/lib/category/getCategory';
import Footer from "@/app/_components/Footer";
import Header from "@/app/_components/SimpleHeader"
import CategoryProducts from '@/app/_components/_category/CategoryProducts';
import '@/app/stylesheets/category/page.scss'

function arrayToPath(array: string[]): string {
  // 配列を結合し、"/"を前後に付加
  return `${array.join('/')}/`;
}

export async function generateMetadata({ params }: { params: { slug: string[] } }): Promise<Metadata> {
  const query = params.slug
  const slugs: string[] = Array.isArray(query)
    ? query // すでに string[] の場合はそのまま
    : query
      ? [query] // string の場合は string[] に変換
      : []; // undefined の場合は空配列

  const result = await getCategory(slugs);


  return {
    title: `${result?.category?.name} |【公式】Itsumoarigatoneコレクションサイト・レザー商品詳細 `,
    description: `${result?.category?.name} |Itsumoarigatone since 2023. 丁寧につくられた新作アイテムを紹介。レザーポーチ、財布、小物などなど。`,
    alternates: {
      canonical: `https://www.itsumoarigatone.com/category/${arrayToPath(slugs)}`,
    },
    openGraph: {
      images: '/ogp.png',
    },
  }
}

export default async function Page({ params }: { params: { slug: string[] } }) {
  const query = params.slug
  const slugs: string[] = Array.isArray(query)
    ? query // すでに string[] の場合はそのまま
    : query
      ? [query] // string の場合は string[] に変換
      : []; // undefined の場合は空配列

  const result = await getCategory(slugs);

  if (!result || result.error || !result.category) {
    if (result?.error) console.error(result.errorMessage);
    return notFound();
  }

  // カテゴリは先に取得してあとから絞り込んだ商品を表示する
  return (
    <div>
      <Header />
      <div className='category'>
        <h1>{result.category.name}の作品一覧</h1>
        <div className='description'>{result.category.description}</div>
      </div>
      <section className='product-list'>
        <CategoryProducts categoryId={result.category.id} />
      </section>
      <Footer />
    </div>
  );
}