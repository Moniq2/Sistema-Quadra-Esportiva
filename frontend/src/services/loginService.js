import api from './api'

export async function fazerLogin(data) {
  const response = await api.post('/login', data)
  return response.data
}
