import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
});

export async function listarJogadores() {
  const response = await api.get("/jogadores");
  return response.data;
}

export async function buscarJogador(id) {
  const response = await api.get(`/jogadores/${id}`);
  return response.data;
}

export async function criarJogador(jogador) {
  const response = await api.post("/jogadores", jogador);
  return response.data;
}

export async function atualizarJogador(id, jogador) {
  const response = await api.put(`/jogadores/${id}`, jogador);
  return response.data;
}

export async function excluirJogador(id) {
  const response = await api.delete(`/jogadores/${id}`);
  return response.data;
}