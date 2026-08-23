import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import ProtectedRoute from './auth/ProtectedRoute'
import { USER_ROLES } from './auth/authStorage'
import AdminLayout from './layouts/AdminLayout'
import PublicLayout from './layouts/PublicLayout'
import UserLayout from './layouts/UserLayout'
import Cadastro from './pages/Cadastro'
import AdminDashboard from './pages/AdminDashboard'
import Home from './pages/Home'
import Jogadores from './pages/Jogadores'
import Login from './pages/Login'
import ModulePlaceholder from './pages/ModulePlaceholder'
import Quadras from './pages/Quadras'
import QuadrasUsuario from './pages/QuadrasUsuario'
import Reservas from './pages/Reservas'
import UserDashboard from './pages/UserDashboard'
import { PATHS } from './routes/paths'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path={PATHS.home} element={<Home />} />
          <Route path={PATHS.login} element={<Login />} />
          <Route path={PATHS.cadastro} element={<Cadastro />} />
        </Route>

        {/* Área do jogador */}
        <Route element={<ProtectedRoute allowedRoles={[USER_ROLES.player]} />}>
          <Route element={<UserLayout />}>
            <Route path={PATHS.inicio} element={<UserDashboard />} />
            <Route path={PATHS.quadras} element={<QuadrasUsuario />} />
            <Route path={PATHS.reservas} element={<Reservas />} />
            <Route path={PATHS.minhasReservas} element={<Reservas mode="mine" />} />
            <Route path="/agenda" element={<Navigate to={PATHS.reservas} replace />} />
          </Route>
        </Route>

        {/* Área administrativa */}
        <Route element={<ProtectedRoute allowedRoles={[USER_ROLES.admin]} />}>
          <Route element={<AdminLayout />}>
            <Route path={PATHS.admin} element={<AdminDashboard />} />
            <Route path={PATHS.adminJogadores} element={<Jogadores />} />
            <Route path={PATHS.adminQuadras} element={<Quadras />} />
            <Route path={PATHS.adminReservas} element={<Reservas mode="admin" />} />
          </Route>
        </Route>

        {/* Rota desconhecida */}
        <Route path="*" element={<ModulePlaceholder eyebrow="Erro 404" title="Página não encontrada" description="O endereço informado não corresponde a uma página do TMJ." />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
