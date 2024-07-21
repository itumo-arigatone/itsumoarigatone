import { HTMLElement } from 'node-html-parser';

interface ImgSrc {
  [key: string]: string;
}

export function replaceImgSrc(doc: HTMLElement, srcs: ImgSrc) {

  // 特定のクラスを持つ<img>タグを検索する
  const images = doc.querySelectorAll('img.uploaded-image');

  if (Object.keys(srcs).length > 0) {
    images.forEach(img => {
      const key = img.getAttribute('alt')
      if (key) {
        img.setAttribute('src', srcs[key])
      }
    });
  } else {
    // 各<img>タグのsrc属性を置き換える
    images.forEach(img => {
      img.setAttribute('src', '/logo_medium.svg')
    });
  }

  // 置き換えた後のHTML文字列を取得する
  return doc.innerHTML;
}