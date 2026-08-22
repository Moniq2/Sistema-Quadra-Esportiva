import { Link } from 'react-router-dom'

export default function LandingHeader() {
  return (
    <header className="landing-header">
      <div className="landing-shell flex h-20 items-center justify-between">
        <Link to="/" className="inline-flex items-center gap-3 rounded-xl focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent" aria-label="Todo Mundo Joga — página inicial">
          <img src="/tmj-logo.svg" alt="" className="h-9 w-10 object-contain sm:h-11 sm:w-14" />
          <span className="text-sm font-extrabold tracking-tight text-primary sm:text-xl">Todo Mundo Joga</span>
        </Link>
        <nav className="flex items-center gap-2" aria-label="Navegação principal">
          <a href="#futuro" className="btn btn-ghost btn-sm hidden rounded-full text-primary lg:inline-flex">Futuro</a>
          <a href="#planos" className="btn btn-ghost btn-sm hidden rounded-full text-primary lg:inline-flex">Planos</a>
          <Link to="/login" className="btn btn-ghost btn-sm hidden rounded-full text-primary sm:inline-flex sm:px-5">Entrar</Link>
          <Link to="/cadastro" className="btn btn-sm rounded-full border-0 bg-accent text-white hover:bg-orange-600 sm:px-5">Cadastre-se</Link>
        </nav>
      </div>
    </header>
  )
}
