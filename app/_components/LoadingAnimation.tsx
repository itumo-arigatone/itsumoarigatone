'use client'

import '@/app/stylesheets/loading.scss'

const LoadingAnimation = ({ isBlack = false }) => {
  return (
    <div className={`loader ${isBlack ? 'black' : ''}`}></div>
  )
}

export default LoadingAnimation