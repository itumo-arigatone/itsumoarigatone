const ShopArea = () => {
  const baseLogo = '/base_logo_horizontal_white.png'
  const amazonLogo = '/icons8-amazon.svg'

  return (
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
      <h2 className="sr-only">Products</h2>
      <div className="grid grid-cols-2 gap-x-6 gap-y-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
        <a href="#" className="group">
          <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-accent xl:aspect-h-8 xl:aspect-w-7">
            <img src={baseLogo} height={48} className="max-h-12"
              alt="ベイスリンク" />
          </div>
        </a>
        <a href="#" className="group">
          <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-accent xl:aspect-h-8 xl:aspect-w-7 flex justify-center">
            <img src={amazonLogo} className="max-h-12"
              alt="amazonリンク" />
          </div>
        </a>
      </div>
    </div>
  )
}

export default ShopArea