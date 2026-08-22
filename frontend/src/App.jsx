import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";

import Quadras from "./pages/Quadras";
import QuadrasUsuario from "./pages/QuadrasUsuario";
import Jogadores from "./pages/Jogadores";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Página inicial */}
       {/*  <Route
          path="/"
          element={<Landing />}
        /> */}

        {/* Login */}
        <Route
          path="/login"
          element={<Login />}
        />

        {/* Cadastro */}
        <Route
          path="/cadastro"
          element={<Cadastro />}
        />

        {/* Área do administrador */}
        <Route path="/admin/quadras" element={<Quadras />} />
        <Route path="/admin/jogadores" element={<Jogadores />} />

        {/* Área do usuário */}
        <Route
          path="/quadras"
          element={<QuadrasUsuario />}
        />

      </Routes>
    </BrowserRouter>
  );
}

export default App;