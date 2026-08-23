import AppShell from './AppShell'

const navigation = [
  { to: '/admin', label: 'Visão geral', icon: 'dashboard', end: true },
  { to: '/admin/jogadores', label: 'Jogadores', icon: 'players' },
  { to: '/admin/quadras', label: 'Quadras', icon: 'courts' },
  { to: '/admin/reservas', label: 'Reservas', icon: 'calendar' },
]

export default function AdminLayout() {
  return <AppShell area="Administração" navigation={navigation} />
}
