import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="border-t border-primary/10 bg-base-200 px-4 py-8 text-primary">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-5 text-center sm:flex-row sm:text-left">
        <div className="flex items-center gap-3">
          <img src="/tmj-logo.svg" alt="" className="h-10 w-12 object-contain" />
          <div><p className="font-extrabold">Todo Mundo Joga</p><p className="text-xs text-primary/65">Feito para movimentar a comunidade.</p></div>
        </div>
        <nav className="flex gap-5 text-sm font-semibold" aria-label="Navegação do rodapé">
          <Link to="/">Início</Link><Link to="/quadras">Quadras</Link><Link to="/login">Entrar</Link>
        </nav>
        <p className="text-xs text-primary/55">© 2026 TMJ</p>
      </div>
    </footer>
  )
}
