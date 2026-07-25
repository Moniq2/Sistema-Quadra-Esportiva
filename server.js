require("dotenv/config");
const express = require("express");
const { PrismaClient } = require("@prisma/client");
const { PrismaPg } = require("@prisma/adapter-pg");

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

// Importar rotas
const jogadorRoutes = require('./src/routes/jogadorRoutes');
const quadraRoutes = require('./src/routes/quadraRoutes');
const reservaRoutes = require('./src/routes/reservaRoutes');

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Servidor rodando!");
});

app.get("/teste-conexao", async (req, res) => {
  try {
    const jogadores = await prisma.jogador.findMany();

    res.json({
      status: "conectado",
      quantidadeJogadores: jogadores.length,
      jogadores,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      status: "erro",
      mensagem: "Falha ao conectar ou consultar o banco de dados",
      detalhe: error.message,
    });
  }
});

// Registrar rotas
app.use("/jogadores", jogadorRoutes);
app.use("/quadras", quadraRoutes);
app.use("/reservas", reservaRoutes);

// Só sobe o servidor na porta se o arquivo for executado diretamente no terminal
// Se for importado pelo Jest, ele não abre a porta e evita travamentos!
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
  });
}

module.exports = { app, prisma };





