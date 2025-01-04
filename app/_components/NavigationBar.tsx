'use client'

import '../stylesheets/navigation-bar.scss'

export default function NavigationBar() {
  // TODO: set for console page
  return (
    <nav className='navbar'>
      <a href="/category/bag/">バッグ</a>
      <a href="/category/wallet/">財布</a>
      <a href="/category/accessory/">その他小物</a>
    </nav>
  )
}