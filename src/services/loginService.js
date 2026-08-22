require("dotenv/config");

const { PrismaClient } = require("@prisma/client");
const { PrismaPg } = require("@prisma/adapter-pg");
const bcrypt = require("bcrypt");

const adapter = new PrismaPg({
    connectionString: process.env.DATABASE_URL
});

const prisma = new PrismaClient({
    adapter
});

async function fazerLogin(email, senha) {

    if (!email || email.trim() === "") {
        throw new Error("Email é obrigatório.");
    }

    if (!senha || senha.trim() === "") {
        throw new Error("Senha é obrigatória.");
    }

    const jogador = await prisma.jogador.findUnique({
        where: {
            email: email
        }
    });

    if (!jogador) {
        throw new Error("Email ou senha inválidos.");
    }

    if (!jogador.senha) {
        throw new Error("Usuário não possui senha cadastrada.");
    }

    const senhaCorreta = await bcrypt.compare(
        senha,
        jogador.senha
    );

    if (!senhaCorreta) {
        throw new Error("Email ou senha inválidos.");
    }

    return {
        id: jogador.id,
        nome: jogador.nome,
        email: jogador.email,
        tipo: jogador.tipo
    };
}

module.exports = {
    fazerLogin
};