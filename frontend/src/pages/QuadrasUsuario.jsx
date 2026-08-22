import { useEffect, useState } from 'react'
import api from '../services/api'

export default function QuadrasUsuario() {
  const [quadras, setQuadras] = useState([])
  const [filtroModalidade, setFiltroModalidade] = useState('')
  const [filtroLocalizacao, setFiltroLocalizacao] = useState('')

  useEffect(() => {
    async function carregarQuadras() {
      try {
        const resposta = await api.get('/quadras')
        setQuadras(resposta.data)
      } catch (error) {
        console.error('Erro ao buscar quadras:', error)
      }
    }

    carregarQuadras()
  }, [])

  const removerAcentos = (texto) => {
    return (texto || '')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
  }

  const quadrasFiltradas = quadras.filter((quadra) => {
    const modalidadeCompativel = removerAcentos(quadra.modalidade).includes(removerAcentos(filtroModalidade))
    const localizacaoCompativel = removerAcentos(quadra.localizacao).includes(removerAcentos(filtroLocalizacao))

    return modalidadeCompativel && localizacaoCompativel
  })

  return (
    <main className="min-h-screen w-full bg-base-200 px-4 py-8 sm:px-6">
      <div className="mx-auto max-w-5xl space-y-6">
        <header>
          <h1 className="text-3xl font-bold text-primary">Quadras disponíveis</h1>
          <p className="mt-1 text-sm text-gray-500">Escolha uma quadra para realizar sua reserva.</p>
        </header>

        <section className="card space-y-3 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm" aria-labelledby="filtros-title">
          <h2 id="filtros-title" className="border-b border-gray-100 pb-3 text-lg font-bold text-primary">Filtros</h2>
          <div className="grid grid-cols-1 gap-4 pt-1 sm:grid-cols-2">
            <label className="block text-xs font-semibold text-gray-700">
              Modalidade
              <input type="search" placeholder="Ex.: Futsal, tênis" className="input input-bordered mt-1.5 h-10 w-full rounded-xl bg-gray-50 text-xs focus:border-secondary focus:bg-white" value={filtroModalidade} onChange={(event) => setFiltroModalidade(event.target.value)} />
            </label>
            <label className="block text-xs font-semibold text-gray-700">
              Localização
              <input type="search" placeholder="Ex.: Centro, Aldeota" className="input input-bordered mt-1.5 h-10 w-full rounded-xl bg-gray-50 text-xs focus:border-secondary focus:bg-white" value={filtroLocalizacao} onChange={(event) => setFiltroLocalizacao(event.target.value)} />
            </label>
          </div>
        </section>

        <section className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3" aria-live="polite">
          {quadrasFiltradas.length > 0 ? quadrasFiltradas.map((quadra) => (
            <article key={quadra.id} className="flex flex-col justify-between space-y-4 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
              <div>
                <span className="mb-2 inline-block rounded-md bg-secondary/10 px-2.5 py-1 text-xs font-bold text-secondary">{quadra.modalidade}</span>
                <h2 className="text-xl font-bold text-primary">{quadra.nome}</h2>
                <p className="mt-1 text-xs text-gray-500">Local: {quadra.localizacao}</p>
              </div>
              <button type="button" onClick={() => window.alert(`Reservar: ${quadra.nome}`)} className="btn w-full rounded-xl border-none bg-accent text-sm font-semibold text-white hover:bg-orange-600">
                Reservar quadra
              </button>
            </article>
          )) : (
            <p className="col-span-full py-10 text-center text-sm text-gray-500">Nenhuma quadra encontrada com os filtros informados.</p>
          )}
        </section>
      </div>
    </main>
  )
}
