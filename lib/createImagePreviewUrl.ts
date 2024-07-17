export function createImagePreviewUrl(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    if (!file) {
      resolve('');
      return;
    }

    let reader: FileReader | null = new FileReader();
    reader.onloadend = () => {
      // base64のimageUrlを生成する。
      const base64 = reader && reader.result;

      if (base64 && typeof base64 === 'string') {
        resolve(base64);
      } else {
        resolve('');
      }
    };

    reader.onerror = () => {
      reject(new Error('Failed to read file'));
    };

    reader.readAsDataURL(file);
  });
}