'use server'

import { PrismaClient } from '@prisma/client';
import { Post as PrismaPost } from '@prisma/client';
import { parse } from 'node-html-parser';
import { replaceImgSrc } from '@/lib/replaceImgSrc';

interface ExtendedPost extends PrismaPost {
  error?: boolean;
  errorMessage?: string;
}

interface ImgSrc {
  [src: string]: string;
}

export async function getBlog(id: number) {
  const Bucket = process.env.AMPLIFY_BUCKET;
  const prisma = new PrismaClient();

  if (!id) {
    return {
      error: true,
      errorMessage: 'ID is required'
    };
  }

  const post: ExtendedPost | null = await prisma.post.findUnique({
    where: { id: id },
  });

  if (!post) {
    return {
      error: true,
      errorMessage: 'Post not found'
    };
  }

  const domContent = parse(post.content)

  // タグからキーを取得する
  let imgSrc: ImgSrc = {}
  const imgElements = domContent.querySelectorAll('img.uploaded-image');

  for (const img of imgElements) {
    const key = img.getAttribute('alt');

    if (key) {
      imgSrc[key] = `${process.env.IMAGE_HOST}/blog/${id}/${key}`
    }
  }

  post.content = replaceImgSrc(domContent, imgSrc);
  post.error = false;
  return post;
}