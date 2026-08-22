import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../services/api'

export default function QuadrasUsuario() {
  const navigate = useNavigate()
  const [quadras, setQuadras] = useState([])
  const [filtroModalidade, setFiltroModalidade] = useState('')
  const [filtroLocalizacao, setFiltroLocalizacao] = useState('')

  useEffect(() => {
    carregarQuadras()
  }, [])

  const carregarQuadras = async () => {
    try {
      const resposta = await api.get('/quadras')
      setQuadras(resposta.data)
    } catch (error) {
      console.error('Erro ao buscar quadras:', error)
    }
  }

  // Remove acentos e converte para minúsculas
  const removerAcentos = (texto) => {
    return (texto || '')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
  }

  // Filtra as quadras em tempo real
  const quadrasFiltradas = quadras.filter((q) => {
    const matchModalidade = removerAcentos(q.modalidade).includes(removerAcentos(filtroModalidade))
    const matchLocalizacao = removerAcentos(q.localizacao).includes(removerAcentos(filtroLocalizacao))
    return matchModalidade && matchLocalizacao
  })

  return (
    <div className="min-h-screen bg-[#F5FEFE] w-full py-8 px-4 sm:px-6">
      <div className="max-w-5xl mx-auto space-y-6">
        
        {/* Cabeçalho */}
        <div>
          <h1 className="text-3xl font-bold text-[#01406D]">Quadras Disponíveis</h1>
          <p className="text-sm text-gray-500 mt-1">
            Escolha uma quadra para realizar sua reserva
          </p>
        </div>

        {/* Card de Filtros */}
        <div className="card bg-white shadow-sm border border-gray-200 p-6 rounded-2xl space-y-3">
          <h2 className="font-bold text-lg text-[#01406D] pb-3 border-b border-gray-100">
            Filtros
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
            <div>
              <label className="text-xs font-semibold text-gray-700 mb-1.5 block">Modalidade</label>
              <input
                type="text"
                placeholder="Ex: Futsal, Tênis"
                className="input input-bordered w-full h-10 rounded-xl text-xs bg-gray-50 focus:bg-white focus:border-[#01B4BA]"
                value={filtroModalidade}
                onChange={(e) => setFiltroModalidade(e.target.value)}
              />
            </div>

            <div>
              <label className="text-xs font-semibold text-gray-700 mb-1.5 block">Localização</label>
              <input
                type="text"
                placeholder="Ex: Brasília, São Paulo"
                className="input input-bordered w-full h-10 rounded-xl text-xs bg-gray-50 focus:bg-white focus:border-[#01B4BA]"
                value={filtroLocalizacao}
                onChange={(e) => setFiltroLocalizacao(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Lista de Cards para o Cliente */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {quadrasFiltradas.length > 0 ? (
            quadrasFiltradas.map((q) => (
              <div 
                key={q.id} 
                className="bg-white border border-gray-200 shadow-sm p-5 rounded-2xl flex flex-col justify-between space-y-4"
              >
                <div>
                  <span className="inline-block bg-[#01B4BA]/10 text-[#01B4BA] text-xs font-bold px-2.5 py-1 rounded-md mb-2">
                    {q.modalidade}
                  </span>
                  <h3 className="font-bold text-xl text-[#01406D]">{q.nome}</h3>
                  <p className="text-xs text-gray-500 mt-1">📍 {q.localizacao}</p>
                </div>

                <button
                  onClick={() => navigate('/reservas', { state: { quadraIdSelecionada: q.id } })}
                  className="btn bg-[#FF7A0F] hover:bg-[#e06900] text-white border-none rounded-xl w-full text-sm font-semibold"
                >
                  Reservar Quadra
                </button>
              </div>
            ))
          ) : (
            <p className="text-gray-500 text-sm col-span-full text-center py-10">
              Nenhuma quadra encontrada com os filtros informados
            </p>
          )}
        </div>

      </div>
    </div>
  )
}