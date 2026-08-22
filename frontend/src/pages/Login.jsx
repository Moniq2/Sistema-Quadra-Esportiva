import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { fazerLogin } from "../services/loginService";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Toast from "../components/Toast";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const [carregando, setCarregando] = useState(false);

  const [toast, setToast] = useState({
    visivel: false,
    mensagem: "",
    tipo: "success",
  });

  async function handleSubmit(event) {
    event.preventDefault();

    setToast({
      visivel: false,
      mensagem: "",
      tipo: "success",
    });

    try {
      setCarregando(true);

      const resposta = await fazerLogin({
        email,
        senha,
      });

      // O backend retorna o tipo do usuário
      const tipoUsuario = resposta.usuario.tipo;

      // Guarda os dados do usuário para serem usados
      // pelas outras páginas da aplicação.
      localStorage.setItem(
        "usuario",
        JSON.stringify(resposta.usuario)
      );

      // Decide qual página abrir de acordo
      // com o tipo do usuário.
      if (tipoUsuario === "ADMIN") {
        navigate("/admin/jogadores");
      } else if (tipoUsuario === "JOGADOR") {
        navigate("/quadras");
      } else {
        throw new Error("Tipo de usuário não reconhecido.");
      }

    } catch (error) {
      console.error("Erro ao fazer login:", error);

      if (error.response) {
        mostrarToast(
          error.response.data?.erro ||
            "E-mail ou senha inválidos.",
          "error"
        );

      } else if (error.request) {
        mostrarToast(
          "Não foi possível conectar com o servidor.",
          "error"
        );

      } else {
        mostrarToast(
          error.message || "Erro ao realizar login.",
          "error"
        );
      }

    } finally {
      setCarregando(false);
    }
  }

  function mostrarToast(mensagem, tipo) {
    setToast({
      visivel: true,
      mensagem,
      tipo,
    });

    setTimeout(() => {
      setToast({
        visivel: false,
        mensagem: "",
        tipo: "success",
      });
    }, 3000);
  }

  return (
    <div className="min-h-screen bg-base-200 flex flex-col">

      <main className="flex-1 flex items-center justify-center p-6">

        <div className="card bg-base-100 w-full max-w-lg shadow-xl">

          <div className="card-body">

            <h1 className="card-title text-2xl font-bold justify-center mb-2">
              Login
            </h1>

            <p className="text-center text-base-content/70 mb-4">
              Entre com seus dados para acessar o sistema
            </p>

            <form
              onSubmit={handleSubmit}
              className="space-y-4"
            >

              {/* E-mail */}

              <div className="form-control">

                <label className="label">
                  <span className="label-text">
                    E-mail
                  </span>
                </label>

                <input
                  type="email"
                  placeholder="Digite o e-mail"
                  className="input input-bordered w-full"
                  value={email}
                  onChange={(event) =>
                    setEmail(event.target.value)
                  }
                  required
                />

              </div>

              {/* Senha */}

              <div className="form-control">

                <label className="label">
                  <span className="label-text">
                    Senha
                  </span>
                </label>

                <input
                  type="password"
                  placeholder="Digite a senha"
                  className="input input-bordered w-full"
                  value={senha}
                  onChange={(event) =>
                    setSenha(event.target.value)
                  }
                  required
                />

              </div>

              {/* Botão */}

              <button
                type="submit"
                className="btn btn-primary w-full mt-6"
                disabled={carregando}
              >
                {carregando ? (
                  <>
                    <span className="loading loading-spinner loading-sm"></span>
                    Entrando...
                  </>
                ) : (
                  "Entrar"
                )}
              </button>

            </form>

          </div>

        </div>

      </main>

      <Footer />

      <Toast
        mensagem={toast.mensagem}
        tipo={toast.tipo}
        visivel={toast.visivel}
      />

    </div>
  );
}

export default Login;