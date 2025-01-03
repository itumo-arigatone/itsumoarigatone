import '../stylesheets/header.scss'

export default function SimpleHeader() {
  return (
    <header className="simple-header relative center flex justify-center space-x-4 bg-sub p-4 text-xs">
      <a href="/">
        <img src="/logo_medium.svg" alt="Itsumoarigatone" width={150} height={47} />
      </a>
    </header>
  )
}