'use client';

import { useState, useEffect } from 'react';
import Footer from "@/app/components/Footer";
import Header from "@/app/components/SimpleHeader";
import '/app/stylesheets/blog/detail_page.css';

export default function Page({ params }: { params: { id: string } }) {
  const [post, setPost] = useState(null);
  const id = params.id

  useEffect(() => {
    fetch(`/api/posts/${id}/`)
      .then((res) => res.json())
      .then((data) => {
        setPost(data)
      });
  }, [id]);

  if (!post) {
    return null;
  }

  return (
    <>
      <Header />
      <div className="blog-content">
        <h1>{post.title}</h1>
        <p>{post.content}</p>
      </div>
      <Footer />
    </>
  );
};