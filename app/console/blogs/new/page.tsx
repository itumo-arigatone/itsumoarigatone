import { redirect } from 'next/navigation'
import { PrismaClient } from '@prisma/client';
import { parse, HTMLElement } from 'node-html-parser';
import { BlogEditor } from '@/app/(components)/BlogEditor';
import { replaceImgSrc } from '@/lib/replaceImgSrc';
import { uploadImages } from '@/lib/uploadImages';
import { syncKeyAndFile } from '@/lib/syncKeyAndFile';
import { convertToFiles } from '@/lib/convertToFiles';
import '@/app/stylesheets/console/blogs/page.scss'

async function PostBlog(data: FormData) {
  'use server'

  const action = data.get('action')?.toString();
  console.log(data)
  console.log(action)

  if (action === 'save') {
    const title = data.get('title')?.toString()
    const content = data.get('content')?.toString()
    const imageFiles = data.getAll('imageData')

    if (!title || !content) {
      return;
    }

    const prisma = new PrismaClient()
    const domContent = parse(content)

    // タグからキーを取得する
    const imageKeys: string[] = [];
    domContent.querySelectorAll('img.uploaded-image').forEach((img: HTMLElement) => {
      const key = img.getAttribute('alt')
      if (key) {
        imageKeys.push(key)
      }
    })

    const result = await prisma.post.create({
      data: {
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
    redirect('/console/blogs');
  }
}


export default function Page() {

  return (
    <BlogEditor serverAction={PostBlog} />
  );
};