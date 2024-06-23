import { NextRequest, NextResponse } from "next/server";
import {
  S3Client,
  GetObjectCommand,
  PutObjectCommand,
} from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

const Bucket = process.env.AMPLIFY_BUCKET;
const s3 = new S3Client({
  region: 'ap-northeast-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || 'minioadmin' as string,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || 'minioadmin' as string,
  },
  endpoint: 'http://minio:9000',
  forcePathStyle: true,
});

// endpoint to get the list of files in the bucket
export async function GET(_: Request, { params }: { params: { key: string } }) {
  const command = new GetObjectCommand({ Bucket, Key: params.key });
  const src = await getSignedUrl(s3, command, { expiresIn: 3600 });

  return NextResponse.json({ src });
}

// endpoint to upload a file to the bucket
export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const files = formData.getAll("file") as File[];

  const response = await Promise.all(
    files.map(async (file) => {
      // not sure why I have to override the types here
      const Body = (await file.arrayBuffer()) as Buffer;
      s3.send(new PutObjectCommand({ Bucket, Key: file.name, Body }));
    })
  );

  return NextResponse.json(response);
}
