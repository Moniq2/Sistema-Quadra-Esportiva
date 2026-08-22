import { useState, useEffect, useCallback } from 'react'
import { useLocation } from 'react-router-dom'
import api from '../services/api'

export default function Reservas() {
  const location = useLocation()
  const quadraIdDoParams = location.state?.quadraIdSelecionada || null

  const [reservas, setReservas] = useState([])
  const [quadras, setQuadras] = useState([])
  const [jogadores, setJogadores] = useState([])
  const [quadraIdSelecionada, setQuadraIdSelecionada] = useState(quadraIdDoParams ? String(quadraIdDoParams) : '')
  const [dataSelecionada, setDataSelecionada] = useState('')
  const [horariosDisponiveis, setHorariosDisponiveis] = useState([])
  const [horariosOcupados, setHorariosOcupados] = useState([])
  const [horarioInicio, setHorarioInicio] = useState('')
  const [horarioFim, setHorarioFim] = useState('')
  const [responsavelId, setResponsavelId] = useState('')
  const [editingId, setEditingId] = useState(null)

  const carregarDados = useCallback(async () => {
    try {
      const [resQuadras, resJogadores, resReservas] = await Promise.all([
        api.get('/quadras'),
        api.get('/jogadores'),
        api.get('/reservas')
      ])
      setQuadras(resQuadras.data || [])
      setJogadores(resJogadores.data || [])
      setReservas(resReservas.data.reservas || [])
    } catch (error) {
      console.error('Erro ao buscar dados:', error)
      setQuadras([])
      setJogadores([])
      setReservas([])
    }
  }, [])

  useEffect(() => {
    carregarDados()
  }, [carregarDados])

  const consultarAgenda = async () => {
    if (!quadraIdSelecionada || !dataSelecionada) {
      alert('Selecione quadra e data')
      return
    }

    try {
      const resposta = await api.get('/reservas/agenda', {
        params: {
          quadra_id: quadraIdSelecionada,
          data: dataSelecionada
        }
      })
      setHorariosDisponiveis(resposta.data.horarios_disponiveis || [])
      setHorariosOcupados(resposta.data.horarios_ocupados || [])
    } catch (error) {
      console.error('Erro ao consultar agenda:', error)
      setHorariosDisponiveis([])
      setHorariosOcupados([])
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!quadraIdSelecionada || !dataSelecionada || !horarioInicio || !horarioFim || !responsavelId) {
      alert('Preencha todos os campos obrigatórios')
      return
    }

    const dados = {
      quadra_id: Number(quadraIdSelecionada),
      responsavel_id: Number(responsavelId),
      data_reserva: dataSelecionada,
      horario_inicio: horarioInicio,
      horario_fim: horarioFim,
      jogadores_ids: []
    }

    try {
      if (editingId) {
        await api.put(`/reservas/${editingId}`, dados)
      } else {
        await api.post('/reservas', dados)
      }
      limparFormulario()
      carregarDados()
    } catch (error) {
      console.error('Erro ao salvar reserva:', error)
      alert('Erro ao salvar. Verifique se há conflito de horário.')
    }
  }

  const handleEdit = (reserva) => {
    setEditingId(reserva.id)
    setQuadraIdSelecionada(String(reserva.quadra_id))
    
    // Garante que a data fique no formato YYYY-MM-DD para o input type="date"
    const dataFormatada = typeof reserva.data_reserva === 'string' 
      ? reserva.data_reserva.split('T')[0] 
      : ''
      
    setDataSelecionada(dataFormatada)
    setHorarioInicio(typeof reserva.horario_inicio === 'string' ? reserva.horario_inicio.slice(0, 5) : '')
    setHorarioFim(typeof reserva.horario_fim === 'string' ? reserva.horario_fim.slice(0, 5) : '')
    setResponsavelId(String(reserva.responsavel_id))
    
    // Limpa a agenda consultada para não confundir o usuário
    setHorariosDisponiveis([])
    setHorariosOcupados([])
  }

  const handleDelete = async (id) => {
    if (confirm('Deseja realmente excluir esta reserva?')) {
      try {
        await api.delete(`/reservas/${id}`)
        carregarDados()
      } catch (error) {
        console.error('Erro ao deletar reserva:', error)
      }
    }
  }

  const limparFormulario = () => {
    setEditingId(null)
    setQuadraIdSelecionada('')
    setDataSelecionada('')
    setHorarioInicio('')
    setHorarioFim('')
    setResponsavelId('')
    setHorariosDisponiveis([])
    setHorariosOcupados([])
  }

  // Função auxiliar para exibir a data sem o problema de fuso horário
  const formatarData = (dataString) => {
    if (!dataString) return '-'
    const apenasData = dataString.split('T')[0]
    const [ano, mes, dia] = apenasData.split('-')
    return `${dia}/${mes}/${ano}`
  }

  return (
    <div className="min-h-screen bg-gray-200 w-full py-10 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto space-y-6">
        <h1 className="text-center font-bold text-3xl text-[#01406D]">
          Agendamento de Reservas
        </h1>

        <form onSubmit={handleSubmit} className="card bg-white shadow-sm p-6 border border-gray-300 space-y-4 rounded-2xl">
          <h2 className="text-xl font-semibold text-[#01406D]">
            {editingId ? 'Editar Reserva' : 'Nova Reserva'}
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <select
              className="input input-bordered w-full rounded-xl bg-gray-50"
              value={quadraIdSelecionada}
              onChange={(e) => setQuadraIdSelecionada(e.target.value)}
              required
            >
              <option value="">Selecione uma Quadra</option>
              {quadras.map(q => (
                <option key={q.id} value={q.id}>{q.nome}</option>
              ))}
            </select>

            <input
              type="date"
              className="input input-bordered w-full rounded-xl bg-gray-50"
              value={dataSelecionada}
              onChange={(e) => setDataSelecionada(e.target.value)}
              required
            />
          </div>

          <button
            type="button"
            onClick={consultarAgenda}
            className="btn bg-[#01B4BA] hover:bg-[#009CA4] text-white border-none rounded-xl w-full"
          >
            Consultar Agenda
          </button>

          {(horariosDisponiveis.length > 0 || horariosOcupados.length > 0) && (
            <div className="bg-blue-50 p-4 rounded-lg space-y-4">
              {horariosOcupados.length > 0 && (
                <div>
                  <h3 className="font-semibold text-red-900 mb-2">⛔ Horários Ocupados:</h3>
                  <div className="flex flex-wrap gap-2">
                    {horariosOcupados.map((slot, idx) => (
                      <button
                        key={idx}
                        disabled
                        className="btn btn-sm bg-red-200 text-red-900 border-none rounded-lg opacity-60 cursor-not-allowed"
                      >
                        {slot.inicio} - {slot.fim}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {horariosDisponiveis.length > 0 && (
                <div>
                  <h3 className="font-semibold text-green-900 mb-2">✅ Horários Disponíveis:</h3>
                  <div className="flex flex-wrap gap-2">
                    {horariosDisponiveis.map((slot, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => {
                          setHorarioInicio(slot.inicio)
                          setHorarioFim(slot.fim)
                        }}
                        className="btn btn-sm bg-[#01B4BA] hover:bg-[#009CA4] text-white border-none rounded-lg"
                      >
                        {slot.inicio} - {slot.fim}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <input
              type="time"
              className="input input-bordered w-full rounded-xl bg-gray-50"
              value={horarioInicio}
              onChange={(e) => setHorarioInicio(e.target.value)}
              placeholder="Hora Início"
              required
            />
            <input
              type="time"
              className="input input-bordered w-full rounded-xl bg-gray-50"
              value={horarioFim}
              onChange={(e) => setHorarioFim(e.target.value)}
              placeholder="Hora Fim"
              required
            />
            <select
              className="input input-bordered w-full rounded-xl bg-gray-50"
              value={responsavelId}
              onChange={(e) => setResponsavelId(e.target.value)}
              required
            >
              <option value="">Responsável</option>
              {jogadores.map(j => (
                <option key={j.id} value={j.id}>{j.nome}</option>
              ))}
            </select>
          </div>

          <div className="flex gap-2 justify-end">
            {editingId && (
              <button type="button" onClick={limparFormulario} className="btn btn-ghost text-gray-500">
                Cancelar
              </button>
            )}
            <button type="submit" className="btn bg-[#01406D] hover:bg-[#013054] text-white border-none rounded-xl">
              {editingId ? 'Atualizar' : 'Reservar'}
            </button>
          </div>
        </form>

        <div className="card bg-white shadow-sm border border-gray-300 p-6 rounded-2xl">
          <h2 className="text-xl font-semibold text-[#01406D] mb-4">Reservas Agendadas</h2>

          {reservas && reservas.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-300">
                    <th className="text-left p-2 text-[#01406D]">Quadra</th>
                    <th className="text-left p-2 text-[#01406D]">Data</th>
                    <th className="text-left p-2 text-[#01406D]">Horário</th>
                    <th className="text-left p-2 text-[#01406D]">Responsável</th>
                    <th className="text-right p-2 text-[#01406D]">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {reservas.map(r => {
                    const quadra = quadras.find(q => q.id === r.quadra_id)
                    const responsavel = jogadores.find(j => j.id === r.responsavel_id)
                    return (
                      <tr key={r.id} className="border-b border-gray-200 hover:bg-gray-50">
                        <td className="p-2">{quadra?.nome || '-'}</td>
                        <td className="p-2">{formatarData(r.data_reserva)}</td>
                        <td className="p-2">
                          {typeof r.horario_inicio === 'string' ? r.horario_inicio.slice(0, 5) : '-'} - {typeof r.horario_fim === 'string' ? r.horario_fim.slice(0, 5) : '-'}
                        </td>
                        <td className="p-2">{responsavel?.nome || '-'}</td>
                        <td className="p-2 flex gap-2 justify-end">
                          <button
                            onClick={() => handleEdit(r)}
                            className="btn btn-sm border-[#01B4BA] text-[#01B4BA] hover:bg-[#01B4BA] hover:text-white rounded-lg bg-transparent"
                          >
                            Editar
                          </button>
                          <button
                            onClick={() => handleDelete(r.id)}
                            className="btn btn-sm border-[#FF7A0F] text-[#FF7A0F] hover:bg-[#FF7A0F] hover:text-white rounded-lg bg-transparent"
                          >
                            Excluir
                          </button>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-gray-600 text-center py-6">Nenhuma reserva cadastrada.</p>
          )}
        </div>
      </div>
    </div>
  )
}