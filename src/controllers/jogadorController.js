const jogadorService = require('../services/jogadorService');

async function criarJogador(req, res) {
  try {
    const jogador = await jogadorService.criarJogador(req.body);
    return res.status(201).json(jogador);
  } catch (error) {
    return res.status(400).json({ erro: error.message || 'Erro ao criar jogador.' });
  }
}

async function listarJogadores(req, res) {
  try {
    const jogadores = await jogadorService.listarJogadores();
    return res.json(jogadores);
  } catch (error) {
    return res.status(500).json({ erro: 'Erro ao listar jogadores.' });
  }
}

async function buscarJogador(req, res) {
  try {
    const { id } = req.params;
    const jogador = await jogadorService.buscarJogador(id);
    if (!jogador) return res.status(404).json({ erro: 'Jogador não encontrado.' });
    return res.json(jogador);
  } catch (error) {
    return res.status(500).json({ erro: 'Erro ao buscar jogador.' });
  }
}

async function atualizarJogador(req, res) {
  try {
    const { id } = req.params;
    const jogador = await jogadorService.atualizarJogador(id, req.body);
    return res.json(jogador);
  } catch (error) {
    return res.status(400).json({ erro: error.message || 'Erro ao atualizar jogador.' });
  }
}

async function excluirJogador(req, res) {
  try {
    const { id } = req.params;
    await jogadorService.excluirJogador(id);
    return res.json({ mensagem: 'Jogador removido com sucesso. ' });
  } catch (error) {
    return res.status(400).json({ erro: 'Erro ao excluir jogador.' });
  }
}

module.exports = {
  criarJogador,
  listarJogadores,
  buscarJogador,
  atualizarJogador,
  excluirJogador,
};
