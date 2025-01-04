import Link from 'next/link';
import React from "react";
import '@/app/stylesheets/console/index.css';

export default function Page() {
  return (
    <div className='menu'>
      <Link href={`blogs/`} className='text-accent'>ブログ一覧</Link>
      <Link href={`products/`} className='text-accent'>商品一覧</Link>
      <Link href={`categories/`} className='text-accent'>カテゴリ一覧</Link>
    </div>
  );
};