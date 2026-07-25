const express = require('express');
const jogadorController = require('../controllers/jogadorController');

const router = express.Router();

// Lista todos os jogadores
router.get('/', jogadorController.listarJogadores);

// Cria um novo jogador
router.post('/', jogadorController.criarJogador);

// Obtém um jogador por ID
router.get('/:id', jogadorController.buscarJogador);

// Atualiza um jogador
router.put('/:id', jogadorController.atualizarJogador);

// Deleta um jogador
router.delete('/:id', jogadorController.excluirJogador);

module.exports = router;
