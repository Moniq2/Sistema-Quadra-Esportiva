import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Footer from '../components/Footer'
import Toast from '../components/Toast'
import { criarJogador } from '../services/jogadorService'

export default function Cadastro() {
  const navigate = useNavigate()
  const timer = useRef(null)
  const [form, setForm] = useState({ nome: '', email: '', telefone: '', senha: '' })
  const [loading, setLoading] = useState(false)
  const [toast, setToast] = useState({ visible: false, message: '', type: 'success' })
  useEffect(() => () => clearTimeout(timer.current), [])

  const update = (event) => setForm({ ...form, [event.target.name]: event.target.value })
  const submit = async (event) => {
    event.preventDefault(); setLoading(true)
    try {
      await criarJogador(form)
      setToast({ visible: true, message: 'Cadastro realizado com sucesso!', type: 'success' })
      timer.current = setTimeout(() => navigate('/login'), 1200)
    } catch (error) {
      setToast({ visible: true, message: error.response?.data?.erro || 'Não foi possível realizar o cadastro.', type: 'error' })
    } finally { setLoading(false) }
  }

  return (
    <div className="flex min-h-screen flex-col bg-base-200">
      <main className="grid flex-1 place-items-center px-4 py-12"><div className="card w-full max-w-lg border border-primary/10 bg-white shadow-xl"><div className="card-body p-7 sm:p-9">
        <Link to="/" className="mb-4 flex items-center justify-center gap-3"><img src="/tmj-logo.svg" alt="" className="h-11 w-14" /><span className="font-extrabold text-primary">Todo Mundo Joga</span></Link>
        <h1 className="text-center text-3xl font-extrabold text-primary">Entre para o time</h1><p className="mt-2 text-center text-sm text-slate-500">Preencha seus dados para começar a jogar.</p>
        <form onSubmit={submit} className="mt-7 grid gap-4 sm:grid-cols-2">
          <label className="form-control sm:col-span-2"><span className="label-text mb-1.5 font-semibold">Nome completo</span><input className="input input-bordered" name="nome" value={form.nome} onChange={update} required /></label>
          <label className="form-control"><span className="label-text mb-1.5 font-semibold">E-mail</span><input className="input input-bordered" name="email" type="email" value={form.email} onChange={update} required /></label>
          <label className="form-control"><span className="label-text mb-1.5 font-semibold">Telefone</span><input className="input input-bordered" name="telefone" type="tel" value={form.telefone} onChange={update} required /></label>
          <label className="form-control sm:col-span-2"><span className="label-text mb-1.5 font-semibold">Senha</span><input className="input input-bordered" name="senha" type="password" minLength="6" autoComplete="new-password" value={form.senha} onChange={update} required /></label>
          <button className="btn border-0 bg-accent text-white hover:bg-orange-600 sm:col-span-2" disabled={loading}>{loading ? <span className="loading loading-spinner loading-sm" /> : 'Criar cadastro'}</button>
        </form>
        <p className="mt-5 text-center text-sm text-slate-500">Já possui cadastro? <Link className="font-bold text-secondary hover:underline" to="/login">Entrar</Link></p>
      </div></div></main><Footer /><Toast message={toast.message} type={toast.type} visible={toast.visible} />
    </div>
  )
}
