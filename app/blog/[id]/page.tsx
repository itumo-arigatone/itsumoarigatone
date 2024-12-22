import Footer from "@/app/_components/Footer";
import Header from "@/app/_components/SimpleHeader";
import SafeHTML from '@/app/_components/SafeHTML';
import BlogDetail from '@/app/_components/_blog/BlogDetail'
import { Metadata } from 'next';
import { getBlog } from '@/lib/blog/getBlog';
import { notFound } from 'next/navigation';
import '/app/stylesheets/blog/detail_page.scss';
import '@/app/stylesheets/components/code_highlight.scss';
import { Post as PrismaPost } from '@prisma/client';

interface ExtendedPost extends PrismaPost {
  error?: boolean;
  errorMessage?: string;
  ogp?: string;
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const post = await getBlog(Number(params.id)) as ExtendedPost;

  if (!post || post.error) {
    return {};
  }

  return {
    title: `${post.title} | 【公式】Itsumoarigatoneコレクションサイト・ブログ詳細`,
    description: 'Itsumoarigatoneのブログです。Itsumoarigatone since 2023. 丁寧につくられた新作アイテムを紹介。レザーポーチ、財布、小物などなど。',
    alternates: {
      canonical: `https://www.itsumoarigatone.com/blog/${params.id}/`,
    },
    openGraph: {
      images: [post.ogp || "/ogp.png"],
    },
  }
}

export default async function Page({ params }: { params: { id: string } }) {
  const post = await getBlog(Number(params.id)) as ExtendedPost;

  if (!post || post.error) {
    return notFound();
  }
  return (
    <>
      <Header />
      <div className="blog-detail">
        <a href="/blog/" className="list-link">
          <span>一覧へ</span>
        </a>
        <div className="blog-contents">
          <h1>{post.title}</h1>
          <SafeHTML className="blog-content" html={post.content} />
        </div>
        <div className="recommend-section">
          <h2 className="text-sub">Itsumoarigatoneの作品</h2>
          <BlogDetail />
        </div>
      </div>
      <Footer />
    </>
  );
};