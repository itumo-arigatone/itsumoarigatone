import { S3Client } from "@aws-sdk/client-s3";

export function viewS3Client() {
  const isProduction = process.env.NODE_ENV === 'production';

  let s3 = new S3Client({
    region: 'ap-northeast-1',
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID || 'minioadmin' as string,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || 'minioadmin' as string,
    },
    forcePathStyle: true,
    ...(isProduction ? {} : {
      endpoint: 'http://127.0.0.1:9000',
    }),
  });
  return s3;
}
