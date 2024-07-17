'use client'

import { useRef, useState } from 'react'
import '@/app/stylesheets/product_form.scss'
import { createImagePreviewUrl } from '@/lib/createImagePreviewUrl'

type ProductFormProps = {
  id: string,
  name: string | null,
  price: number | null,
  slug: string | null,
  description: string | null,
  imgSrc: any
}

type ImageResponse = {
  [key: string]: string;
};

const ProductForm = ({ id, name, price, slug, description, imgSrc }: ProductFormProps) => {

  const inputFileRef = useRef<HTMLInputElement>(null);
  const [imageFiles, setImageFiles] = useState<File[]>([])
  const [imageUrls, setImageUrls] = useState<ImageResponse>(imgSrc || {});
  const [imageKeys, setImageKeys] = useState<Array<string>>(Object.keys(imgSrc || {}).map((key) => key))

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget?.files && e.currentTarget.files[0]) {
      const targetFile = e.currentTarget.files[0];
      setImageFiles(prevImageFiles => [...prevImageFiles, targetFile]);

      const url = await createImagePreviewUrl(targetFile)
      let notStateKeys = imageKeys
      notStateKeys.push(targetFile.name)
      // DBに保存するようにキーを持っておく
      // このキーをもとにS3からデータを取得する
      setImageKeys(notStateKeys)
      setImageUrls(prevImageUrls => ({
        ...prevImageUrls,
        [targetFile.name]: url
      }))
    }
  };

  const deleteImage = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const clickedElement = event.target as HTMLDivElement;
    const deleteKey = clickedElement.getAttribute('data-filename') || '';
    setImageKeys(imageKeys.filter(key => key !== deleteKey));
    const newUrls = { ...imageUrls }
    delete newUrls[deleteKey]
    setImageUrls(newUrls)
  }

  // 必要なデータ
  // 画像、タイトル、値段、色
  return (
    <>
      <input type='hidden' name='id' value={id} />
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
        <input ref={inputFileRef} type="file" id="image" name="file" multiple={true} onChange={handleFileChange} />
        <div className='image-preview-area'>
          {
            Object.keys(imageUrls).map((key) => (
              <div className="product-image">
                <div className={`delete ${key}`} data-filename={key} onClick={deleteImage}>x</div>
                <img key={key} src={imageUrls[key]} alt={key} />
              </div>
            ))
          }
        </div>
        <div className='input-box'>
          <label htmlFor='description' className='text-sub'>説明</label>
          <textarea id='description' name='description' defaultValue={description || ''} className='description bg-sub text-base' />
        </div>
      </section>
    </>
  )
}

export default ProductForm
