import { PrismaClient } from "@prisma/client";
import { redirect } from "next/navigation";

export async function deleteBlog(id: number) {
  'use server';

  if (!id) return

  const prisma = new PrismaClient();

  const result = await prisma.post.delete({
    where: { id: id },
  });

  if (result) {
    redirect('/console/blogs');
  }
}