'use client'
import heic2any from 'heic2any';

export const ReadHeic2Any = async (imageFile: File): Promise<File> => {
  const heicRegex = /\.heic$/i;

  if (imageFile.type === 'image/heif' || imageFile.type === 'image/heic' || heicRegex.test(imageFile.name)) {
    // HEIC/HEIF ファイルの場合、JPEG に変換
    const outputBlob = await heic2any({
      blob: imageFile,
      toType: 'image/jpeg',
    });

    if (!Array.isArray(outputBlob)) {
      // Blob を新しい File オブジェクトに変換
      const jpegFile = new File([outputBlob], imageFile.name.replace(heicRegex, '.jpg'), {
        type: 'image/jpeg',
        lastModified: Date.now(),
      });
      return jpegFile;
    } else {
      throw new Error('Conversion returned multiple blobs');
    }
  }

  // HEIC/HEIF 以外の場合、そのまま返す
  return imageFile;
};