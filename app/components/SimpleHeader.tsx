import icon from '../../public/icons8-amazon.svg'
import Image from 'next/image'

export default function SimpleHeader() {
  return (
    <header className="relative center flex justify-center space-x-4 bg-accent p-4 text-xs">
      <a href="/">
        <Image src={icon} alt="Itsumoarigatone" />
      </a>
    </header>
  )
}