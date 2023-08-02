import '../stylesheets/header.css'

export default function Header() {
  return (
    <header className="relative">
      <div className="mx-auto">
        <div className="relative shadow-xl sm:overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute inset-0 mix-blend-overlay">
              <img className="h-full w-full object-cover" src="https://pbs.twimg.com/media/F1Kc2s3aQAET0-F?format=jpg&name=large" alt="Itsumoarigatone" />
            </div>
          </div>
          <div className="relative px-4 py-16 sm:px-6 sm:py-24 lg:py-32 lg:px-8">
            <p className="relative left-0 right-0 mx-auto mt-5 max-w-xl text-center sm:tracking-tight text-sm sm:text-xl lg:text-4xl font-semibold tracking-wide text-sub">
              革製品
            </p>
            <h1 className="mt-1 text-center font-bold text-gray-900">
              <span className="block text-sub text-2xl sm:text-4xl sm:tracking-tight lg:text-7xl">
                Itumoarigatone
              </span>
              <span className="block text-sub text-xs sm:text-2xl sm:tracking-tight lg:text-4xl">
                いつもありがとね
              </span>
            </h1>
          </div>
        </div>
      </div>
    </header>
  )
}