const express = require('express');
const reservaController = require('../controllers/reservaController');

const router = express.Router();

// Cadastro de uma nova reserva
router.post('/', reservaController.criarReserva);

module.exports = router;