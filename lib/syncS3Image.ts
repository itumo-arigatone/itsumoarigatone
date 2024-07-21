import { s3Client } from '@/lib/s3Client'
import {
  DeleteObjectsCommand,
  ListObjectsV2Command
} from "@aws-sdk/client-s3";

export async function syncS3Image(exsistKeysArr: Array<string>, prefix: string) {
  try {
    const listCommand = new ListObjectsV2Command({
      Bucket: process.env.AMPLIFY_BUCKET,
      Prefix: prefix,
    });

    const response = await s3Client().send(listCommand)
    let deleteKeysArr = [] as Array<string>
    if (response.Contents) {
      let s3AllKeys = response.Contents.map(object => (object.Key)) as Array<string>
      deleteKeysArr = s3AllKeys.filter(key => !exsistKeysArr.includes(key));
    } else {
      console.log('No objects found.')
    }
    const deleteKeys = deleteKeysArr.map(key => ({ Key: key }))
    const deleteCommand = new DeleteObjectsCommand({
      Bucket: process.env.AMPLIFY_BUCKET,
      Delete: {
        Objects: deleteKeys,
      },
    });
    const { Deleted } = await s3Client().send(deleteCommand);
    console.log(
      `Successfully deleted ${Deleted?.length} objects from S3 bucket. Deleted objects:`,
    );
    console.log(Deleted?.map((d) => ` • ${d.Key}`).join("\n"));
  } catch (err) {
    console.error(err);
  }
}