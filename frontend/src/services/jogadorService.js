import api from './api'

export async function criarJogador(data) {
  const response = await api.post('/jogadores', data)
  return response.data
}
