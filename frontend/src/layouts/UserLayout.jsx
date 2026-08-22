import AppShell from './AppShell'

const navigation = [
  { to: '/inicio', label: 'Início', icon: 'dashboard' },
  { to: '/quadras', label: 'Quadras', icon: 'courts' },
  { to: '/reservas', label: 'Agenda e reserva', icon: 'calendar' },
  { to: '/minhas-reservas', label: 'Minhas reservas', icon: 'reservations' },
]

export default function UserLayout() {
  return <AppShell area="Área do jogador" navigation={navigation} />
}
