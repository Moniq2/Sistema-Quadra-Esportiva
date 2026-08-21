import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Quadras from './pages/Quadras'
import QuadrasUsuario from './pages/QuadrasUsuario'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rota do Administrador */}
        <Route path="/admin/quadras" element={<Quadras />} />

        {/* Rota do Cliente/Usuário */}
        <Route path="/quadras" element={<QuadrasUsuario />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App