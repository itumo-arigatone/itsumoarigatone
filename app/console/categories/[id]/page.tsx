import Link from 'next/link';
import { ProductDeleteButton } from '@/app/_components/ProductDeleteButton';
import deleteCategory from '@/lib/category/deleteCategory';
import { notFound } from 'next/navigation';
import { getCategoryById } from '@/lib/category/getCategoryById';

export default async function Page({ params }: { params: { id: string } }) {
  const category = await getCategoryById(Number(params.id))

  if (category.error || !category.category) notFound();
  return (
    <>
      <h1 className="text-sub">カテゴリ編集</h1>
      <Link href='/console/categories' className="text-accent">カテゴリ一覧</Link>
      <ProductDeleteButton type='button' handleDelete={deleteCategory} productId={category.category.id} />
    </>
  );
};