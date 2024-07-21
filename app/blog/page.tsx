'use client'

import Link from 'next/link';
import Header from "@/app/(components)/SimpleHeader";
import Footer from "@/app/(components)/Footer";
import { useState, useEffect } from 'react';
import { getActiveBlogs } from '@/lib/getActiveBlogs'
import { formatDate } from '@/lib/formatDate';
import '@/stylesheets/blog/page.css';

interface Post {
  id: number;
  title: string;
  content: string;
  created_at: Date;
}

const BlogList = () => {
  let [posts, setPosts] = useState<Post[]>([])
  useEffect(() => {
    async function fetchData() {
      try {
        const result = await getActiveBlogs();
        setPosts(result || []);
      } catch (error) {
        console.error('Error fetching data:', error);
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
        <ul>
          {posts.map((post) => (
            <li key={post.id}>
              <Link href={`/blog/${post.id}`}>
                <h3 className="text-sub">{post.title}</h3>
                <div className="text-accent blog-created">
                  {formatDate(post.created_at)}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>
      <Footer />
    </>
  );
};

export default BlogList;