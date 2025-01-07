'use server'

import { PrismaClient } from '@prisma/client';
import { Category } from '@prisma/client';

export const getCategoryById = async (id: number) => {
  const prisma = new PrismaClient();

  const category: Category | null = await prisma.category.findUnique({
    where: { id: id },
  });

  if (!category) {
    return { error: true, errorMessage: 'Category not found' };
  }

  return { category: category, error: false };
};
