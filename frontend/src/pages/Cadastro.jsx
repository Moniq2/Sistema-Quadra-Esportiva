import { useState } from "react";
import { Link } from "react-router-dom";
import { criarJogador } from "../services/jogadorService";
import Footer from "../components/Footer";
import Toast from "../components/Toast";

function Cadastro() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [senha, setSenha] = useState("");

  const [toast, setToast] = useState({
    visivel: false,
    mensagem: "",
    tipo: "success",
  });

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const jogador = {
        nome,
        email,
        telefone,
        senha,
      };

      await criarJogador(jogador);

      mostrarToast(
        "Jogador cadastrado com sucesso!",
        "success"
      );

      setNome("");
      setEmail("");
      setTelefone("");
      setSenha("");

    } catch (error) {
      console.error("Erro ao cadastrar jogador:", error);

      if (error.response) {
        mostrarToast(
          error.response.data?.erro ||
            `Erro ${error.response.status}: ${error.response.statusText}`,
          "error"
        );
      } else if (error.request) {
        mostrarToast(
          "Não foi possível conectar com o servidor.",
          "error"
        );
      } else {
        mostrarToast(error.message, "error");
      }
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
              Cadastro de Jogador
            </h1>

            <p className="text-center text-base-content/70 mb-4">
              Preencha os dados do jogador
            </p>

            <form
              onSubmit={handleSubmit}
              className="space-y-4"
            >

              <div className="form-control">
                <label className="label">
                  <span className="label-text">
                    Nome
                  </span>
                </label>

                <input
                  type="text"
                  placeholder="Digite o nome"
                  className="input input-bordered w-full"
                  value={nome}
                  onChange={(event) =>
                    setNome(event.target.value)
                  }
                  required
                />
              </div>

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

              <div className="form-control">
                <label className="label">
                  <span className="label-text">
                    Telefone
                  </span>
                </label>

                <input
                  type="tel"
                  placeholder="Digite o telefone"
                  className="input input-bordered w-full"
                  value={telefone}
                  onChange={(event) =>
                    setTelefone(event.target.value)
                  }
                  required
                />
              </div>

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

              <button
                type="submit"
                className="btn btn-primary w-full mt-6"
              >
                Cadastrar jogador
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

export default Cadastro;