import { use } from 'react';
import { PrismaClient } from '@prisma/client';
import { redirect } from 'next/navigation'
import { parse, HTMLElement } from 'node-html-parser';
import { viewS3Client } from "@/lib/viewS3Client"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { replaceImgSrc } from '@/lib/replaceImgSrc';
import { deleteBlog } from "@/lib/blog/deleteBlog";
import { UpdateBlogEditor } from '@/app/_components/UpdateBlogEditor';
import { uploadImages } from '@/lib/uploadImages';
import { syncKeyAndFile } from '@/lib/syncKeyAndFile';
import { convertToFiles } from '@/lib/convertToFiles';

import '@/app/stylesheets/console/blogs/edit_page.scss'

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

  post.content = replaceImgSrc(domContent, imgSrc);

  return post;
}

async function PatchBlog(data: FormData) {
  'use server'

  const id = data.get('id')?.toString();
  const action = data.get('action')?.toString();

  if (action === 'delete') {
    // delete
    deleteBlog(Number(id));
    redirect('/console/blogs');
  } else if (action === 'update') {
    // patch
    const title = data.get('title')?.toString();
    const content = data.get('content')?.toString();
    const imageFiles = data.getAll('imageData');

    if (!id || !title || !content) {
      return;
    }

    const prisma = new PrismaClient();
    const domContent = parse(content)

    // タグからキーを取得する
    const imageKeys: string[] = [];
    domContent.querySelectorAll('img.uploaded-image').forEach((img: HTMLElement) => {
      const key = img.getAttribute('alt')
      if (key) {
        imageKeys.push(key)
      }
    })

    const result = await prisma.post.upsert({
      where: { id: parseInt(id) },
      update: {
        title: title,
        content: replaceImgSrc(domContent, {}), // 保存するときにimgタグのbase64を消してimageKeyだけ残しておく。
        images: {
          create: imageKeys?.map((key: string) => ({
            key: key
          }))
        },
        updated_at: new Date()
      },
      create: {
        title: title,
        content: replaceImgSrc(domContent, {}), // 保存するときにimgタグのbase64を消してimageKeyだけ残しておく。
        images: {
          create: imageKeys?.map((key: string) => ({
            key: key
          }))
        },
      },
    });

    if (result) {
      // s3にアップロード
      let newKeys = { already: {}, new: imageKeys }
      let files = convertToFiles(imageFiles)
      const syncedFiles = syncKeyAndFile(newKeys, files)
      await uploadImages(`blog/${result.id}/`, syncedFiles)
      redirect('/console/blogs');
    }
  } else {
    redirect('/console/blogs')
  }
}

export default function Page({ params }: { params: { id: string } }) {
  const blog = use(GetBlog(params.id)) as Blog;

  return (
    <UpdateBlogEditor serverAction={PatchBlog} blog={blog} />
  );
};