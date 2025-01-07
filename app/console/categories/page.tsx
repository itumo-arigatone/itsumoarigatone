'use client'

import Link from 'next/link';
import { getAllCategories } from '@/lib/category/getAllCategories';
import { useEffect, useState } from 'react';
import { formatDate } from '@/lib/formatDate';
import { Category } from '@prisma/client';
import '@/app/stylesheets/console/products/page.scss';

const Page = () => {
  const [categories, setCategories] = useState<Category[]>([])
  useEffect(() => {
    async function fetchData() {
      try {
        setCategories(await getAllCategories());
        console.log('complete get all categories')
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }

    fetchData();
  }, []);

  return (
    <div>
      <h1 className='text-sub'>カテゴリ一覧</h1>
      <Link href="/console" className='text-accent'>管理TOPへ</Link>
      <section className='text-sub'>
        <ul>
          <div className='button-area'>
            <Link href={'new'} className='create-button bg-accent'>新しいカテゴリを登録</Link>
          </div>
          {categories?.map((category) => (
            <li key={category.id}>
              <Link href={`${category.id}`}>
                <h3 className="text-sub">{category.name}</h3>
                <div className="text-accent blog-created">
                  {formatDate(category.createdAt)}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default Page;