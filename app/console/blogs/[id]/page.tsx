import TipTap from "@/app/(components)/Tiptap";
import { PrismaClient } from '@prisma/client';
import { use } from 'react';
import '@/app/stylesheets/console/blogs/page.css'

interface Blog {
  id: number;
  title: string;
  content: string;
  created_at: Date;
}

async function GetBlog(id: string) {
  'use server'

  const prisma = new PrismaClient();

  if (!id) {
    return null;
  }

  const post = await prisma.post.findUnique({
    where: { id: parseInt(id) },
  });

  if (!post) {
    return null;
  }

  return post;
}

async function PatchBlog(data: FormData) {
  'use server'

  const id = data.get('id')?.toString();
  const title = data.get('title')?.toString();
  const content = data.get('content')?.toString();

  console.log(id)
  console.log(title)
  console.log(content)

  if (!id || !title || !content) {
    return;
  }

  const prisma = new PrismaClient();

  await prisma.post.upsert({
    where: { id: parseInt(id) },
    update: {
      title: title,
      content: content,
    },
    create: {
      title: title,
      content: content,
    },
  });
}


export default function Page({ params }: { params: { id: string } }) {
  const blog = use(GetBlog(params.id)) as Blog;

  return (
    <form action={PatchBlog} className="blog-editor">
      <input type='hidden' name='id' value={blog.id.toString()} />
      <input type='text' name='title' defaultValue={blog.title} className='title' />
      <TipTap blog={blog} />
      <div className="bottom-button-area bg-sub">
        <button type="submit">登録</button>
      </div>
    </form>
  );
};