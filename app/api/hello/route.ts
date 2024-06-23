import { NextResponse } from 'next/server';
import { ListBucketsCommand, S3Client } from "@aws-sdk/client-s3";

// When no region or credentials are provided, the SDK will use the
// region and credentials from the local AWS config.
const client = new S3Client({
  region: 'ap-northeast-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || 'minioadmin' as string,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || 'minioadmin' as string,
  },
  endpoint: 'http://minio:9000',
});

export async function GET() {
  const command = new ListBucketsCommand({});

  const { Buckets } = await client.send(command);
  if (Buckets) {
    console.log("Buckets: ");
    console.log(Buckets.map((bucket) => bucket.Name).join("\n"));
    return NextResponse.json({ bukets: Buckets });
  } else {
    return NextResponse.json({ bukets: 'not found' });
  }
}