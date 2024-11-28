'use client'

import '@/app/stylesheets/components/shop_area.scss'

const ShopArea = () => {
  const baseLogo = '/base_logo_horizontal_white.png'
  const amazonLogo = '/icons8-amazon.svg'

  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
      <h2 className="sr-only">販売所</h2>
      <div className="link-section">
        <a href="https://itsumogatone.base.ec/" className="group bg-accent">
          <div className="">
            <img src={baseLogo} height={48} width={119} className="max-h-12"
              alt="ベイスリンク" />
          </div>
        </a>
        <a href='/blog/' className="group bg-accent blog-link">
          <div className="blog-link-text">
            ブログ
          </div>
        </a>
      </div>
    </div>
  )
}

export default ShopArea