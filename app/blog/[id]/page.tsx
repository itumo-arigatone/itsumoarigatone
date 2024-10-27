'use client'

import Footer from "@/app/(components)/Footer";
import Header from "@/app/(components)/SimpleHeader";
import SafeHTML from '@/app/(components)/SafeHTML';
import { getBlog } from '@/lib/blog/getBlog';
import { useEffect, useState } from 'react';
import LoadingAnimation from '@/app/(components)/LoadingAnimation';
import '/app/stylesheets/blog/detail_page.scss';
import '@/app/stylesheets/loading_black_patch.scss'

interface Post {
  title: string;
  content: string;
}

export default function Page({ params }: { params: { id: string } }) {
  const [post, setPost] = useState<Post | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await getBlog(Number(params.id));
        if (result.error) {
          throw new Error(result.errorMessage);
        }
        setPost(result as Post);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);  // データ取得が完了したらローディングを解除
      }
    }

    fetchData();
  }, []);

  return (
    <>
      <Header />
      <div className="blog-detail">
        <a href="/blog" className="list-link">
          <span>一覧へ</span>
        </a>
        <div className="blog-contents">
          {isLoading ? (
            <div className="loading-wrapper">
              <LoadingAnimation />
            </div>
          ) : post ? (
            <>
              <h1>{post.title}</h1>
              <SafeHTML className="blog-content" html={post.content} />
            </>
          ) : (
            <p>記事が見つかりませんでした。</p>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};