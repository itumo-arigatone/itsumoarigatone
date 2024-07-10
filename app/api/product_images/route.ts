import { NextRequest, NextResponse } from "next/server";
import {
  S3Client,
  GetObjectCommand,
  PutObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const Bucket = process.env.AMPLIFY_BUCKET;
let s3dev: any;
if (process.env.NODE_ENV === 'development') {
  s3dev = new S3Client({
    region: 'ap-northeast-1',
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID || 'minioadmin' as string,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || 'minioadmin' as string,
    },
    endpoint: 'http://127.0.0.1:9000',
    forcePathStyle: true,
  });
}
let s3 = new S3Client({
  region: 'ap-northeast-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || 'minioadmin' as string,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || 'minioadmin' as string,
  },
  endpoint: 'http://minio:9000', // TODO: product_endpoint
  forcePathStyle: true,
});

// endpoint to get the list of files in the bucket
export async function GET(params: any) {
  const { searchParams } = new URL(params.url);
  const key = searchParams.get("key");
  const command = new GetObjectCommand({ Bucket, Key: key });
  const client = process.env.NODE_ENV === 'development' ? s3dev : s3
  const src = await getSignedUrl(client, command, { expiresIn: 3600 });

  return NextResponse.json(src);
}

export async function getMultipleImages(keys: Array<string>) {
  const images = await keys.map((key) => {
    const command = new GetObjectCommand({ Bucket, Key: key });
    const client = process.env.NODE_ENV === 'development' ? s3dev : s3
    return getSignedUrl(client, command, { expiresIn: 3600 }).then((url) => {
      key
      url
    })
  });

  return NextResponse.json({ images });
}
