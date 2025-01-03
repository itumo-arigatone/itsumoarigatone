'use server'

import { PrismaClient, Category } from '@prisma/client';

export async function getAllCategories() {
  const prisma = new PrismaClient();

  const result: Category[] = await prisma.category.findMany();
  return result;
}