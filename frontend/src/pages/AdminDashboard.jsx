import { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { listarJogadores } from '../services/jogadorService'
import { getQuadras, getReservas } from '../services/reservaService'
import { PATHS } from '../routes/paths'

const modules = [
  { title: 'Jogadores', description: 'Cadastre e gerencie participantes.', path: PATHS.adminJogadores, color: 'text-secondary', icon: '👥' },
  { title: 'Quadras', description: 'Atualize espaços e modalidades.', path: PATHS.adminQuadras, color: 'text-primary', icon: '🏟️' },
  { title: 'Reservas', description: 'Acompanhe e organize os horários.', path: PATHS.adminReservas, color: 'text-accent', icon: '📅' },
]

const dashboardOpenedAt = Date.now()

function bookingTimestamp(booking) {
  return new Date(`${String(booking.data_reserva).split('T')[0]}T${String(booking.horario_inicio).slice(0, 5)}:00`).getTime()
}

export default function AdminDashboard() {
  const [data, setData] = useState({ jogadores: [], quadras: [], reservas: [] })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  const load = useCallback(async () => {
    try {
      const [jogadores, quadras, reservas] = await Promise.all([listarJogadores(), getQuadras(), getReservas()])
      setData({ jogadores, quadras, reservas })
    } catch {
      setError('Não foi possível carregar os indicadores agora.')
    } finally { setLoading(false) }
  }, [])

  useEffect(() => {
    const timer = setTimeout(load, 0)
    return () => clearTimeout(timer)
  }, [load])

  const upcoming = data.reservas.filter((item) => bookingTimestamp(item) >= dashboardOpenedAt).sort((a, b) => bookingTimestamp(a) - bookingTimestamp(b)).slice(0, 4)
  const today = new Date().toISOString().slice(0, 10)
  const todayCount = data.reservas.filter((item) => String(item.data_reserva).startsWith(today)).length
  const courtName = (booking) => booking.quadra?.nome || data.quadras.find((item) => item.id === booking.quadra_id)?.nome || 'Quadra'

  return <div className="mx-auto w-full max-w-6xl space-y-7 px-4 py-8 sm:px-7 lg:p-10">
    <header><p className="text-sm font-bold uppercase tracking-[.18em] text-secondary">Visão geral</p><h1 className="mt-1 text-3xl font-extrabold text-primary">Dashboard administrativo</h1><p className="mt-2 text-slate-500">Acompanhe o movimento do TMJ e acesse rapidamente cada área.</p></header>

    {error && <div className="alert alert-error text-white"><span>{error}</span><button className="btn btn-sm" onClick={load}>Tentar novamente</button></div>}

    <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4" aria-label="Indicadores">
      <Stat label="Jogadores" value={data.jogadores.length} loading={loading} detail="cadastrados" />
      <Stat label="Quadras" value={data.quadras.length} loading={loading} detail="disponíveis" />
      <Stat label="Reservas" value={data.reservas.length} loading={loading} detail="no total" />
      <Stat label="Hoje" value={todayCount} loading={loading} detail="agendamentos" accent />
    </section>

    <div className="grid gap-6 lg:grid-cols-[1.35fr_.85fr]">
      <section className="rounded-2xl border border-primary/10 bg-white p-5 shadow-sm sm:p-7">
        <div className="flex items-center justify-between gap-3"><div><p className="text-sm font-semibold text-secondary">Agenda</p><h2 className="text-xl font-bold text-primary">Próximas reservas</h2></div><Link className="btn btn-ghost btn-sm text-secondary" to={PATHS.adminReservas}>Ver todas</Link></div>
        {loading ? <div className="grid min-h-48 place-items-center"><span className="loading loading-spinner text-secondary" /></div> : upcoming.length === 0 ? <div className="py-12 text-center text-slate-500">Nenhuma reserva futura encontrada.</div> : <div className="mt-4 divide-y divide-slate-100">{upcoming.map((booking) => <article key={booking.id} className="flex flex-col gap-1 py-4 sm:flex-row sm:items-center sm:justify-between"><div><p className="font-bold text-primary">{courtName(booking)}</p><p className="text-sm text-slate-500">{booking.responsavel?.nome || 'Jogador responsável'}</p></div><div className="text-left sm:text-right"><p className="font-semibold text-slate-700">{String(booking.data_reserva).split('T')[0].split('-').reverse().join('/')}</p><p className="text-sm text-secondary">{String(booking.horario_inicio).slice(0, 5)}–{String(booking.horario_fim).slice(0, 5)}</p></div></article>)}</div>}
      </section>

      <section className="space-y-3"><h2 className="text-xl font-bold text-primary">Acesso rápido</h2>{modules.map((item) => <Link key={item.path} to={item.path} className="group flex items-center gap-4 rounded-2xl border border-primary/10 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"><span className="grid size-11 shrink-0 place-items-center rounded-xl bg-base-200 text-xl" aria-hidden="true">{item.icon}</span><span className="min-w-0 flex-1"><span className={`font-bold ${item.color}`}>{item.title}</span><span className="block text-sm text-slate-500">{item.description}</span></span><span className="text-xl text-slate-300 transition group-hover:translate-x-1 group-hover:text-secondary" aria-hidden="true">→</span></Link>)}</section>
    </div>
  </div>
}

function Stat({ label, value, detail, loading, accent = false }) {
  return <article className={`rounded-2xl border p-5 shadow-sm ${accent ? 'border-accent/20 bg-accent text-white' : 'border-primary/10 bg-white'}`}><p className={`text-sm font-semibold ${accent ? 'text-white/80' : 'text-slate-500'}`}>{label}</p>{loading ? <span className="loading loading-dots mt-3" /> : <p className={`mt-2 text-4xl font-extrabold ${accent ? 'text-white' : 'text-primary'}`}>{value}</p>}<p className={`mt-1 text-xs ${accent ? 'text-white/75' : 'text-slate-400'}`}>{detail}</p></article>
}
