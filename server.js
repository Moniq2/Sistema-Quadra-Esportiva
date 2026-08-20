require("dotenv/config");
const express = require('express');
const cors = require('cors');
const { PrismaClient } = require("@prisma/client");
const { PrismaPg } = require("@prisma/adapter-pg");

// 1. Importar arquivos de rotas
const jogadorRoutes = require('./src/routes/jogadorRoutes');
const quadraRoutes = require('./src/routes/quadraRoutes');
const reservaRoutes = require('./src/routes/reservaRoutes');

const app = express();

// 2. Middlewares globais (CORS e leitor de JSON)
app.use(cors());
app.use(express.json());

// 3. Configuração do Prisma
const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

const PORT = process.env.PORT || 3000;

// 4. Rotas de teste
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

// 5. Registrar rotas do sistema
app.use("/jogadores", jogadorRoutes);
app.use("/quadras", quadraRoutes);
app.use("/reservas", reservaRoutes);

// 6. Inicialização do servidor
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
  });
}

module.exports = { app, prisma };