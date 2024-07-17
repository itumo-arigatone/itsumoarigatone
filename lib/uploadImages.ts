import { s3Client } from "@/lib/s3Client";
import {
  PutObjectCommand,
} from "@aws-sdk/client-s3";

const Bucket = process.env.AMPLIFY_BUCKET;

// endpoint to upload a file to the bucket
export async function uploadImages(path: string, files: File[]) {

  const responses = await Promise.all(
    files.map(async (file) => {
      const Key = `${path}${file.name}`;
      const Body = await file.arrayBuffer() as Buffer;

      // Upload the file to S3
      await s3Client.send(new PutObjectCommand({ Bucket, Key, Body }));
    })
  );
}
