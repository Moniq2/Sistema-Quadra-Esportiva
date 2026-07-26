const request = require("supertest");
const { app, prisma } = require("../server");

describe("API de Jogadores - Testes de Integração", () => {
  let jogadorCriadoId;

  // Limpa o banco respeitando a ordem relacional (primeiro reservas, depois jogadores)
  beforeAll(async () => {
    await prisma.reserva.deleteMany();
    await prisma.jogador.deleteMany();
  });

  // Após terminar tudo, fecha a conexão com o banco para o terminal não ficar travado
  afterAll(async () => {
    await prisma.$disconnect();
  });

  it("Deve cadastrar um novo jogador com sucesso (POST /jogadores)", async () => {
    const novoJogador = {
      nome: "Carlos Eduardo",
      email: "carlos.teste@atlantico.com.br",
      telefone: "95999999999",
    };

    const response = await request(app)
      .post("/jogadores")
      .send(novoJogador);

    // Aceita tanto status 201 (Created) quanto 200 (OK), dependendo do controller da equipe

    expect([200, 201]).toContain(response.status);
    expect(response.body).toHaveProperty("id");
    expect(response.body.nome).toBe(novoJogador.nome);
    expect(response.body.email).toBe(novoJogador.email);

    jogadorCriadoId = response.body.id;
  });

  it("Deve retornar a lista de jogadores cadastrados (GET /jogadores)", async () => {
    const response = await request(app).get("/jogadores");

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
  });

  it("Não deve permitir cadastrar jogador sem um campo obrigatório, como e-mail", async () => {
    const jogadorInvalido = {
      nome: "Jogador Sem Email",
      telefone: "95888888888",
    };

    const response = await request(app)
      .post("/jogadores")
      .send(jogadorInvalido);

    // O sistema deve barrar e retornar erro da validação
    
    expect([400, 422, 500]).toContain(response.status);
  });
});