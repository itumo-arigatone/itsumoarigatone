import React from 'react';
import sanitizeHtml from 'sanitize-html';

export default function SafeHTML({ html }: any) {
  const sanitizedHtml = sanitizeHtml(html, {
    allowedTags: sanitizeHtml.defaults.allowedTags.concat([
      'strong', 'em', 's', 'img', 'h2', 'h3', 'p',
      'code', 'ul', 'li', 'ol', 'pre', 'blockquote', 'br'
    ]),
    allowedAttributes: {
      ...sanitizeHtml.defaults.allowedAttributes,
      img: ['src', 'alt'],
    },
  });

  return (
    <div dangerouslySetInnerHTML={{ __html: sanitizedHtml }} />
  );
};