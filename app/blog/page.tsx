'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Header from "@/app/components/SimpleHeader";
import '../stylesheets/blog/page.css';

const BlogList = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    console.log('useEffect')
    fetch('/api/posts')
      .then((res) => res.json())
      .then((data) => {
        setPosts(data)
      });
  }, []);

  return (
    <div>
      <Header/>
      <section>
        <h1 className="text-center font-bold text-sub">Itsumoarigatoneのブログ</h1>
        <h2 className="text-center font-bold text-sub">趣味でバッグやポーチを作っている人のブログを是非見ていってね</h2>
        <ul>
          {posts.map((post) => (
            <li key={post.id}>
              <Link href={`/blog/${post.id}`}>
                <h3 className="text-sub">{post.title}</h3>
                <div className="text-accent blog-created">
                  {post.created_at}
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