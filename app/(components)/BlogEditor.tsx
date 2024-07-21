'use client'

import { useState } from 'react'
import TipTap from "@/app/(components)/Tiptap";

import '@/app/stylesheets/console/blogs/page.scss'

export const BlogEditor = ({ serverAction }: any) => {
  const [image, setImage] = useState<File[]>([])

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    image.forEach(img => {
      formData.append('imageData', img)
    })
    serverAction(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="blog-editor">
      <input type='text' name='title' className='title' />
      <TipTap setImage={setImage} />
      <div className="bottom-button-area bg-sub">
        <button type="submit">登録</button>
      </div>
    </form>
  )
}
