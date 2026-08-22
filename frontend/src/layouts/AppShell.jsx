import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { clearAuthenticatedUser, getAuthenticatedUser } from '../auth/authStorage'

function NavIcon({ name }) {
  const common = { className: 'h-5 w-5', viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true }
  if (name === 'dashboard') return <svg {...common}><path d="M3 10.5 12 3l9 7.5" /><path d="M5 9.5V21h14V9.5" /><path d="M9 21v-7h6v7" /></svg>
  if (name === 'courts') return <svg {...common}><rect x="3" y="4" width="18" height="16" rx="2" /><path d="M12 4v16M3 12h18" /><circle cx="12" cy="12" r="3" /></svg>
  if (name === 'calendar') return <svg {...common}><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M16 3v4M8 3v4M3 10h18" /><path d="m9 15 2 2 4-4" /></svg>
  if (name === 'players') return <svg {...common}><circle cx="12" cy="8" r="3" /><path d="M6 21v-2a6 6 0 0 1 12 0v2" /></svg>
  return <svg {...common}><path d="M5 4h14v16H5z" /><path d="m8 12 2.5 2.5L16 9" /></svg>
}

export default function AppShell({ area, navigation }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const navigate = useNavigate()
  const user = getAuthenticatedUser()

  const logout = () => {
    clearAuthenticatedUser()
    navigate('/login')
  }

  return (
    <div className={`min-h-screen bg-base-200 lg:grid ${sidebarCollapsed ? 'lg:grid-cols-[5.5rem_minmax(0,1fr)]' : 'lg:grid-cols-[17rem_minmax(0,1fr)]'} transition-[grid-template-columns] duration-300`}>
      {menuOpen && <button type="button" className="fixed inset-0 z-40 bg-primary/35 backdrop-blur-[2px] lg:hidden" onClick={() => setMenuOpen(false)} aria-label="Fechar menu" />}

      <aside className={`fixed inset-y-0 left-0 z-50 flex w-[17rem] flex-col bg-primary text-white shadow-2xl transition-[width,transform] duration-300 lg:sticky lg:top-0 lg:h-screen lg:translate-x-0 ${sidebarCollapsed ? 'lg:w-[5.5rem]' : 'lg:w-[17rem]'} ${menuOpen ? 'translate-x-0' : '-translate-x-full'}`} aria-label={`Menu da área ${area.toLowerCase()}`}>
        <div className={`flex h-20 items-center border-b border-white/10 px-5 ${sidebarCollapsed ? 'lg:justify-center lg:px-3' : 'justify-between'}`}>
          <NavLink to="/" className="flex items-center gap-3" onClick={() => setMenuOpen(false)}>
            <span className="grid h-11 w-12 place-items-center rounded-xl bg-white"><img src="/tmj-logo.svg" alt="" className="h-8 w-10 object-contain" /></span>
            <span className={sidebarCollapsed ? 'lg:hidden' : ''}><strong className="block text-lg leading-none">TMJ</strong><small className="mt-1 block text-[9px] font-bold uppercase tracking-[.14em] text-white/60">Todo Mundo Joga</small></span>
          </NavLink>
          <button type="button" className="btn btn-circle btn-ghost btn-sm text-white lg:hidden" onClick={() => setMenuOpen(false)} aria-label="Fechar menu">×</button>
        </div>

        <div className={`px-5 pb-3 pt-6 ${sidebarCollapsed ? 'lg:px-2 lg:text-center' : ''}`}><p className="text-[10px] font-extrabold uppercase tracking-[.2em] text-secondary">{sidebarCollapsed ? <span className="hidden lg:inline">•••</span> : null}<span className={sidebarCollapsed ? 'lg:hidden' : ''}>{area}</span></p></div>
        <nav className="flex-1 space-y-1 px-3" aria-label="Navegação principal">
          {navigation.map((item) => (
            <NavLink title={sidebarCollapsed ? item.label : undefined} key={item.to} to={item.to} end={item.end} onClick={() => setMenuOpen(false)} className={({ isActive }) => `group flex min-h-12 items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-semibold transition ${sidebarCollapsed ? 'lg:justify-center lg:px-2' : ''} ${isActive ? 'bg-secondary text-primary shadow-lg shadow-black/10' : 'text-white/75 hover:bg-white/10 hover:text-white'}`}>
              <span className="grid h-8 w-8 place-items-center rounded-lg bg-white/10 text-lg group-hover:bg-white/15"><NavIcon name={item.icon} /></span>
              <span className={sidebarCollapsed ? 'lg:hidden' : ''}>{item.label}</span>
            </NavLink>
          ))}
        </nav>

        <div className={`border-t border-white/10 p-4 ${sidebarCollapsed ? 'lg:px-3' : ''}`}>
          <div className={`mb-3 flex items-center gap-3 rounded-xl bg-white/5 p-3 ${sidebarCollapsed ? 'lg:justify-center lg:p-2' : ''}`}>
            <span className="grid h-9 w-9 flex-none place-items-center rounded-full bg-accent font-extrabold">{user?.nome?.charAt(0).toUpperCase() || 'T'}</span>
            <div className={`min-w-0 ${sidebarCollapsed ? 'lg:hidden' : ''}`}><p className="truncate text-sm font-bold text-white">{user?.nome || 'Usuário TMJ'}</p><p className="truncate text-[10px] text-white/55">{user?.email || area}</p></div>
          </div>
          <button title={sidebarCollapsed ? 'Sair da conta' : undefined} type="button" onClick={logout} className={`btn btn-ghost btn-sm w-full rounded-xl text-white/70 hover:bg-white/10 hover:text-white ${sidebarCollapsed ? 'lg:px-0' : 'justify-start'}`}>
            <svg className="h-5 w-5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M10 17l5-5-5-5" /><path d="M15 12H3" /><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" /></svg>
            <span className={sidebarCollapsed ? 'lg:hidden' : ''}>Sair da conta</span>
          </button>
        </div>
        <button type="button" className="absolute -right-5 top-24 hidden h-10 w-10 items-center justify-center rounded-full border border-primary/10 bg-white p-0 text-primary shadow-md transition hover:scale-105 hover:bg-secondary lg:flex" onClick={() => setSidebarCollapsed((value) => !value)} aria-label={sidebarCollapsed ? 'Expandir menu lateral' : 'Recolher menu lateral'} title={sidebarCollapsed ? 'Expandir menu' : 'Recolher menu'}>
          <svg className={`h-6 w-6 transition-transform duration-300 ${sidebarCollapsed ? 'rotate-180' : ''}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m15 18-6-6 6-6" /></svg>
        </button>
      </aside>

      <div className="min-w-0">
        <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-primary/10 bg-white/90 px-4 backdrop-blur-lg lg:hidden">
          <button type="button" className="btn btn-square btn-ghost text-primary" onClick={() => setMenuOpen(true)} aria-label="Abrir menu"><span className="text-2xl">☰</span></button>
          <span className="font-extrabold text-primary">{area}</span>
          <span className="h-10 w-10" aria-hidden="true" />
        </header>
        <div className="min-h-[calc(100vh-4rem)] lg:min-h-screen"><Outlet /></div>
      </div>
    </div>
  )
}
