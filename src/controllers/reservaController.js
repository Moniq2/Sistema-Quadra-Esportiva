const reservaService = require('../services/reservaService');

// Cria uma nova reserva
async function criarReserva(req, res) {
  try {
    const reserva = await reservaService.criarReserva(req.body);

    return res.status(201).json({
      mensagem: 'Reserva criada com sucesso.',
      reserva,
    });
  } catch (erro) {
    console.error('Erro ao criar reserva:', erro);

    return res.status(erro.statusCode || 500).json({
      mensagem: erro.message || 'Erro interno ao criar reserva.',
    });
  }
}

module.exports = {
  criarReserva,
};