import Footer from "@/app/(components)/Footer";
import Header from "@/app/(components)/SimpleHeader";
import SafeHTML from '@/app/(components)/SafeHTML';
import '/app/stylesheets/blog/detail_page.css';
import { PrismaClient } from '@prisma/client';
import { use } from 'react';

interface Post {
  title: string;
  content: string;
}

async function GetBlog(id: string) {
  'use server'

  const prisma = new PrismaClient();

  if (!id) {
    return { error: 'ID is required' };
  }

  const post = await prisma.post.findUnique({
    where: { id: parseInt(id) },
  });

  if (!post) {
    return { error: 'Post not found' };
  }

  return post;
}

export default function Page({ params }: { params: { id: string } }) {
  const post = use(GetBlog(params.id as string)) as Post

  return (
    <>
      <Header />
      <div className="blog-contents">
        <h1>{post.title}</h1>
        <SafeHTML className="blog-content" html={post.content} />
      </div>
      <Footer />
    </>
  );
};