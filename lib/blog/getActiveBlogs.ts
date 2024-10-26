'use server'

import { PrismaClient } from '@prisma/client';

export async function getActiveBlogs() {
  const prisma = new PrismaClient();
  return await prisma.post.findMany({
    include: { images: true },
    orderBy: [
      {
        updated_at: 'desc',
      }
    ]
  })
}