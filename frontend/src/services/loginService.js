import axios from "axios";

const API_URL = "http://localhost:3000";

export async function fazerLogin(dados) {
  const resposta = await axios.post(
    `${API_URL}/login`,
    dados
  );

  return resposta.data;
}