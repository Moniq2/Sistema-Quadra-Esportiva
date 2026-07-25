require('dotenv/config');

const { PrismaClient } = require('@prisma/client');
const { PrismaPg } = require('@prisma/adapter-pg');
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

// Cria um erro com código HTTP para ser tratado pelo controller
function criarErro(mensagem, statusCode = 400) {
  const erro = new Error(mensagem);
  erro.statusCode = statusCode;
  return erro;
}

// Converte uma data no formato YYYY-MM-DD para o formato usado pelo Prisma
function converterData(data) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(data)) {
    throw criarErro('A data deve estar no formato YYYY-MM-DD.');
  }

  const dataConvertida = new Date(`${data}T00:00:00.000Z`);

  if (
    Number.isNaN(dataConvertida.getTime()) ||
    dataConvertida.toISOString().slice(0, 10) !== data
  ) {
    throw criarErro('A data informada é inválida.');
  }

  return dataConvertida;
}

// Converte um horário no formato HH:mm para o formato usado pelo Prisma
function converterHorario(horario) {
  if (!/^([01]\d|2[0-3]):[0-5]\d$/.test(horario)) {
    throw criarErro('O horário deve estar no formato HH:mm.');
  }

  return new Date(`1970-01-01T${horario}:00.000Z`);
}

// Remove IDs repetidos e inclui o responsável entre os participantes
function organizarParticipantes(jogadoresIds, responsavelId) {
  const ids = [
    Number(responsavelId),
    ...jogadoresIds.map((id) => Number(id)),
  ];

  return [...new Set(ids)];
}

// Verifica se a quadra já está reservada no período informado
async function verificarConflito(
  quadraId,
  dataReserva,
  horarioInicio,
  horarioFim
) {
  return prisma.reserva.findFirst({
    where: {
      quadra_id: quadraId,
      data_reserva: dataReserva,

      horario_inicio: {
        lt: horarioFim,
      },

      horario_fim: {
        gt: horarioInicio,
      },
    },
  });
}

async function criarReserva(dados) {
  const {
    quadra_id,
    responsavel_id,
    data_reserva,
    horario_inicio,
    horario_fim,
    jogadores_ids = [],
  } = dados;

  if (
    !quadra_id ||
    !responsavel_id ||
    !data_reserva ||
    !horario_inicio ||
    !horario_fim
  ) {
    throw criarErro(
      'Quadra, responsável, data, horário de início e horário de fim são obrigatórios.'
    );
  }

  if (!Array.isArray(jogadores_ids)) {
    throw criarErro('O campo jogadores_ids deve ser uma lista.');
  }

  const quadraId = Number(quadra_id);
  const responsavelId = Number(responsavel_id);

  if (!Number.isInteger(quadraId) || quadraId <= 0) {
    throw criarErro('O ID da quadra é inválido.');
  }

  if (!Number.isInteger(responsavelId) || responsavelId <= 0) {
    throw criarErro('O ID do responsável é inválido.');
  }

  const dataReserva = converterData(data_reserva);
  const horarioInicio = converterHorario(horario_inicio);
  const horarioFim = converterHorario(horario_fim);

  if (horarioInicio >= horarioFim) {
    throw criarErro(
      'O horário de fim deve ser maior que o horário de início.'
    );
  }

  const [quadra, responsavel] = await Promise.all([
    prisma.quadra.findUnique({
      where: { id: quadraId },
    }),

    prisma.jogador.findUnique({
      where: { id: responsavelId },
    }),
  ]);

  if (!quadra) {
    throw criarErro('Quadra não encontrada.', 404);
  }

  if (!responsavel) {
    throw criarErro('Jogador responsável não encontrado.', 404);
  }

  const participantesIds = organizarParticipantes(
    jogadores_ids,
    responsavelId
  );

  const participantesInvalidos = participantesIds.some(
    (id) => !Number.isInteger(id) || id <= 0
  );

  if (participantesInvalidos) {
    throw criarErro('Existe um ID de jogador inválido.');
  }

  const jogadoresEncontrados = await prisma.jogador.findMany({
    where: {
      id: {
        in: participantesIds,
      },
    },
  });

  if (jogadoresEncontrados.length !== participantesIds.length) {
    throw criarErro(
      'Um ou mais jogadores participantes não foram encontrados.',
      404
    );
  }

  const conflito = await verificarConflito(
    quadraId,
    dataReserva,
    horarioInicio,
    horarioFim
  );

  if (conflito) {
    throw criarErro(
      'A quadra já possui uma reserva nesse período.',
      409
    );
  }

  return prisma.reserva.create({
    data: {
      quadra_id: quadraId,
      responsavel_id: responsavelId,
      data_reserva: dataReserva,
      horario_inicio: horarioInicio,
      horario_fim: horarioFim,

      participantes: {
        create: participantesIds.map((jogadorId) => ({
          jogador_id: jogadorId,
        })),
      },
    },

    include: {
      quadra: true,
      responsavel: true,

      participantes: {
        include: {
          jogador: true,
        },
      },
    },
  });
}

// Lista todas as reservas com quadra, responsável e participantes
async function listarReservas() {
  return prisma.reserva.findMany({
    orderBy: [
      {
        data_reserva: 'asc',
      },
      {
        horario_inicio: 'asc',
      },
    ],

    include: {
      quadra: true,
      responsavel: true,

      participantes: {
        include: {
          jogador: true,
        },
      },
    },
  });
}

module.exports = {
  criarReserva,
  listarReservas,
};