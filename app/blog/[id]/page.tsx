import Footer from "@/app/(components)/Footer";
import Header from "@/app/(components)/SimpleHeader";
import SafeHTML from '@/app/(components)/SafeHTML';
import '/app/stylesheets/blog/detail_page.scss';
import { parse } from 'node-html-parser';
import { PrismaClient } from '@prisma/client';
import { viewS3Client } from "@/lib/viewS3Client"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { replaceImgSrc } from '@/lib/replaceImgSrc';
import { use } from 'react';

interface Post {
  title: string;
  content: string;
}

interface ImgSrc {
  [src: string]: string;
}

async function GetBlog(id: string) {
  'use server'

  const Bucket = process.env.AMPLIFY_BUCKET;
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

export default function Page({ params }: { params: { id: string } }) {
  const post = use(GetBlog(params.id as string)) as Post

  return (
    <>
      <Header />
      <div className="blog-detail">
        <a href="/blog" className="list-link">
          <span>
            一覧へ
          </span>
        </a>
        <div className="blog-contents">
          <h1>{post.title}</h1>
          <SafeHTML className="blog-content" html={post.content} />
        </div>
      </div>
      <Footer />
    </>
  );
};