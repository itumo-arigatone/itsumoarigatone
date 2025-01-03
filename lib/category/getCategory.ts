'use server'

import { PrismaClient } from '@prisma/client';
import { Category } from '@prisma/client';
import { cache } from "react"

export const getCategory = cache(async (slugs: string[]) => {
  if (slugs.length === 0) {
    return { error: true, errorMessage: 'slug is required' };
  }

  let category = null;
  const prisma = new PrismaClient();
  for (const slug of slugs) {
    let result: Category[] = [];
    if (category) {
      result = await prisma.$queryRaw`
      SELECT c.id, c.name, c.description, c.slug
      FROM "Category" c
      JOIN "CategoryClosure" cl ON cl."descendantId" = c.id
      WHERE c.slug = ${slug} AND cl."ancestorId" = ${category.id}
    `;
    } else {
      result = await prisma.$queryRaw`
        SELECT c.id, c.name, c.description, c.slug
        FROM "Category" c
        JOIN "CategoryClosure" cl ON cl."descendantId" = c.id
        WHERE c.slug = ${slug} AND cl."ancestorId" = c.id
      `;
    }

    if (!result || result.length === 0) return null; // 該当なし
    category = result[0];
  }

  if (!category) {
    return { error: true, errorMessage: 'Category not found' };
  }

  return { category: category, error: false };
});
