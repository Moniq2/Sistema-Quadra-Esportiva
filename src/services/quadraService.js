const { PrismaClient } = require('@prisma/client');
const { PrismaPg } = require('@prisma/adapter-pg');
const { Pool } = require('pg');

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function criarQuadra(dados) {
    return await prisma.quadra.create({ data: dados });
}

async function listarQuadras() {
    return await prisma.quadra.findMany();
}

async function atualizarQuadra(id, dados) {
    return await prisma.quadra.update({
        where: { id: Number(id) },
        data: dados,
    });
}

async function deletarQuadra(id) {
    return await prisma.quadra.delete({
        where: { id: Number(id) },
    });
}

module.exports = {
    criarQuadra,
    listarQuadras,
    atualizarQuadra,
    deletarQuadra,
};