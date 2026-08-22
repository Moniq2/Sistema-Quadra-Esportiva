import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Footer from '../components/Footer'
import Toast from '../components/Toast'
import { fazerLogin } from '../services/loginService'

export default function Login() {
  const navigate = useNavigate()
  const timer = useRef(null)
  const [form, setForm] = useState({ email: '', senha: '' })
  const [loading, setLoading] = useState(false)
  const [toast, setToast] = useState({ visible: false, message: '', type: 'success' })

  useEffect(() => () => clearTimeout(timer.current), [])
  const showToast = (message, type) => {
    setToast({ visible: true, message, type })
    clearTimeout(timer.current)
    timer.current = setTimeout(() => setToast((current) => ({ ...current, visible: false })), 3000)
  }

  const submit = async (event) => {
    event.preventDefault(); setLoading(true)
    try {
      const response = await fazerLogin(form)
      localStorage.setItem('usuario', JSON.stringify(response.usuario))
      navigate(response.usuario.tipo === 'ADMIN' ? '/admin/jogadores' : '/quadras')
    } catch (error) {
      showToast(error.response?.data?.erro || 'E-mail ou senha inválidos.', 'error')
    } finally { setLoading(false) }
  }

  return (
    <div className="flex min-h-screen flex-col bg-base-200">
      <main className="grid flex-1 place-items-center px-4 py-12">
        <div className="card w-full max-w-md border border-primary/10 bg-white shadow-xl"><div className="card-body p-7 sm:p-9">
          <Link to="/" className="mb-5 flex items-center justify-center gap-3"><img src="/tmj-logo.svg" alt="" className="h-11 w-14" /><span className="font-extrabold text-primary">Todo Mundo Joga</span></Link>
          <h1 className="text-center text-3xl font-extrabold text-primary">Boas-vindas!</h1><p className="mt-2 text-center text-sm text-slate-500">Entre para acessar suas quadras e reservas.</p>
          <form onSubmit={submit} className="mt-7 space-y-4">
            <label className="form-control"><span className="label-text mb-1.5 font-semibold">E-mail</span><input className="input input-bordered" type="email" autoComplete="email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} required /></label>
            <label className="form-control"><span className="label-text mb-1.5 font-semibold">Senha</span><input className="input input-bordered" type="password" autoComplete="current-password" value={form.senha} onChange={(event) => setForm({ ...form, senha: event.target.value })} required /></label>
            <button className="btn w-full border-0 bg-accent text-white hover:bg-orange-600" disabled={loading}>{loading ? <><span className="loading loading-spinner loading-sm" /> Entrando...</> : 'Entrar'}</button>
          </form>
          <p className="mt-5 text-center text-sm text-slate-500">Ainda não participa? <Link className="font-bold text-secondary hover:underline" to="/cadastro">Cadastre-se</Link></p>
        </div></div>
      </main><Footer /><Toast message={toast.message} type={toast.type} visible={toast.visible} />
    </div>
  )
}
