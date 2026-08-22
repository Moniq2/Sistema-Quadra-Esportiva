import { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getAuthenticatedUser } from '../auth/authStorage'
import { PATHS } from '../routes/paths'
import { getQuadras, getReservas } from '../services/reservaService'

const openedAt = Date.now()
const timestamp = (item) => new Date(`${String(item.data_reserva).split('T')[0]}T${String(item.horario_inicio).slice(0, 5)}:00`).getTime()

export default function UserDashboard() {
  const user = getAuthenticatedUser()
  const [quadras, setQuadras] = useState([])
  const [reservas, setReservas] = useState([])
  const [loading, setLoading] = useState(true)

  const load = useCallback(async () => {
    try {
      const [courts, bookings] = await Promise.all([getQuadras(), getReservas()])
      setQuadras(courts)
      setReservas(bookings.filter((item) => Number(item.responsavel_id) === Number(user?.id)))
    } finally { setLoading(false) }
  }, [user?.id])

  useEffect(() => { const timer = setTimeout(load, 0); return () => clearTimeout(timer) }, [load])
  const upcoming = reservas.filter((item) => timestamp(item) >= openedAt).sort((a, b) => timestamp(a) - timestamp(b))
  const next = upcoming[0]

  return <div className="mx-auto w-full max-w-6xl space-y-7 p-4 sm:p-7 lg:p-10">
    <section className="overflow-hidden rounded-3xl bg-primary p-6 text-white shadow-xl sm:p-9">
      <p className="text-sm font-bold uppercase tracking-[.18em] text-secondary">Área do jogador</p><h1 className="mt-2 text-3xl font-extrabold text-white sm:text-4xl">Olá, {user?.nome?.split(' ')[0] || 'jogador'}!</h1><p className="mt-3 max-w-xl text-white/70">Encontre uma quadra, confira os horários e coloque a próxima partida em jogo.</p>
      <div className="mt-6 flex flex-wrap gap-3"><Link className="btn border-0 bg-accent text-white hover:bg-orange-600" to={PATHS.reservas}>Fazer uma reserva</Link><Link className="btn border-white/20 bg-white/10 text-white hover:bg-white/20" to={PATHS.quadras}>Explorar quadras</Link></div>
    </section>

    <section className="grid gap-4 sm:grid-cols-3">
      <Summary label="Quadras disponíveis" value={quadras.length} loading={loading} />
      <Summary label="Próximas reservas" value={upcoming.length} loading={loading} />
      <Summary label="Histórico de reservas" value={reservas.length} loading={loading} accent />
    </section>

    <section className="grid gap-6 lg:grid-cols-[1.2fr_.8fr]">
      <article className="rounded-2xl border border-primary/10 bg-white p-6 shadow-sm"><p className="text-sm font-bold text-secondary">Seu próximo jogo</p>{loading ? <span className="loading loading-spinner mt-8 text-secondary" /> : next ? <div className="mt-4"><h2 className="text-2xl font-extrabold text-primary">{next.quadra?.nome || 'Quadra reservada'}</h2><p className="mt-2 text-slate-500">{String(next.data_reserva).split('T')[0].split('-').reverse().join('/')} · {String(next.horario_inicio).slice(0, 5)}–{String(next.horario_fim).slice(0, 5)}</p><Link className="btn btn-ghost btn-sm mt-5 text-secondary" to={PATHS.minhasReservas}>Ver minhas reservas →</Link></div> : <div className="py-8"><h2 className="text-xl font-bold text-primary">Sua agenda está livre</h2><p className="mt-2 text-sm text-slate-500">Escolha uma quadra e marque sua próxima partida.</p></div>}</article>
      <article className="rounded-2xl border border-secondary/15 bg-secondary/10 p-6"><span className="text-3xl" aria-hidden="true">⚡</span><h2 className="mt-3 text-xl font-extrabold text-primary">Menos mensagens. Mais jogo.</h2><p className="mt-2 text-sm leading-relaxed text-slate-600">Consulte a disponibilidade antes de reservar e evite conflitos de horário.</p><Link className="btn btn-sm mt-5 border-0 bg-secondary text-white" to={PATHS.reservas}>Consultar agenda</Link></article>
    </section>
  </div>
}

function Summary({ label, value, loading, accent = false }) {
  return <article className={`rounded-2xl border p-5 shadow-sm ${accent ? 'border-accent/20 bg-accent text-white' : 'border-primary/10 bg-white'}`}><p className={`text-sm font-semibold ${accent ? 'text-white/80' : 'text-slate-500'}`}>{label}</p>{loading ? <span className="loading loading-dots mt-3" /> : <p className={`mt-2 text-3xl font-extrabold ${accent ? 'text-white' : 'text-primary'}`}>{value}</p>}</article>
}
