import { s3Client } from '@/lib/s3Client'
import { DeleteObjectsCommand } from "@aws-sdk/client-s3";

export async function syncS3Image(deleteKeysArr: Array<string>) {
  const deleteKeys = deleteKeysArr.map(key => ({ Key: key }))
  const command = new DeleteObjectsCommand({
    Bucket: process.env.AMPLIFY_BUCKET,
    Delete: {
      Objects: deleteKeys,
    },
  });

  try {
    const { Deleted } = await s3Client.send(command);
    console.log(
      `Successfully deleted ${Deleted.length} objects from S3 bucket. Deleted objects:`,
    );
    console.log(Deleted.map((d) => ` • ${d.Key}`).join("\n"));
  } catch (err) {
    console.error(err);
  }
}