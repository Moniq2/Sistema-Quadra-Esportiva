const { prisma } = require('../../server');

async function criarJogador(dados) {
    const { nome, email, telefone } = dados;

    if (!nome || nome.trim() === "") {
        throw new Error("Nome é obrigatório.");
    }

    if (!email || email.trim() === "") {
        throw new Error("Email é obrigatório.");
    }

    if (!telefone || telefone.trim() === "") {
        throw new Error("Telefone é obrigatório.");
    }

    const telefoneLimpo = telefone.replace(/\D/g, "");

    return await prisma.jogador.create({
        data: {
            nome,
            email,
            telefone: telefoneLimpo
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

