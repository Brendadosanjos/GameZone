import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient

const listarTodos = async (req, res) => {
    return await prisma.marca.findMany()
}

const listarPorId = async (id) => {
    return await prisma.marca.findUnique({ where: { id: Number(id) } })
}

const criarMarca = async ({ nome }) => {
    return await prisma.marca.create({
        data: {
            nome
        }
    })
}

const atualizarMarca = async (id, { nome }) => {
    return await prisma.marca.update({
        where: { id: Number(id) }, data: {
            nome
        }
    })
}

const deletarMarca = async (id) => {
    return await prisma.marca.delete({ where: { id: Number(id) } })
}

export default { listarTodos, listarPorId, criarMarca, atualizarMarca, deletarMarca }