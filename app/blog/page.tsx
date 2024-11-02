'use client'

import Link from 'next/link';
import Header from "@/app/_components/SimpleHeader";
import Footer from "@/app/_components/Footer";
import { useState, useEffect } from 'react';
import { getActiveBlogs } from '@/lib/blog/getActiveBlogs'
import { formatDate } from '@/lib/formatDate';
import LoadingAnimation from '@/app/_components/LoadingAnimation';
import { getFirstImage } from '@/lib/blog/getFirstImage';
import clearTags from '@/lib/clearTags';
import '@/app/stylesheets/blog/page.scss';

interface Post {
  id: number;
  title: string;
  content: string;
  created_at: Date;
  updated_at: Date;
  images: PostImage[];
  imageUrl?: string;
}

interface PostImage {
  id: number;
  key: string;
  postId: number;
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
        // 各ポストに対して非同期で画像のURLを取得し設定
        const postsWithImages = await Promise.all(
          result.map(async (post: Post) => {
            if (post.images.length > 0) {
              const imageUrl = await getFirstImage(post.id, post.images[0].key);
              return { ...post, imageUrl };
            }
            return post;
          })
        );
        setPosts(postsWithImages || []);
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
        {isLoading ? (
          <div className="loading-wrapper">
            <LoadingAnimation />
          </div>
        ) : (
          <div className='blogs'>
            {posts.map((post) => (
              <Link href={`/blog/${post.id}`} className='blog' key={post.id}>
                <div className='thumbnail'>
                  <img src={post.imageUrl || "/logo_medium.svg"} className='' />
                </div>
                <div className='text-content'>
                  <h2 className="text-sub">{post.title}</h2>
                  <div className='post-preview'>{clearTags(post.content)}</div>
                  <div className='read-more text-accent'>続きを見る</div>
                </div>
                <div className="text-sub blog-created">
                  {formatDate(post.updated_at)}
                </div>
              </Link>
            ))}
          </div>
        )}
      </section>
      <Footer />
    </>
  );
};

export default BlogList;