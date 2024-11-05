'use server'

import { PrismaClient } from '@prisma/client';

export async function getActiveBlogsWithoutImage() {
  const prisma = new PrismaClient();
  return await prisma.post.findMany({
    orderBy: [
      {
        updated_at: 'desc',
      }
    ]
  })
}