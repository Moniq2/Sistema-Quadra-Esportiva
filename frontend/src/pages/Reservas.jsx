import { useCallback, useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { getAuthenticatedUser } from '../auth/authStorage'
import Toast from '../components/Toast'
import { deleteReserva, getAgenda, getJogadores, getQuadras, getReservas, postReserva, putReserva } from '../services/reservaService'

const emptyForm = { quadra: '', data: '', inicio: '', fim: '', responsavel: '' }
const messageFrom = (error, fallback) => error.response?.data?.mensagem || fallback
const now = new Date()
const today = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')}`
const toMinutes = (time) => { const [hours, minutes] = time.split(':').map(Number); return hours * 60 + minutes }
const toTime = (minutes) => `${String(Math.floor(minutes / 60)).padStart(2, '0')}:${String(minutes % 60).padStart(2, '0')}`
const buildTimeSlots = (schedule) => {
  if (!schedule) return []
  const start = toMinutes(schedule.funcionamento?.inicio || '08:00')
  const end = toMinutes(schedule.funcionamento?.fim || '22:00')
  return Array.from({ length: Math.floor((end - start) / 15) + 1 }, (_, index) => toTime(start + index * 15))
}

export default function Reservas({ mode = 'schedule' }) {
  const location = useLocation()
  const user = getAuthenticatedUser()
  const isAdmin = mode === 'admin'
  const isMine = mode === 'mine'
  const timer = useRef()
  const [form, setForm] = useState(() => ({ ...emptyForm, quadra: location.state?.quadraIdSelecionada ? String(location.state.quadraIdSelecionada) : '' }))
  const [editing, setEditing] = useState(null)
  const [reservas, setReservas] = useState([])
  const [quadras, setQuadras] = useState([])
  const [jogadores, setJogadores] = useState([])
  const [agenda, setAgenda] = useState(null)
  const [bairro, setBairro] = useState('')
  const [esporte, setEsporte] = useState('')
  const [loading, setLoading] = useState(true)
  const [deleteId, setDeleteId] = useState(null)
  const [toast, setToast] = useState({ visible: false, message: '', type: 'success' })

  const notify = useCallback((message, type = 'success') => {
    setToast({ visible: true, message, type })
    clearTimeout(timer.current)
    timer.current = setTimeout(() => setToast((value) => ({ ...value, visible: false })), 3000)
  }, [])

  const load = useCallback(async () => {
    try {
      const [courts, bookings, players] = await Promise.all([getQuadras(), getReservas(), isAdmin ? getJogadores() : Promise.resolve([])])
      setQuadras(courts)
      setJogadores(players)
      setReservas(isMine ? bookings.filter((item) => Number(item.responsavel_id) === Number(user?.id)) : bookings)
    } catch (error) {
      notify(messageFrom(error, 'Não foi possível carregar as reservas.'), 'error')
    } finally { setLoading(false) }
  }, [isAdmin, isMine, notify, user?.id])

  useEffect(() => {
    const loadTimer = setTimeout(load, 0)
    return () => { clearTimeout(loadTimer); clearTimeout(timer.current) }
  }, [load])

  useEffect(() => {
    if (!form.quadra || !form.data) return undefined
    let active = true
    const agendaTimer = setTimeout(async () => {
      try {
        const schedule = await getAgenda(form.quadra, form.data)
        if (active) setAgenda(schedule)
      } catch (error) {
        if (active) notify(messageFrom(error, 'Não foi possível consultar a agenda.'), 'error')
      }
    }, 250)
    return () => { active = false; clearTimeout(agendaTimer) }
  }, [form.quadra, form.data, notify])

  const change = (field, value) => setForm((current) => ({ ...current, [field]: value }))
  const changeSchedule = (field, value) => {
    setAgenda(null)
    setForm((current) => ({ ...current, [field]: value, inicio: '', fim: '' }))
  }
  const reset = () => { setForm(emptyForm); setEditing(null); setAgenda(null); setBairro(''); setEsporte('') }

  const isOccupied = (time) => agenda?.horarios_ocupados?.some((slot) => toMinutes(time) >= toMinutes(slot.inicio) && toMinutes(time) < toMinutes(slot.fim))
  const selectTime = (time) => {
    const closingTime = agenda?.funcionamento?.fim || '22:00'
    if (isOccupied(time)) return notify('Este horário já está ocupado.', 'error')
    if (!form.inicio) {
      if (time === closingTime) return notify('Escolha um horário anterior ao fechamento para iniciar.', 'error')
      return setForm((value) => ({ ...value, inicio: time, fim: '' }))
    }

    if (time === form.inicio) return setForm((value) => ({ ...value, inicio: '', fim: '' }))
    if (time === form.fim) return setForm((value) => ({ ...value, fim: '' }))

    if (toMinutes(time) < toMinutes(form.inicio)) {
      if (time === closingTime) return notify('Escolha um horário anterior ao fechamento para iniciar.', 'error')
      return setForm((value) => ({ ...value, inicio: time, fim: '' }))
    }

    const crossesOccupied = agenda?.horarios_ocupados?.some((slot) => toMinutes(form.inicio) < toMinutes(slot.fim) && toMinutes(time) > toMinutes(slot.inicio))
    if (crossesOccupied) return notify('O intervalo selecionado atravessa um horário ocupado.', 'error')
    setForm((value) => ({ ...value, fim: time }))
  }

  const submit = async (event) => {
    event.preventDefault()
    const responsavel = isAdmin ? form.responsavel : user?.id
    if (!responsavel) return notify('Jogador responsável não identificado.', 'error')
    if (!form.inicio || !form.fim) return notify('Selecione o horário de início e o horário de fim.', 'error')
    const current = new Date()
    const currentTime = `${String(current.getHours()).padStart(2, '0')}:${String(current.getMinutes()).padStart(2, '0')}`
    if (form.data < today || (form.data === today && form.inicio <= currentTime)) return notify('Escolha uma data e um horário que ainda não passaram.', 'error')
    if (form.inicio >= form.fim) return notify('O horário final deve ser posterior ao inicial.', 'error')
    const data = { quadra_id: Number(form.quadra), responsavel_id: Number(responsavel), data_reserva: form.data, horario_inicio: form.inicio, horario_fim: form.fim, jogadores_ids: [] }
    try {
      if (editing) await putReserva(editing, data); else await postReserva(data)
      notify(editing ? 'Reserva atualizada.' : 'Reserva confirmada!')
      reset(); await load()
    } catch (error) { notify(messageFrom(error, 'Não foi possível salvar. Verifique o horário.'), 'error') }
  }

  const edit = (item) => {
    setEditing(item.id)
    setForm({ quadra: String(item.quadra_id), data: String(item.data_reserva).split('T')[0], inicio: String(item.horario_inicio).slice(0, 5), fim: String(item.horario_fim).slice(0, 5), responsavel: String(item.responsavel_id) })
    setAgenda(null); window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const remove = async () => {
    try { await deleteReserva(deleteId); setDeleteId(null); notify('Reserva cancelada.'); await load() }
    catch (error) { notify(messageFrom(error, 'Não foi possível cancelar a reserva.'), 'error') }
  }

  const court = (item) => item.quadra?.nome || quadras.find((value) => value.id === item.quadra_id)?.nome || 'Quadra'
  const player = (item) => item.responsavel?.nome || jogadores.find((value) => value.id === item.responsavel_id)?.nome || (Number(item.responsavel_id) === Number(user?.id) ? user.nome : 'Jogador')
  const title = isAdmin ? 'Gerenciar reservas' : isMine ? 'Minhas reservas' : 'Agenda das quadras'
  const timeSlots = buildTimeSlots(agenda)
  const bairros = [...new Set(quadras.map((item) => item.localizacao).filter(Boolean))].sort()
  const esportes = [...new Set(quadras.map((item) => item.modalidade).filter(Boolean))].sort()
  const quadrasFiltradas = quadras.filter((item) => (!bairro || item.localizacao === bairro) && (!esporte || item.modalidade === esporte))
  const changeFilter = (type, value) => {
    const nextBairro = type === 'bairro' ? value : bairro
    const nextEsporte = type === 'esporte' ? value : esporte
    if (type === 'bairro') setBairro(value); else setEsporte(value)
    const selectedCourt = quadras.find((item) => String(item.id) === form.quadra)
    if (selectedCourt && ((nextBairro && selectedCourt.localizacao !== nextBairro) || (nextEsporte && selectedCourt.modalidade !== nextEsporte))) changeSchedule('quadra', '')
  }

  return <div className="mx-auto w-full max-w-6xl space-y-6 px-4 py-8 sm:px-7 lg:p-10">
    <header><p className="text-sm font-bold uppercase tracking-[.18em] text-secondary">{isAdmin ? 'Administração' : 'Área do jogador'}</p><h1 className="mt-1 text-3xl font-extrabold text-primary">{title}</h1></header>
    {(!isMine || editing) && <form onSubmit={submit} className="rounded-2xl border border-primary/10 bg-white p-5 shadow-sm sm:p-7">
      <h2 className="text-xl font-bold text-primary">{editing ? 'Editar reserva' : 'Nova reserva'}</h2>
      <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Field label="Bairro (opcional)"><select className="select select-bordered" value={bairro} onChange={(e) => changeFilter('bairro', e.target.value)}><option value="">Todos os bairros</option>{bairros.map((item) => <option key={item} value={item}>{item}</option>)}</select></Field>
        <Field label="Esporte (opcional)"><select className="select select-bordered" value={esporte} onChange={(e) => changeFilter('esporte', e.target.value)}><option value="">Todos os esportes</option>{esportes.map((item) => <option key={item} value={item}>{item}</option>)}</select></Field>
        <Field label="Quadra"><select className="select select-bordered" value={form.quadra} onChange={(e) => changeSchedule('quadra', e.target.value)} required><option value="">Selecione</option>{quadrasFiltradas.map((item) => <option key={item.id} value={item.id}>{item.nome}</option>)}</select></Field>
        <Field label="Data"><input className="input input-bordered" type="date" min={today} value={form.data} onChange={(e) => changeSchedule('data', e.target.value)} required /></Field>
        {isAdmin && <Field label="Responsável"><select className="select select-bordered" value={form.responsavel} onChange={(e) => change('responsavel', e.target.value)} required><option value="">Selecione</option>{jogadores.map((item) => <option key={item.id} value={item.id}>{item.nome}</option>)}</select></Field>}
      </div>
      {agenda && <div className="mt-5 rounded-xl bg-base-200 p-4 sm:p-5">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"><p className="font-bold text-primary">Escolha seu horário</p><div className="flex flex-wrap gap-3 text-xs"><span className="flex items-center gap-1.5"><i className="h-3 w-3 rounded bg-white ring-1 ring-slate-200" />Livre</span><span className="flex items-center gap-1.5"><i className="h-3 w-3 rounded bg-secondary" />Selecionado</span><span className="flex items-center gap-1.5"><i className="h-3 w-3 rounded bg-red-200" />Ocupado</span></div></div>
        <div className="mt-4 grid grid-cols-4 gap-2 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10">{timeSlots.map((time) => {
          const occupied = isOccupied(time)
          const selected = form.inicio && (time === form.inicio || time === form.fim || (form.fim && toMinutes(time) > toMinutes(form.inicio) && toMinutes(time) < toMinutes(form.fim)))
          return <button key={time} type="button" aria-disabled={occupied} onClick={() => selectTime(time)} className={`min-h-10 rounded-lg border px-2 text-sm font-bold transition ${occupied ? 'cursor-not-allowed border-red-200 bg-red-100 text-red-500 line-through' : selected ? 'border-secondary bg-secondary text-white shadow-sm' : 'border-slate-200 bg-white text-primary hover:border-secondary hover:text-secondary'}`}>{time}</button>
        })}</div>
        <div className="mt-4 rounded-lg border border-primary/10 bg-white px-4 py-3"><p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Horário selecionado</p><p className="mt-1 font-bold text-primary">{form.inicio || '--:--'} <span className="mx-2 text-slate-300">→</span> {form.fim || '--:--'}</p></div>
      </div>}
      <div className="mt-5 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end"><button type="button" className="btn border-primary/20 bg-white text-primary hover:border-primary hover:bg-primary/5" onClick={reset}>Reiniciar agendamento</button><button className="btn border-0 bg-accent text-white hover:bg-orange-600">{editing ? 'Salvar alterações' : 'Reservar horário'}</button></div>
    </form>}
    <section className="rounded-2xl border border-primary/10 bg-white p-5 shadow-sm sm:p-7"><h2 className="text-xl font-bold text-primary">{isMine ? 'Suas reservas' : 'Reservas agendadas'}</h2>
      {loading ? <div className="grid min-h-40 place-items-center"><span className="loading loading-spinner text-secondary" /></div> : reservas.length === 0 ? <p className="py-10 text-center text-slate-500">Nenhuma reserva encontrada.</p> : <div className="mt-4 overflow-x-auto"><table className="table"><thead><tr><th>Quadra</th><th>Data</th><th>Horário</th><th>Responsável</th><th /></tr></thead><tbody>{reservas.map((item) => <tr key={item.id}><td className="font-semibold">{court(item)}</td><td>{String(item.data_reserva).split('T')[0].split('-').reverse().join('/')}</td><td>{String(item.horario_inicio).slice(0, 5)}–{String(item.horario_fim).slice(0, 5)}</td><td>{player(item)}</td><td><div className="flex justify-end gap-1">{(isAdmin || isMine) && <><button className="btn btn-ghost btn-xs text-secondary" onClick={() => edit(item)}>Editar</button><button className="btn btn-ghost btn-xs text-error" onClick={() => setDeleteId(item.id)}>Cancelar</button></>}</div></td></tr>)}</tbody></table></div>}
    </section>
    {deleteId && <div className="modal modal-open" role="dialog"><div className="modal-box"><h3 className="text-lg font-bold text-primary">Cancelar reserva?</h3><p className="py-4 text-slate-600">O horário voltará a ficar disponível.</p><div className="modal-action"><button className="btn btn-ghost" onClick={() => setDeleteId(null)}>Voltar</button><button className="btn btn-error text-white" onClick={remove}>Confirmar</button></div></div><button className="modal-backdrop" aria-label="Fechar" onClick={() => setDeleteId(null)} /></div>}
    <Toast {...toast} />
  </div>
}

function Field({ label, children }) { return <label className="form-control"><span className="label-text mb-1 font-semibold">{label}</span>{children}</label> }
