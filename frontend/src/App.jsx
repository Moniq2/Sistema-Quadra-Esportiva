import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Quadras from './pages/Quadras'
import QuadrasUsuario from './pages/QuadrasUsuario'
import Reservas from './pages/Reservas'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rota padrão */}
        <Route path="/" element={<Navigate to="/quadras" />} />

        {/* Rota do Administrador */}
        <Route path="/admin/quadras" element={<Quadras />} />

        {/* Rota do Cliente/Usuário */}
        <Route path="/quadras" element={<QuadrasUsuario />} />

        {/* Rota de Reservas do Cliente */}
        <Route path="/reservas" element={<Reservas />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App