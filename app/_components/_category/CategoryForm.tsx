'use client'

import { useState, useEffect, use } from 'react';
import { Category } from '@prisma/client'
import '@/app/stylesheets/product_form.scss';
import { getAllCategories } from '@/lib/category/getAllCategories';

type categoryFormProps = {
  id?: string,
  name?: string,
  slug?: string,
  description?: string,
  serverAction?: any,
}

const CategoryForm = ({ id, name, slug, description, serverAction }: categoryFormProps) => {

  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | ''>('');
  const handleSubmit = async (event: any) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    serverAction(formData)
  }

  useEffect(() => {
    const getCategory = (async () => {
      setCategories(await getAllCategories());
    });
    getCategory();
  }, []);

  // 必要なデータ
  // 画像、タイトル、値段、色
  return (
    <form onSubmit={handleSubmit} className="product-editor">
      <div className='text-sub'>
        親が別のカテゴリを追加する際は新規にカテゴリを追加してください
      </div>
      <input type='hidden' name='id' value={id} />
      <section className='input-section'>
        <div className='input-box'>
          <label htmlFor='name-box' className='text-sub'>名前</label>
          <input type='text' id='name-box' name='name' defaultValue={name || ''} className='name bg-sub text-base' />
        </div>
        <div className='input-box'>
          <label htmlFor="category-select" className='text-sub'>親カテゴリを選択:</label>
          {(categories ?
            <select
              id="category-select"
              name="parentId"
              value={selectedCategory ?? ''}
              onChange={(e) => setSelectedCategory(e.target.value ? Number(e.target.value) : '')}
            >
              <option value="" disabled>
                -- 親カテゴリを選択 --
              </option>
              {/* TODO: フルパスのカテゴリを出す */}
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select> : <div>Getting all categories... wait...</div>)}
        </div>
        <div className='input-box'>
          <label htmlFor='slug' className='text-sub'>スラグ</label>
          <input type='text' id='slug' name='slug' defaultValue={slug || ''} className='slug bg-sub text-base' />
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

export default CategoryForm;
