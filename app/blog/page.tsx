import { Metadata } from 'next';
import BlogIndex from '@/app/_components/_blog/BlogIndex';
import Header from '@/app/_components/SimpleHeader'
import Footer from '@/app/_components/Footer'
import '@/app/stylesheets/blog/page.scss';

export const metadata: Metadata = {
  title: '【公式】Itsumoarigatoneコレクションサイト | ブログ一覧',
  description: 'Itsumoarigatoneのブログ一覧です。Itsumoarigatone since 2023. 丁寧につくられた新作アイテムを紹介。レザーポーチ、財布、小物などなど。',
}


const page = () => {
  return (
    <>
      <Header />
      <div className='content-area'>
        <section>
          <a href="/" className="list-link">
            <span>トップページへ</span>
          </a>
        </section>
        <section>
          <h1 className="text-center text-sub font-extralight flex flex-wrap justify-center">
            <span>
              Itsumoarigatoneの
            </span>
            <span>
              ブログ
            </span>
          </h1>
          <BlogIndex />
        </section>
      </div >
      <Footer />
    </>
  );
};

export default page;