const quadraService = require('../services/quadraService');

async function criarQuadra(req, res) {
    try{
        const quadra = await quadraService.criarQuadra(req.body);
        return res.status(201).json(quadra);
    } catch (error) {
        return res.status(400).json({ erro: 'Erro ao criar quadra' });
    }
}

async function listarQuadras(req, res) {
  try {
    const quadras = await quadraService.listarQuadras();
    return res.json(quadras);
  } catch (error) {
    return res.status(500).json({ erro: 'Erro ao listar quadras.' });
  }
}

async function atualizarQuadra(req, res) {
  try {
    const { id } = req.params;
    const quadra = await quadraService.atualizarQuadra(id, req.body);
    return res.json(quadra);
  } catch (error) {
    return res.status(400).json({ erro: 'Erro ao atualizar quadra.' });
  }
}

async function deletarQuadra(req, res) {
  try {
    const { id } = req.params;
    await quadraService.deletarQuadra(id);
    return res.json({ mensagem: 'Quadra removida com sucesso' });
  } catch (error) {
    return res.status(400).json({ erro: 'Erro ao deletar quadra.' });
  }
}

module.exports = {
    criarQuadra,
    listarQuadras,
    atualizarQuadra,
    deletarQuadra,
}