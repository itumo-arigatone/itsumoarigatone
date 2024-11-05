'use server'

import { PrismaClient } from '@prisma/client';

export async function getAllProducts() {
  const prisma = new PrismaClient();

  const result = await prisma.product.findMany();
  return result;
}