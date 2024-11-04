'use client'

import { useState } from 'react'
import TipTap from "@/app/_components/Tiptap";

import '@/app/stylesheets/console/blogs/edit_page.scss'

export const UpdateBlogEditor = ({ serverAction, blog }: any) => {
  const [image, setImage] = useState<File[]>([])

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const action = event.nativeEvent.submitter.value;
    formData.append('action', action);
    // content の値を取得して img タグの src を空にする
    let content = formData.get('content')?.toString() || '';
    content = content.replace(/<img[^>]+src="[^"]*"[^>]*>/g, (imgTag) =>
      imgTag.replace(/src="[^"]*"/, 'src=""')
    );
    formData.set('content', content);

    image.forEach(img => {
      formData.append('imageData', img)
    })
    serverAction(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="blog-editor">
      <input type='hidden' name='id' value={blog.id.toString()} />
      <input type='text' name='title' defaultValue={blog.title} className='title' />
      <TipTap blog={blog} setImage={setImage} />
      <div className="bottom-button-area bg-sub">
        <div className='button-area-left'>
          <button type="submit" name="action" value="cancel">キャンセル</button>
          <button type="submit" name="action" value="delete">削除</button>
        </div>
        <button type="submit" name="action" value="update">登録</button>
      </div>
    </form>
  )
}
