export const syncKeyAndFile = (imageKeys: string[], imageFiles: File[]) => {
  const result = [];
  for (const key of imageKeys) {
    for (let i = 0; i < imageFiles.length; i++) {
      const file = imageFiles[i];
      if (file.name === key) {
        result.push(file);
        break;
      }
    }
  }
  return result;
}