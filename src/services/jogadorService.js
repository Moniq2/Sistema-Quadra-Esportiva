require("dotenv/config");
const { PrismaClient } = require("@prisma/client");
const { PrismaPg } = require("@prisma/adapter-pg");

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

async function criarJogador(dados) {
    const { nome, email, telefone, senha } = dados;

    if (!nome || nome.trim() === "") {
        throw new Error("Nome é obrigatório.");
    }

    if (!email || email.trim() === "") {
        throw new Error("Email é obrigatório.");
    }

    if (!telefone || telefone.trim() === "") {
        throw new Error("Telefone é obrigatório.");
    }

    if (!senha || senha.trim() === "" || senha.length() < 7) {
        throw new Error("Senha é obrigatória.");
    }

    const bcrypt = require("bcrypt");
    const senhaHash = await bcrypt.hash(senha, 10);
    const telefoneLimpo = telefone.replace(/\D/g, "");

    return await prisma.jogador.create({
        data: {
            nome,
            email,
            telefone: telefoneLimpo,
            senha: senhaHash
        }
    });
}

async function listarJogadores() {
    return await prisma.jogador.findMany();

}

async function buscarJogador(id) {
    return await prisma.jogador.findUnique({
        where: {
            id: Number(id)
        }
    });

}

async function atualizarJogador(id, dados) {
    const { nome, email, telefone } = dados;

    const telefoneLimpo = telefone ? telefone.replace(/\D/g, "") : undefined;

    const data = {};
    if (nome !== undefined) data.nome = nome;
    if (email !== undefined) data.email = email;
    if (telefone !== undefined) data.telefone = telefoneLimpo;

    if (Object.keys(data).length === 0) {
        throw new Error("Nenhum dado fornecido para atualizar.");
    }

    return await prisma.jogador.update({
        where: { id: Number(id) },
        data
    });

}

async function excluirJogador(id) {
    return await prisma.jogador.delete({

        where: {
            id: Number(id)
        }

    });

}

module.exports = {
    criarJogador,
    listarJogadores,
    buscarJogador,
    atualizarJogador,
    excluirJogador
};

async function logar(email, senha) {
    return await prisma.jogador.findFirst()
}

