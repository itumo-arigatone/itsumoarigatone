'use client'

import { useRef, useState } from 'react'
import '@/app/stylesheets/product_form.css'

type ProductFormProps = {
  id: number | null,
  name: string | null,
  price: string | null,
  slug: string | null,
  description: string | null,
}

type ImageResponse = {
  [key: string]: string;
};

const ProductForm = ({ id, name, price, slug, description }: ProductFormProps) => {

  const inputFileRef = useRef<HTMLInputElement>(null);
  const imageUrls = useRef<ImageResponse>({})
  const [imageKeys, setImageKeys] = useState<Array<string>>([])

  const handleFileChange = async (e: any) => {
    const file = e.target.files[0];

    if (!file) {
      return;
    }

    const formData = new FormData();
    formData.append('file', file);
    formData.append('path', 'products/');

    const res = await fetch('/api/image_upload', {
      method: 'POST',
      body: formData,
    });

    const urls: ImageResponse = await res.json();
    let notStateKeys = imageKeys
    Object.keys(urls).forEach((key: string) => {
      notStateKeys.push(key)
      setImageKeys(notStateKeys)
    });

    imageUrls.current = urls
    if (res.status === 200) {
      for (const key in imageUrls.current) {
        if (imageUrls.current.hasOwnProperty(key)) {
          // TODO: 画像を表示
        }
      }
    } else {
      alert('ファイルのアップロードに失敗しました。');
    }
  };

  // 必要なデータ
  // 画像、タイトル、値段、色
  return (
    <>
      <input type='hidden' name='id' value={id?.toString() || ''} />
      <input type='hidden' name='images' value={JSON.stringify(imageKeys)} />
      <section className='input-section'>
        <div className='input-box'>
          <label htmlFor='name-box' className='text-sub'>名前</label>
          <input type='text' id='name-box' name='name' defaultValue={name || ''} className='name bg-sub text-base' />
        </div>
        <div className='input-box'>
          <label htmlFor='price-box' className='text-sub'>値段</label>
          <input type='text' id='price-box' name='price' defaultValue={price || ''} className='price bg-sub text-base' />
        </div>
        <div className='input-box'>
          <label htmlFor='slug' className='text-sub'>スラグ</label>
          <input type='text' id='slug' name='slug' defaultValue={slug || ''} className='slug bg-sub text-base' />
        </div>
        <input ref={inputFileRef} type="file" id="image" name="file" onChange={handleFileChange} />
        <div className='input-box'>
          <label htmlFor='description' className='text-sub'>説明</label>
          <textarea id='description' name='description' defaultValue={description || ''} className='description bg-sub text-base' />
        </div>
      </section>
    </>
  )
}

export default ProductForm
