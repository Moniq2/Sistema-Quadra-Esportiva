const request = require("supertest");
const { app, prisma } = require("../server");

describe("API de Quadras - Testes de Integração", () => {
  let quadraCriadaId;

  // Limpa o banco na ordem correta (primeiro reservas, depois quadras)

  beforeAll(async () => {
    await prisma.reserva.deleteMany();
    await prisma.quadra.deleteMany();
  });

  // Fecha a conexão após os testes
  
  afterAll(async () => {
    await prisma.$disconnect();
  });

  it("Deve cadastrar uma nova quadra com sucesso (POST /quadras)", async () => {
    const novaQuadra = {
      nome: "Quadra Society Principal",
      modalidade: "Futebol",
      localizacao: "Praça Central",
    };

    const response = await request(app)
      .post("/quadras")
      .send(novaQuadra);

    expect([200, 201]).toContain(response.status);
    expect(response.body).toHaveProperty("id");
    expect(response.body.nome).toBe(novaQuadra.nome);
    expect(response.body.modalidade).toBe(novaQuadra.modalidade);

    quadraCriadaId = response.body.id;
  });

  it("Deve retornar a lista de quadras cadastradas (GET /quadras)", async () => {
    const response = await request(app).get("/quadras");

    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
  });

  it("Deve verificar se a quadra cadastrada realmente foi salva no banco de dados", async () => {
    const response = await request(app).get("/quadras");

    expect(response.status).toBe(200);
    // Procura dentro da lista geral a quadra com o mesmo ID que criamos no primeiro teste
    const quadraEncontrada = response.body.find((q) => q.id === quadraCriadaId);
    expect(quadraEncontrada).toBeDefined();
    expect(quadraEncontrada.nome).toBe("Quadra Society Principal");
  });
});
