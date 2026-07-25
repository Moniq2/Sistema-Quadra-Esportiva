const request = require("supertest");
const { app, prisma } = require("../server");

describe("API de Reservas - Testes de Regras de Negócio", () => {
  let jogadorId;
  let quadraId;

  // Antes dos testes: limpa o banco e cria 1 jogador e 1 quadra base

  beforeAll(async () => {
    await prisma.reserva.deleteMany();
    await prisma.quadra.deleteMany();
    await prisma.jogador.deleteMany();

    const jogador = await prisma.jogador.create({
      data: {
        nome: "Jogador Para Reserva",
        email: "reserva@teste.com",
        telefone: "95999999999",
      },
    });

    const quadra = await prisma.quadra.create({
      data: {
        nome: "Quadra de Teste Reserva",
        modalidade: "Vôlei",
        localizacao: "Ginásio Esportivo",
      },
    });

    jogadorId = jogador.id;
    quadraId = quadra.id;
  });

  // Fecha a conexão após os testes
  
  afterAll(async () => {
    await prisma.$disconnect();
  });

  it("Deve criar uma reserva com sucesso em horário disponível (POST /reservas)", async () => {
    const novaReserva = {
      quadra_id: quadraId,
      responsavel_id: jogadorId,
      data_reserva: "2026-08-10",
      horario_inicio: "14:00",
      horario_fim: "15:00",
      jogadores_ids: [],
    };

    const response = await request(app)
      .post("/reservas")
      .send(novaReserva);

    expect([200, 201]).toContain(response.status);
    
    // Busca o objeto da reserva independentemente de como o controller retornou
    const reservaCriada = response.body.reserva || response.body.data || response.body;
    expect(reservaCriada).toHaveProperty("id");
  });

  it("NÃO deve permitir reserva para a mesma quadra em horário já ocupado/conflitante", async () => {
    const reservaConflitante = {
      quadra_id: quadraId,
      responsavel_id: jogadorId,
      data_reserva: "2026-08-10",
      horario_inicio: "14:00",
      horario_fim: "15:00",
      jogadores_ids: [],
    };

    const response = await request(app)
      .post("/reservas")
      .send(reservaConflitante);

    expect([400, 409, 422, 500]).toContain(response.status);
  });

  it("Deve listar todas as reservas cadastradas (GET /reservas)", async () => {
    const response = await request(app).get("/reservas");

    expect(response.status).toBe(200);

    const lista = Array.isArray(response.body)
      ? response.body
      : response.body.reservas || response.body.data || Object.values(response.body).find(Array.isArray);

    expect(Array.isArray(lista)).toBe(true);
    expect(lista.length).toBeGreaterThan(0);
  });
});