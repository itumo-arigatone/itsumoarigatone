import Link from 'next/link';
import React from "react";

export default function Page() {
  return (
    <div>
      <Link href={`blogs/`}>ブログ一覧</Link>
      <Link href={`products/`}>商品一覧</Link>
    </div>
  );
};