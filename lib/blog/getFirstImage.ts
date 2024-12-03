'use server'

export async function getFirstImage(id: number, keyParam: string) {
  // タグからキーを取得する
  const Bucket = process.env.AMPLIFY_BUCKET;
  let imgSrc = "/logo_medium.svg";

  const key = keyParam;

  if (key) {
    imgSrc = `${process.env.IMAGE_HOST}/${process.env.AMPLIFY_BUCKET}/blog/${id}/${key}`
  }

  return imgSrc;
}