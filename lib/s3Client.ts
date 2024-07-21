import { S3Client } from "@aws-sdk/client-s3";

export function s3Client(): S3Client {
  let s3Client = new S3Client({
    region: 'ap-northeast-1',
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID || 'minioadmin' as string,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || 'minioadmin' as string,
    },
    endpoint: 'http://minio:9000', // TODO: product_endpoint
    forcePathStyle: true,
  })
  return s3Client
}
