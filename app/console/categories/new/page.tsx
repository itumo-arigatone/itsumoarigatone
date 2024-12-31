import { PrismaClient, CategoryClosure } from '@prisma/client';
import { redirect } from 'next/navigation'
import CategoryForm from '@/app/_components/_category/CategoryForm'
import Link from 'next/link';
import { revalidateTag } from 'next/cache';
import '@/app/stylesheets/console/products/new.css'

async function CreateCategory(data: FormData) {
  'use server'

  revalidateTag('category');
  const name = data.get('name')?.toString();
  const description = data.get('description')?.toString();
  const slug = data.get('slug')?.toString();

  if (!name || !description || !slug) {
    alert("項目を入力してください");
    return;
  }
  try {
    const prisma = new PrismaClient();
    const newCategory = await prisma.category.create({
      data: {
        name: name,
        description: description,
        slug: slug,
      },
    })


    const parentIdString = data.get('parentId');
    let parentClosures: CategoryClosure[] = [];
    // 自身との自己参照関係を追加
    const closureData = [{ ancestorId: newCategory.id, descendantId: newCategory.id }];
    if (parentIdString) {
      const parentId = Number(parentIdString);

      // クロージャーテーブルの更新
      parentClosures = parentId
        ? await prisma.categoryClosure.findMany({
          where: { descendantId: parentId },
        })
        : [];

      // 自己参照関係を追加
      closureData.push(...parentClosures.map((parentClosure) => ({
        ancestorId: parentClosure.ancestorId,
        descendantId: newCategory.id,
      })))

      closureData.push({ ancestorId: parentId, descendantId: newCategory.id });
      await prisma.categoryClosure.createMany({
        data: closureData,
      });
    }

    redirect('/console/categories/');
  } catch (error) {
    console.error(error);
  }
}

export default function Page() {
  return (
    <>
      <h1 className="text-sub">カテゴリ登録</h1>
      <Link href='/console/categories' className="text-accent">一覧</Link>
      <CategoryForm serverAction={CreateCategory} />
    </>
  );
};
