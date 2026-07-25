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

// Busca uma reserva pelo ID
async function buscarReservaPorId(req, res) {
  try {
    const reserva = await reservaService.buscarReservaPorId(req.params.id);

    const reservaFormatada = {
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
    };

    return res.status(200).json({
      reserva: reservaFormatada,
    });
  } catch (erro) {
    console.error("Erro ao buscar reserva:", erro);

    return res.status(erro.statusCode || 500).json({
      mensagem: erro.message || "Erro interno ao buscar reserva.",
    });
  }
}

// Atualiza uma reserva existente
async function atualizarReserva(req, res) {
  try {
    const reserva = await reservaService.atualizarReserva(
      req.params.id,
      req.body
    );

    const reservaFormatada = {
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
    };

    return res.status(200).json({
      mensagem: "Reserva atualizada com sucesso.",
      reserva: reservaFormatada,
    });
  } catch (erro) {
    console.error("Erro ao atualizar reserva:", erro);

    return res.status(erro.statusCode || 500).json({
      mensagem:
        erro.message || "Erro interno ao atualizar reserva.",
    });
  }
}

// Exclui uma reserva
async function excluirReserva(req, res) {
  try {
    await reservaService.excluirReserva(req.params.id);

    return res.status(200).json({
      mensagem: "Reserva excluída com sucesso.",
    });
  } catch (erro) {
    console.error("Erro ao excluir reserva:", erro);

    return res.status(erro.statusCode || 500).json({
      mensagem:
        erro.message || "Erro interno ao excluir reserva.",
    });
  }
}

module.exports = {
  criarReserva,
  listarReservas,
   buscarReservaPorId,
   atualizarReserva,
   excluirReserva,
};