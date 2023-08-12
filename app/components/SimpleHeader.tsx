import icon from '/public/logo_medium.svg'
import Image from 'next/image'

export default function SimpleHeader() {
  return (
    <header className="relative center flex justify-center space-x-4 bg-sub p-4 text-xs">
      <a href="/">
        <Image src={icon} alt="Itsumoarigatone" />
      </a>
    </header>
  )
}