type ImageKey = {
  [id: string]: string,
}

type ImageKeyWithId = {
  new: string[],
  already: ImageKey
}

function deleteValueFromAlready(obj: ImageKey, imageFiles: File[]) {
  const files = []
  for (const [key, value] of Object.entries(obj)) {
    for (let i = 0; i < imageFiles.length; i++) {
      const file = imageFiles[i];
      if (file.name === key) {
        files.push(file);
        break;
      }
    }
  }
  return files
}

export const syncKeyAndFile = (imageKeys: ImageKeyWithId, imageFiles: File[]) => {
  const result = [];

  // imageKeys.newから同期
  for (const key of imageKeys.new) {
    for (let i = 0; i < imageFiles.length; i++) {
      const file = imageFiles[i];
      if (file.name === key) {
        result.push(file);
        break;
      }
    }
  }
  // imageKeys.alreadyを同期
  return [...result, ...deleteValueFromAlready(imageKeys.already, imageFiles)]
}