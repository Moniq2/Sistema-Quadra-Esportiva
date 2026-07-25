const express = require('express');
const router = express.Router();

const {
    criarQuadra,
    listarQuadras,
    atualizarQuadra,
    deletarQuadra,
} = require('../controllers/quadraController');

router.post('/', criarQuadra);
router.get('/', listarQuadras);
router.put('/:id', atualizarQuadra);
router.delete('/:id', deletarQuadra);

module.exports = router;