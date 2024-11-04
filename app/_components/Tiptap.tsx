'use client'

import { useState } from 'react'
import { EditorContent, useEditor } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import Image from '@tiptap/extension-image'
import TiptapMenuBar from '@/app/_components/TiptapMenuBar'
import '@/app/stylesheets/tiptap.css'
import { all, createLowlight } from 'lowlight'
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight'
import '@/app/stylesheets/components/code_highlight.scss';

// create a lowlight instance with all languages loaded
const lowlight = createLowlight(all)

interface Param {
  blog?: Blog;
  setImage?: any;
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
      Image.configure({
        HTMLAttributes: {
          allowBase64: true,
          class: 'uploaded-image',
        },
      }),
      CodeBlockLowlight.configure({
        lowlight
      }),
    ],
    content: content,
    onUpdate({ editor }) {
      setContent(editor.getHTML());
    },
  })


  return (
    <>
      <TiptapMenuBar editor={editor} setImage={param.setImage} />
      <EditorContent editor={editor} />
      <input type='hidden' name='content' defaultValue={content || ''} />
    </>
  )
}

export default Tiptap