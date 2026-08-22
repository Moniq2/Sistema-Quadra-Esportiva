import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Cadastro from './pages/Cadastro'
import Home from './pages/Home'
import Login from './pages/Login'
import ModulePlaceholder from './pages/ModulePlaceholder'
import Quadras from './pages/Quadras'
import QuadrasUsuario from './pages/QuadrasUsuario'
import { PATHS } from './routes/paths'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Área pública */}
        <Route path={PATHS.home} element={<Home />} />
        <Route path={PATHS.login} element={<Login />} />
        <Route path={PATHS.cadastro} element={<Cadastro />} />

        {/* Área do jogador */}
        <Route path={PATHS.quadras} element={<QuadrasUsuario />} />
        <Route path={PATHS.reservas} element={<ModulePlaceholder eyebrow="Área do jogador" title="Agenda e nova reserva" description="O módulo de agenda desenvolvido pelo Rafael será integrado nesta rota." returnTo={PATHS.quadras} returnLabel="Ver quadras" />} />
        <Route path={PATHS.minhasReservas} element={<ModulePlaceholder eyebrow="Área do jogador" title="Minhas reservas" description="Aqui o jogador visualizará e cancelará somente as próprias reservas." returnTo={PATHS.quadras} returnLabel="Ver quadras" />} />
        <Route path="/agenda" element={<Navigate to={PATHS.reservas} replace />} />

        {/* Área administrativa */}
        <Route path={PATHS.admin} element={<ModulePlaceholder eyebrow="Administração" title="Dashboard administrativo" description="Indicadores e atalhos administrativos serão apresentados nesta página." />} />
        <Route path={PATHS.adminJogadores} element={<ModulePlaceholder eyebrow="Administração" title="Gerenciamento de jogadores" description="A tela administrativa de jogadores será integrada nesta rota." returnTo={PATHS.admin} returnLabel="Voltar ao dashboard" />} />
        <Route path={PATHS.adminQuadras} element={<Quadras />} />
        <Route path={PATHS.adminReservas} element={<ModulePlaceholder eyebrow="Administração" title="Gerenciamento de reservas" description="A visão completa das reservas será integrada nesta rota." returnTo={PATHS.admin} returnLabel="Voltar ao dashboard" />} />

        {/* Rota desconhecida */}
        <Route path="*" element={<ModulePlaceholder eyebrow="Erro 404" title="Página não encontrada" description="O endereço informado não corresponde a uma página do TMJ." />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
