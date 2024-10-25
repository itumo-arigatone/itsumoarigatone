'use client'

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { formatDate } from '@/lib/formatDate';
import { getActiveBlogs } from '@/lib/getActiveBlogs'
import '@/app/stylesheets/blog/page.css';

interface Post {
  id: number;
  title: string;
  content: string;
  created_at: Date;
  updated_at: Date;
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
    <div>
      <h1 className='text-sub'>ブログ一覧</h1>
      <Link href="/console" className='text-accent'>一覧へ</Link>
      <section className='text-sub'>
        <ul>
          <div className='button-area'>
            <Link href="new" className='create-button bg-accent'>新しいブログを書く</Link>
          </div>
          {posts.map((post) => (
            <li key={post.id}>
              <Link href={`${post.id}`}>
                <h3 className="text">{post.title}</h3>
                <div className="text-accent blog-created">
                  {formatDate(post.updated_at)}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default BlogList;