const express = require('express');
const reservaController = require('../controllers/reservaController');

const router = express.Router();

// Lista todas as reservas
router.get('/', reservaController.listarReservas);

// Cadastra uma nova reserva
router.post('/', reservaController.criarReserva);

module.exports = router;