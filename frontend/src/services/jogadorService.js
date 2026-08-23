import api from './api'

export async function criarJogador(data) {
  const response = await api.post('/jogadores', data)
  return response.data
}

export async function listarJogadores() {
  const response = await api.get('/jogadores')
  return response.data || []
}

export async function atualizarJogador(id, data) {
  const response = await api.put(`/jogadores/${id}`, data)
  return response.data
}

export async function excluirJogador(id) {
  const response = await api.delete(`/jogadores/${id}`)
  return response.data
}
