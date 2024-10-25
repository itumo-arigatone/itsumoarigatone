'use client'

import Link from 'next/link';
import Header from "@/app/(components)/SimpleHeader";
import Footer from "@/app/(components)/Footer";
import { useState, useEffect } from 'react';
import { getActiveBlogs } from '@/lib/getActiveBlogs'
import { formatDate } from '@/lib/formatDate';
import LoadingAnimation from '@/app/(components)/LoadingAnimation'
import '@/app/stylesheets/blog/page.css';

interface Post {
  id: number;
  title: string;
  content: string;
  created_at: Date;
  updated_at: Date;
}

const BlogList = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await getActiveBlogs();
        setPosts(result || []);
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
      <section>
        <h1 className="text-center font-bold text-sub">Itsumoarigatoneのブログ</h1>
        <h2 className="text-center font-bold text-sub">趣味でバッグやポーチを作っている人のブログを是非見ていってね</h2>

        {isLoading ? (
          <div className="loading-wrapper">
            <LoadingAnimation />
          </div>
        ) : (
          <ul>
            {posts.map((post) => (
              <li key={post.id}>
                <Link href={`/blog/${post.id}`}>
                  <h3 className="text-sub">{post.title}</h3>
                  <div className="text-accent blog-created">
                    {formatDate(post.updated_at)}
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </section>
      <Footer />
    </>
  );
};

export default BlogList;