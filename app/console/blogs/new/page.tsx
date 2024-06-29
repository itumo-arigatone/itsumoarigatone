import TipTap from "@/app/(components)/Tiptap";
import { PrismaClient } from '@prisma/client';
import { use } from 'react';
import { redirect } from 'next/navigation'
import '@/app/stylesheets/console/blogs/page.css'

async function PostBlog(data: FormData) {
  'use server'

  const title = data.get('title')?.toString();
  const content = data.get('content')?.toString();

  console.log(title)
  console.log(content)
  if (!title || !content) {
    return;
  }

  const prisma = new PrismaClient();

  const result = await prisma.post.create({
    data: {
      title: title,
      content: content,
    },
  });

  if (result) {
    redirect('/console/blogs');
  }
}


export default function Page() {

  return (
    <form action={PostBlog} className="blog-editor">
      <input type='text' name='title' className='title' />
      <TipTap blog={null} />
      <div className="bottom-button-area bg-sub">
        <button type="submit">登録</button>
      </div>
    </form>
  );
};