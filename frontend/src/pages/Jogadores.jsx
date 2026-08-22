import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import {
  listarJogadores,
  excluirJogador,
} from "../services/jogadorService";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Modal from "../components/Modal";
import Toast from "../components/Toast";

function Jogadores() {
  const [jogadores, setJogadores] = useState([]);
  const [carregando, setCarregando] = useState(true);

  const [modalAberto, setModalAberto] = useState(false);
  const [jogadorSelecionado, setJogadorSelecionado] = useState(null);

  const [toast, setToast] = useState({
    visivel: false,
    mensagem: "",
    tipo: "success",
  });

  useEffect(() => {
    carregarJogadores();
  }, []);

  async function carregarJogadores() {
    try {
      setCarregando(true);

      const dados = await listarJogadores();

      setJogadores(dados);
    } catch (error) {
      mostrarToast("Erro ao carregar jogadores.", "error");
    } finally {
      setCarregando(false);
    }
  }

  function abrirModal(jogador) {
    setJogadorSelecionado(jogador);
    setModalAberto(true);
  }

  function fecharModal() {
    setModalAberto(false);
    setJogadorSelecionado(null);
  }

  async function confirmarExclusao() {
    try {
      await excluirJogador(jogadorSelecionado.id);

      setJogadores(
        jogadores.filter(
          (jogador) => jogador.id !== jogadorSelecionado.id
        )
      );

      fecharModal();

      mostrarToast(
        "Jogador removido com sucesso.",
        "success"
      );
    } catch (error) {
      fecharModal();

      mostrarToast(
        "Erro ao excluir jogador.",
        "error"
      );
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

      <Navbar />

      <main className="flex-1 p-6">

        <div className="max-w-6xl mx-auto">

          <div className="flex justify-between items-center mb-6">

            <div>
              <h1 className="text-3xl font-bold">
                Jogadores
              </h1>

              <p className="text-base-content/70">
                Jogadores cadastrados no sistema
              </p>
            </div>

            <Link
              to="/jogadores/cadastro"
              className="btn btn-primary"
            >
              Novo jogador
            </Link>

          </div>

          {carregando ? (
            <div className="flex justify-center py-10">
              <span className="loading loading-spinner loading-lg"></span>
            </div>

          ) : jogadores.length === 0 ? (

            <div className="alert">
              <span>
                Nenhum jogador cadastrado.
              </span>
            </div>

          ) : (

            <div className="overflow-x-auto bg-base-100 rounded-box shadow">

              <table className="table">

                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Nome</th>
                    <th>E-mail</th>
                    <th>Telefone</th>
                    <th>Ações</th>
                  </tr>
                </thead>

                <tbody>

                  {jogadores.map((jogador) => (
                    <tr key={jogador.id}>

                      <td>
                        {jogador.id}
                      </td>

                      <td className="font-medium">
                        {jogador.nome}
                      </td>

                      <td>
                        {jogador.email}
                      </td>

                      <td>
                        {jogador.telefone}
                      </td>

                      <td>

                        <div className="flex gap-2">

                          <button
                            className="btn btn-sm bg-white border-secondary text-secondary hover:bg-secondary hover:text-white"
                          >
                            Editar
                          </button>

                          <button
                            className="btn btn-sm bg-white border-accent text-accent hover:bg-accent hover:text-white"
                            onClick={() => abrirModal(jogador)}
                          >
                            Excluir
                          </button>

                        </div>

                      </td>

                    </tr>
                  ))}

                </tbody>

              </table>

            </div>
          )}

        </div>

      </main>

      <Footer />

      <Modal
        aberto={modalAberto}
        titulo="Excluir jogador"
        onConfirmar={confirmarExclusao}
        onFechar={fecharModal}
      >
        <p>
          Tem certeza que deseja excluir o jogador{" "}
          <strong>
            {jogadorSelecionado?.nome}
          </strong>
          ?
        </p>
      </Modal>

      <Toast
        mensagem={toast.mensagem}
        tipo={toast.tipo}
        visivel={toast.visivel}
      />

    </div>
  );
}

export default Jogadores;