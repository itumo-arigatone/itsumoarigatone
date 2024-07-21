// import { NextRequest, NextResponse } from "next/server";
// import {
//   GetObjectCommand,
// } from "@aws-sdk/client-s3";
// import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
// import { s3Client } from "@/lib/s3Client"

// const Bucket = process.env.AMPLIFY_BUCKET;

// endpoint to get the list of files in the bucket
export async function GET(params: any) {
  // const { searchParams } = new URL(params.url);
  // const key = searchParams.get("key");
  // const command = new GetObjectCommand({ Bucket, Key: key });
  // const src = await getSignedUrl(s3Client(), command, { expiresIn: 3600 });

  // return NextResponse.json(src);
}

// export async function GetMultipleImages(keys: Array<string>) {
//   const images = await keys.map((key) => {
//     const command = new GetObjectCommand({ Bucket, Key: key });
//     return getSignedUrl(s3Client(), command, { expiresIn: 3600 }).then((url) => {
//       key
//       url
//     })
//   });

//   return NextResponse.json({ images });
// }
