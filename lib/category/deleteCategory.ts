'use server'

import { PrismaClient } from '@prisma/client';
import { redirect } from 'next/navigation'

export default async function deleteCategory(categoryId: number) {

  const prisma = new PrismaClient();
  try {
    // トランザクションで削除を管理
    await prisma.$transaction(async (prisma) => {
      // CategoryClosure から関連するデータを削除
      await prisma.categoryClosure.deleteMany({
        where: {
          OR: [
            { ancestorId: categoryId }, // 親カテゴリとしてのエントリ
            { descendantId: categoryId }, // 子カテゴリとしてのエントリ
          ],
        },
      });

      // Category を削除
      await prisma.category.delete({
        where: { id: categoryId },
      });
    });

    console.log(`Category (ID: ${categoryId}) and related closures deleted successfully.`);
  } catch (error) {
    console.error('Error deleting category and related closures:', error);
  } finally {
    redirect("/console/categories/")
  }
}
