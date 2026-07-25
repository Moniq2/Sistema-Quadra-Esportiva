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

// Lista todas as reservas
async function listarReservas(req, res) {
  try {
    const reservas = await reservaService.listarReservas();

    const reservasFormatadas = reservas.map((reserva) => ({
      ...reserva,

      data_reserva: reserva.data_reserva
        .toISOString()
        .slice(0, 10),

      horario_inicio: reserva.horario_inicio
        .toISOString()
        .slice(11, 16),

      horario_fim: reserva.horario_fim
        .toISOString()
        .slice(11, 16),
    }));

    return res.status(200).json({
      quantidade: reservasFormatadas.length,
      reservas: reservasFormatadas,
    });
  } catch (erro) {
    console.error('Erro ao listar reservas:', erro);

    return res.status(500).json({
      mensagem: 'Erro interno ao listar reservas.',
    });
  }
}

module.exports = {
  criarReserva,
  listarReservas,
};