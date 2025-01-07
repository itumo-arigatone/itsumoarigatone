'use client'

import '../stylesheets/top_first_view.scss'
import Image from 'next/image'

export default function TopFistView() {
  return (
    <div className="relative top-first-view">
      <div className="mx-auto">
        <div className="relative shadow-xl sm:overflow-hidden">
          <div className="absolute inset-0 image-wrapper">
            <div className="absolute inset-0 image-filter">
              <Image className="h-full w-full" src="/logo_medium.svg" alt="Itsumoarigatone" width={900} height={600} priority />
            </div>
          </div>
          <div className="relative px-4 py-16 sm:px-6 sm:py-24 lg:py-32 lg:px-8">
            <p className="relative left-0 right-0 mx-auto mt-5 max-w-xl text-center sm:tracking-tight text-sm sm:text-xl lg:text-4xl font-semibold tracking-wide text-sub">
              革小物
            </p>
            <h1 className="mt-1 text-center text-gray-200">
              <span className="block text-sub text-2xl sm:text-4xl sm:tracking-tight lg:text-7xl">
                Itsumoarigatone
              </span>
            </h1>
          </div>
        </div>
      </div>
    </div>
  )
}