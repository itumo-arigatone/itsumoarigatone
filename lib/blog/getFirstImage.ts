'use server'

import { viewS3Client } from "@/lib/viewS3Client"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { PrismaClient } from '@prisma/client';

export async function getFirstImage(id: number, keyParam: string) {
  // タグからキーを取得する
  const Bucket = process.env.AMPLIFY_BUCKET;
  let imgSrc = "/logo_medium.svg";

  const key = keyParam;

  if (key) {
    const command = new GetObjectCommand({ Bucket, Key: `blog/${id}/${key}` });
    imgSrc = await getSignedUrl(viewS3Client(), command, { expiresIn: 3600 });
  }

  return imgSrc;
}