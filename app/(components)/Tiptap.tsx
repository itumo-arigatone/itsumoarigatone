'use client'

import { useState } from 'react'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import '@/app/stylesheets/tiptap.css'
import TiptapMenuBar from '@/app/(components)/TiptapMenuBar'

interface Param {
  blog: Blog | null;
}

interface Blog {
  id: number;
  title: string;
  content: string;
  created_at: Date;
}

const Tiptap = (param: Param) => {
  const [content, setContent] = useState(param.blog?.content || null);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Image
    ],
    content: content,
    onUpdate({ editor }) {
      setContent(editor.getHTML());
    },
  })


  return (
    <>
      <TiptapMenuBar editor={editor} />
      <EditorContent editor={editor} />
      <input type='hidden' name='content' defaultValue={content || ''} />
    </>
  )
}

export default Tiptap