const express = require("express");
const reservaController = require("../controllers/reservaController");

const router = express.Router();

// Lista todas as reservas
router.get("/", reservaController.listarReservas);

// Busca uma reserva pelo ID
router.get("/:id", reservaController.buscarReservaPorId);

// Cadastra uma nova reserva
router.post("/", reservaController.criarReserva);

module.exports = router;