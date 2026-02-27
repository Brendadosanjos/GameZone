import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient

const listarTodos = async (req, res) => {
    return await prisma.estado.findMany()
}

const listaPorId = async (id) => {
    return await prisma.estado.findUnique({ where: { id: Number(id) } })
}

const criarEstado = async ({ nome}) => {
    return await prisma.estado.create({
        data: {
            nome:nome
        }
    })
}

const atualizarEstado = async (id, { nome }) => {
    return await prisma.estado.update({
        where: { id: Number(id) }, data: {
            nome:nome
        }
    })
}

const deletarEstado = async (id) => {
    return await prisma.estado.delete({ where: { id: Number(id) } })
}


export default { listaPorId, listarTodos, atualizarEstado, criarEstado, deletarEstado }