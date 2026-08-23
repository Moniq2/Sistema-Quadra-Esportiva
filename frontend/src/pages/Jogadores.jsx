import { useCallback, useEffect, useRef, useState } from 'react'
import Toast from '../components/Toast'
import { atualizarJogador, criarJogador, excluirJogador, listarJogadores } from '../services/jogadorService'

const emptyForm = { nome: '', email: '', telefone: '' }
const errorMessage = (error, fallback) => error.response?.data?.erro || fallback

export default function Jogadores() {
  const timer = useRef()
  const [jogadores, setJogadores] = useState([])
  const [loading, setLoading] = useState(true)
  const [formOpen, setFormOpen] = useState(false)
  const [editing, setEditing] = useState(null)
  const [deletePlayer, setDeletePlayer] = useState(null)
  const [form, setForm] = useState(emptyForm)
  const [saving, setSaving] = useState(false)
  const [toast, setToast] = useState({ visible: false, message: '', type: 'success' })

  const notify = useCallback((message, type = 'success') => {
    setToast({ visible: true, message, type })
    clearTimeout(timer.current)
    timer.current = setTimeout(() => setToast((value) => ({ ...value, visible: false })), 3000)
  }, [])

  const load = useCallback(async () => {
    try { setJogadores(await listarJogadores()) }
    catch (error) { notify(errorMessage(error, 'Não foi possível carregar os jogadores.'), 'error') }
    finally { setLoading(false) }
  }, [notify])

  useEffect(() => {
    const loadTimer = setTimeout(load, 0)
    return () => { clearTimeout(loadTimer); clearTimeout(timer.current) }
  }, [load])

  const openCreate = () => { setEditing(null); setForm(emptyForm); setFormOpen(true) }
  const openEdit = (player) => {
    setEditing(player.id)
    setForm({ nome: player.nome || '', email: player.email || '', telefone: player.telefone || '' })
    setFormOpen(true)
  }
  const closeForm = () => { setFormOpen(false); setEditing(null); setForm(emptyForm) }

  const submit = async (event) => {
    event.preventDefault(); setSaving(true)
    try {
      if (editing) await atualizarJogador(editing, form); else await criarJogador(form)
      notify(editing ? 'Jogador atualizado.' : 'Jogador cadastrado!')
      closeForm(); await load()
    } catch (error) { notify(errorMessage(error, 'Não foi possível salvar o jogador.'), 'error') }
    finally { setSaving(false) }
  }

  const remove = async () => {
    try {
      await excluirJogador(deletePlayer.id)
      setJogadores((current) => current.filter((item) => item.id !== deletePlayer.id))
      setDeletePlayer(null); notify('Jogador removido.')
    } catch (error) {
      setDeletePlayer(null)
      notify(errorMessage(error, 'Não foi possível excluir. O jogador pode possuir reservas.'), 'error')
    }
  }

  return <div className="mx-auto w-full max-w-6xl space-y-6 px-4 py-8 sm:px-7 lg:p-10">
    <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div><p className="text-sm font-bold uppercase tracking-[.18em] text-secondary">Administração</p><h1 className="mt-1 text-3xl font-extrabold text-primary">Gerenciar jogadores</h1><p className="mt-2 text-slate-500">Cadastre e mantenha os dados dos participantes.</p></div>
      <button className="btn border-0 bg-accent text-white hover:bg-orange-600" onClick={openCreate}>Novo jogador</button>
    </header>

    <section className="rounded-2xl border border-primary/10 bg-white p-5 shadow-sm sm:p-7">
      {loading ? <div className="grid min-h-48 place-items-center"><span className="loading loading-spinner text-secondary" /></div> : jogadores.length === 0 ? <div className="py-12 text-center"><p className="font-semibold text-primary">Nenhum jogador cadastrado</p><p className="mt-1 text-sm text-slate-500">Cadastre o primeiro participante para começar.</p></div> : <div className="overflow-x-auto"><table className="table"><thead><tr><th>Nome</th><th>E-mail</th><th>Telefone</th><th className="text-right">Ações</th></tr></thead><tbody>{jogadores.map((player) => <tr key={player.id}><td className="font-semibold text-primary">{player.nome}</td><td>{player.email}</td><td>{player.telefone}</td><td><div className="flex justify-end gap-1"><button className="btn btn-ghost btn-sm text-secondary" onClick={() => openEdit(player)}>Editar</button><button className="btn btn-ghost btn-sm text-error" onClick={() => setDeletePlayer(player)}>Excluir</button></div></td></tr>)}</tbody></table></div>}
    </section>

    {formOpen && <div className="modal modal-open" role="dialog" aria-modal="true"><div className="modal-box"><h2 className="text-xl font-bold text-primary">{editing ? 'Editar jogador' : 'Novo jogador'}</h2><form className="mt-5 space-y-4" onSubmit={submit}>
      <label className="form-control"><span className="label-text mb-1 font-semibold">Nome completo</span><input className="input input-bordered" value={form.nome} onChange={(e) => setForm({ ...form, nome: e.target.value })} required /></label>
      <label className="form-control"><span className="label-text mb-1 font-semibold">E-mail</span><input className="input input-bordered" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required /></label>
      <label className="form-control"><span className="label-text mb-1 font-semibold">Telefone</span><input className="input input-bordered" type="tel" value={form.telefone} onChange={(e) => setForm({ ...form, telefone: e.target.value })} required /></label>
      <div className="modal-action"><button type="button" className="btn btn-ghost" onClick={closeForm}>Cancelar</button><button className="btn border-0 bg-primary text-white" disabled={saving}>{saving ? <span className="loading loading-spinner loading-sm" /> : 'Salvar'}</button></div>
    </form></div><button className="modal-backdrop" aria-label="Fechar" onClick={closeForm} /></div>}

    {deletePlayer && <div className="modal modal-open" role="dialog" aria-modal="true"><div className="modal-box"><h2 className="text-xl font-bold text-primary">Excluir jogador?</h2><p className="py-4 text-slate-600">Você está prestes a excluir <strong>{deletePlayer.nome}</strong>. Esta ação não poderá ser desfeita.</p><div className="modal-action"><button className="btn btn-ghost" onClick={() => setDeletePlayer(null)}>Voltar</button><button className="btn btn-error text-white" onClick={remove}>Confirmar exclusão</button></div></div><button className="modal-backdrop" aria-label="Fechar" onClick={() => setDeletePlayer(null)} /></div>}
    <Toast {...toast} />
  </div>
}
