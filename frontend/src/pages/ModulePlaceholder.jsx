import { Link } from 'react-router-dom'

export default function ModulePlaceholder({ eyebrow, title, description, returnTo = '/', returnLabel = 'Voltar ao início' }) {
  return (
    <main className="grid min-h-screen place-items-center bg-base-200 px-4 py-12">
      <section className="card w-full max-w-xl border border-primary/10 bg-white text-center shadow-xl">
        <div className="card-body items-center p-8 sm:p-12">
          <img src="/tmj-logo.svg" alt="" className="h-14 w-20 object-contain" />
          <p className="mt-3 text-xs font-extrabold uppercase tracking-[.18em] text-secondary">{eyebrow}</p>
          <h1 className="mt-2 text-3xl font-extrabold text-primary sm:text-4xl">{title}</h1>
          <p className="mt-3 max-w-md text-slate-500">{description}</p>
          <Link to={returnTo} className="btn mt-6 rounded-full border-0 bg-accent px-7 text-white hover:bg-orange-600">{returnLabel}</Link>
        </div>
      </section>
    </main>
  )
}
