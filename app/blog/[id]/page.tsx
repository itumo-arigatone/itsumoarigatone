import Footer from "@/app/(components)/Footer";
import Header from "@/app/(components)/SimpleHeader";
import '/app/stylesheets/blog/detail_page.css';
import { PrismaClient } from '@prisma/client';
import { useRouter } from 'next/navigation';
import { use } from 'react';

async function GetBlog(id: string ) {
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
  const post = use(GetBlog(params.id as string))

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