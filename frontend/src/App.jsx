import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Cadastro from './pages/Cadastro'
import Home from './pages/Home'
import Login from './pages/Login'
import Quadras from './pages/Quadras'
import QuadrasUsuario from './pages/QuadrasUsuario'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/quadras" element={<QuadrasUsuario />} />
        <Route path="/admin/quadras" element={<Quadras />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
