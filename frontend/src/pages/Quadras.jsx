import { useState, useEffect } from 'react'
import api from '../services/api'

export default function Quadras() {
  const [quadras, setQuadras] = useState([])
  const [nome, setNome] = useState('')
  const [modalidade, setModalidade] = useState('')
  const [localizacao, setLocalizacao] = useState('')
  const [editingId, setEditingId] = useState(null)

  // Filtros de busca
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

  const handleSubmit = async (e) => {
    e.preventDefault()
    const dados = { nome, modalidade, localizacao }

    try {
      if (editingId) {
        await api.put(`/quadras/${editingId}`, dados)
      } else {
        await api.post('/quadras', dados)
      }
      limparFormulario()
      carregarQuadras()
    } catch (error) {
      console.error('Erro ao salvar quadra:', error)
    }
  }

  const handleDelete = async (id) => {
    if (confirm('Deseja realmente excluir esta quadra?')) {
      try {
        await api.delete(`/quadras/${id}`)
        carregarQuadras()
      } catch (error) {
        console.error('Erro ao deletar quadra:', error)
      }
    }
  }

  const handleEdit = (quadra) => {
    setEditingId(quadra.id)
    setNome(quadra.nome || '')
    setModalidade(quadra.modalidade || '')
    setLocalizacao(quadra.localizacao || '')
  }

  const limparFormulario = () => {
    setEditingId(null)
    setNome('')
    setModalidade('')
    setLocalizacao('')
  }

  // Função auxiliar para ignorar acentos e letras maiúsculas/minúsculas
  const removerAcentos = (texto) => {
    return (texto || '')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
  }

  // Filtragem flexível (sem acentos e sem case-sensitivity)
  const quadrasFiltradas = quadras.filter((q) => {
    const matchModalidade = removerAcentos(q.modalidade).includes(removerAcentos(filtroModalidade))
    const matchLocalizacao = removerAcentos(q.localizacao).includes(removerAcentos(filtroLocalizacao))

    return matchModalidade && matchLocalizacao
  })

  return (
    <div className="min-h-screen bg-[#F5FEFE] w-full py-8 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-center font-bold text-3xl text-[#01406D]">
          Gerenciamento de Quadras
        </h1>

        {/* 1. Formulário de Cadastro/Edição */}
        <form onSubmit={handleSubmit} className="card bg-white shadow-sm p-6 border border-gray-300 space-y-4 rounded-2xl">
          <h2 className="text-xl font-semibold text-[#01406D]">
            {editingId ? 'Editar Quadra' : 'Nova Quadra'}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <input
              type="text"
              placeholder="Nome da Quadra"
              className="input input-bordered w-full rounded-xl bg-gray-50 focus:bg-white focus:border-[#01406D]"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Modalidade"
              className="input input-bordered w-full rounded-xl bg-gray-50 focus:bg-white focus:border-[#01406D]"
              value={modalidade}
              onChange={(e) => setModalidade(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Localização"
              className="input input-bordered w-full rounded-xl bg-gray-50 focus:bg-white focus:border-[#01406D]"
              value={localizacao}
              onChange={(e) => setLocalizacao(e.target.value)}
              required
            />
          </div>
          <div className="flex gap-2 justify-end">
            {editingId && (
              <button type="button" onClick={limparFormulario} className="btn btn-ghost text-gray-500">
                Cancelar
              </button>
            )}
            <button type="submit" className="btn bg-[#01406D] hover:bg-[#013054] text-white border-none rounded-xl">
              {editingId ? 'Atualizar' : 'Cadastrar'}
            </button>
          </div>
        </form>

        {/* 2. Card de Filtros */}
        <div className="card bg-white shadow-sm border border-gray-300 p-6 rounded-2xl space-y-3">
          <h2 className="font-bold text-lg text-[#01406D] pb-3 border-b border-gray-200">
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

        {/* 3. Cards de Exibição de Quadras */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {quadrasFiltradas.length > 0 ? (
            quadrasFiltradas.map((q) => (
              <div key={q.id} className="card bg-white border border-gray-300 shadow-sm p-4 rounded-2xl flex flex-row justify-between items-center">
                <div>
                  <h3 className="font-bold text-lg text-[#01406D]">{q.nome}</h3>
                  <p className="text-sm text-gray-500">Modalidade: {q.modalidade}</p>
                  <p className="text-sm text-gray-600">Local: {q.localizacao}</p>
                </div>
                <div className="flex gap-2">
                  <button 
                    onClick={() => handleEdit(q)} 
                    className="btn btn-sm border-[#01B4BA] text-[#01B4BA] hover:bg-[#01B4BA] hover:text-white rounded-lg bg-transparent"
                  >
                    Editar
                  </button>
                  <button 
                    onClick={() => handleDelete(q.id)} 
                    className="btn btn-sm border-[#FF7A0F] text-[#FF7A0F] hover:bg-[#FF7A0F] hover:text-white rounded-lg bg-transparent"
                  >
                    Excluir
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-600 text-sm col-span-full text-center py-6">
              Nenhuma quadra encontrada com os filtros aplicados.
            </p>
          )}
        </div>
      </div>
    </div>
  )
}