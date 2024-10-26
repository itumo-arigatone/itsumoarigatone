'use client'

const clearTags = (rawText: string) => {
  return rawText.replace(/<[^>]*>?/gm, '');
};

export default clearTags;