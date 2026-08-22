import api from './api'

export const getReservas = async () => (await api.get('/reservas')).data?.reservas || []
export const getQuadras = async () => (await api.get('/quadras')).data || []
export const getJogadores = async () => (await api.get('/jogadores')).data || []
export const getAgenda = async (quadraId, data) => (await api.get('/reservas/agenda', { params: { quadra_id: quadraId, data } })).data
export const postReserva = (data) => api.post('/reservas', data)
export const putReserva = (id, data) => api.put(`/reservas/${id}`, data)
export const deleteReserva = (id) => api.delete(`/reservas/${id}`)
