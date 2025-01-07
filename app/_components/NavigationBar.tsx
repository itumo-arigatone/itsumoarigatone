'use client'

import '@/app/stylesheets/components/navigation_bar.scss'

export default function NavigationBar() {
  // TODO: set for console page
  return (
    <nav className='navbar'>
      <div className='categories flexbox'>
        <a className="list-link" href="/category/bag/">バッグ</a>
        <a className="list-link" href="/category/wallet/">財布</a>
        <a className="list-link" href="/category/accessory/">その他小物</a>
      </div>
      <div className='other flexbox'>
        <a className="list-link" href="/blog/">ブログ</a>
      </div>
    </nav>
  )
}