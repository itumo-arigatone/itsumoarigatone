'use client'

import Link from 'next/link';
import '@/app/stylesheets/footer.scss'

const Footer = () => {
  return (
    <footer className="center mt-5 bg-sub text-base p-4 text-xs">
      <div className='link-area text-accent'>
        <Link href='/'>作品一覧</Link>
        <Link href='/blog'>ブログ</Link>
      </div>
      <div className="copyright">Copyright © 2025 Itsumoarigatone. All Rights Reserved.</div>
    </footer>
  )
}

export default Footer