'use client'

import { useRef, useState, useEffect } from 'react'
import { getAllCategories } from '@/lib/category/getAllCategories'
import { Category } from '@prisma/client'
import '@/app/stylesheets/product_form.scss'
import { createImagePreviewUrl } from '@/lib/createImagePreviewUrl'

type ProductFormProps = {
  id?: string,
  name?: string,
  price?: number,
  slug?: string,
  description?: string,
  baseLink?: string | null,
  imgSrc?: ImgSrc,
  categories?: Category[],
  uploadedImageKeys?: ImageKey,
  serverAction?: any,
}

interface ImgSrc {
  [src: string]: Urls,
}

type Urls = {
  url?: string,
  id?: number,
}

type ImageKey = {
  [id: string]: string,
}

type ImageKeyWithId = {
  new: string[],
  already: ImageKey
}

function deleteValueFromAlready(obj: ImageKey, valueToDelete: string) {
  for (const [key, value] of Object.entries(obj)) {
    if (value === valueToDelete) {
      delete obj[key];
    }
  }
  return obj
}

const ProductForm = ({ id, name, price, slug, description, baseLink, imgSrc, uploadedImageKeys, categories, serverAction }: ProductFormProps) => {

  const inputFileRef = useRef<HTMLInputElement>(null);
  const [imageFiles, setImageFiles] = useState<File[]>([])
  const [imageUrls, setImageUrls] = useState<ImgSrc>(imgSrc || {});
  const [imageKeys, setImageKeys] = useState<ImageKeyWithId>({ new: [], already: uploadedImageKeys || {} })
  const [deletedImageIds, setDeletedImageIds] = useState<number[]>([])
  const [categoriesState, setCategoriesState] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | ''>(categories?.[0]?.id || '');

  useEffect(() => {
    const getCategory = (async () => {
      setCategoriesState(await getAllCategories());
    });
    getCategory();
  }, []);

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    imageFiles.forEach(img => {
      formData.append('imageData', img)
    })
    serverAction(formData)
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.currentTarget?.files && e.currentTarget.files[0]) {
      const targetFile = e.currentTarget.files[0];
      setImageFiles(prevImageFiles => [...prevImageFiles, targetFile]);

      const url = await createImagePreviewUrl(targetFile)
      let notStateKeys = imageKeys
      notStateKeys.new.push(targetFile.name)
      // DBに保存するようにキーを持っておく
      // このキーをもとにS3からデータを取得する
      setImageKeys(notStateKeys)
      setImageUrls(prevImageUrls => ({
        ...prevImageUrls,
        [targetFile.name]: {
          url: url
        }
      }))
    }
  };

  const deleteImage = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const clickedElement = event.target as HTMLDivElement;
    const deleteKey = clickedElement.getAttribute('data-filename') || '';
    const deleteId = clickedElement.getAttribute('data-image-id') || '';
    // imageKeys.newから削除
    const filterdNew = imageKeys.new.filter(key => key !== deleteKey)
    // imageKeys.alreadyから削除
    const filterdAlready = deleteValueFromAlready(imageKeys.already, deleteKey)
    setDeletedImageIds([...deletedImageIds, Number(deleteId)])
    setImageKeys({ new: filterdNew, already: filterdAlready });
    const newUrls = { ...imageUrls }
    delete newUrls[deleteKey]
    setImageUrls(newUrls)
  }

  // 必要なデータ
  // 画像、タイトル、値段、色
  return (
    <form onSubmit={handleSubmit} className="product-editor">
      <input type='hidden' name='id' value={id} />
      <input type='hidden' name='imageKeys' value={JSON.stringify(imageKeys)} />
      <input type='hidden' name='deletedImageIds' value={JSON.stringify(deletedImageIds)} />
      <section className='input-section'>
        <div className='input-box'>
          <label htmlFor='name-box' className='text-sub'>名前</label>
          <input type='text' id='name-box' name='name' defaultValue={name || ''} className='name bg-sub text-base' />
        </div>
        {(categoriesState.length === 0 ?
          <div>Getting all categories... wait...</div>
          :
          <select
            id="category-select"
            name="categoryId"
            value={selectedCategory ?? ''}
            onChange={(e) => setSelectedCategory(e.target.value ? Number(e.target.value) : '')}
          >
            <option value="" disabled>
              -- 親カテゴリを選択 --
            </option>
            {/* TODO: フルパスのカテゴリを出す */}
            {categoriesState.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>)}
        <div className='input-box'>
          <label htmlFor='price-box' className='text-sub'>値段</label>
          <input type='text' id='price-box' name='price' defaultValue={price || ''} className='price bg-sub text-base' />
        </div>
        <div className='input-box'>
          <label htmlFor='base-link-box' className='text-sub'>BASE</label>
          <input type='text' id='base-link-box' name='base-link' defaultValue={baseLink || ''} className='base-link bg-sub text-base' />
        </div>
        <div className='input-box'>
          <label htmlFor='slug' className='text-sub'>スラグ</label>
          <input type='text' id='slug' name='slug' defaultValue={slug || ''} className='slug bg-sub text-base' />
        </div>
        <input ref={inputFileRef} type="file" id="image" name="file" multiple={true} onChange={handleFileChange} />
        <div className='image-preview-area'>
          {
            Object.keys(imageUrls).map((key) => (
              <div className="product-image" key={key}>
                <div className={`delete ${key}`} data-filename={key} data-image-id={imageUrls[key]?.id} onClick={deleteImage}>x</div>
                <img key={key} src={imageUrls[key].url} alt={key} />
              </div>
            ))
          }
        </div>
        <div className='input-box'>
          <label htmlFor='description' className='text-sub'>説明</label>
          <textarea id='description' name='description' defaultValue={description || ''} className='description bg-sub text-base' />
        </div>
      </section>
      <div className="bottom-button-area">
        <button type="submit" className='text-sub bg-accent submit-button'>登録</button>
      </div>
    </form>
  )
}

export default ProductForm
