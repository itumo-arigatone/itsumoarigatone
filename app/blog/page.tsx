import BlogIndex from '@/app/_components/_blog/BlogIndex'
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: '【公式】Itsumoarigatoneコレクションサイト | ブログ一覧',
  description: 'Itsumoarigatoneのブログ一覧です。Itsumoarigatone since 2023. 丁寧につくられた新作アイテムを紹介。レザーポーチ、財布、小物などなど。',
}


const page = () => {
  return (
    <>
      <BlogIndex />
    </>
  );
};

export default page;