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
export async function GET(_: Request, { params }: { params: { key: string } }) {
  const command = new GetObjectCommand({ Bucket, Key: params.key });
  const src = await getSignedUrl(s3, command, { expiresIn: 3600 });

  return NextResponse.json({ src });
}

// endpoint to upload a file to the bucket
export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const files = formData.getAll("file") as File[];

  const responses = await Promise.all(
    files.map(async (file) => {
      const Key = file.name;
      const Body = await file.arrayBuffer() as Buffer;

      // Upload the file to S3
      await s3.send(new PutObjectCommand({ Bucket, Key, Body }));

      // Generate a signed URL for the uploaded file
      const command = new GetObjectCommand({ Bucket, Key });
      const client = process.env.NODE_ENV === 'development' ? s3dev : s3
      let url = await getSignedUrl(client, command, { expiresIn: 3600 });

      return { [Key]: url };
    })
  );

  // responses をマージして、1つのオブジェクトにまとめる
  const mergedResponse = responses.reduce((acc, obj) => ({ ...acc, ...obj }), {});

  return NextResponse.json(mergedResponse);
}
