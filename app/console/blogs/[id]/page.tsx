import { use } from 'react';
import TipTap from "@/app/(components)/Tiptap";
import { PrismaClient } from '@prisma/client';
import { redirect } from 'next/navigation'
import { parse, HTMLElement } from 'node-html-parser';
import { viewS3Client } from "@/lib/viewS3Client"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { replaceImgSrc } from '@/lib/replaceImgSrc';
import { deleteBlog } from "@/lib/blog/deleteBlog";

import '@/app/stylesheets/console/blogs/page.scss'

interface Blog {
  id: number;
  title: string;
  content: string;
  created_at: Date;
}

interface ImgSrc {
  [src: string]: string;
}


async function GetBlog(id: string) {
  'use server'

  const prisma = new PrismaClient();
  const Bucket = process.env.AMPLIFY_BUCKET;

  if (!id) {
    return null;
  }

  const post = await prisma.post.findUnique({
    where: { id: parseInt(id) },
    include: {
      images: true,
    },
  })

  if (!post) {
    return null;
  }

  const domContent = parse(post.content)

  // タグからキーを取得する
  let imgSrc: ImgSrc = {}
  const imgElements = domContent.querySelectorAll('img.uploaded-image');

  for (const img of imgElements) {
    const key = img.getAttribute('alt');

    if (key) {
      const command = new GetObjectCommand({ Bucket, Key: `blog/${id}/${key}` });
      imgSrc[key] = await getSignedUrl(viewS3Client(), command, { expiresIn: 3600 });
    }
  }

  post.content = replaceImgSrc(domContent, imgSrc)

  return post;
}

async function PatchBlog(data: FormData) {
  'use server'

  const id = data.get('id')?.toString();
  const action = data.get('action');

  if (action === 'delete') {
    // delete
    deleteBlog(Number(id))
    redirect('/console/blogs');
  } else if (action === 'update') {
    // patch
    const title = data.get('title')?.toString();
    const content = data.get('content')?.toString();

    if (!id || !title || !content) {
      return;
    }

    const prisma = new PrismaClient();

    const result = await prisma.post.upsert({
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

    if (result) {
      redirect('/console/blogs');
    }
  }
}


export default function Page({ params }: { params: { id: string } }) {
  const blog = use(GetBlog(params.id)) as Blog;

  return (
    <form action={PatchBlog} className="blog-editor">
      <input type='hidden' name='id' value={blog.id.toString()} />
      <input type='text' name='title' defaultValue={blog.title} className='title' />
      <TipTap blog={blog} />
      <div className="bottom-button-area bg-sub">
        <button type="submit" name="action" value="delete">削除</button>
        <button type="submit" name="action" value="update">登録</button>
      </div>
    </form>
  );
};