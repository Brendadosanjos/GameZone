import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient

const listarTodos = async (req, res) => {
    return await prisma.promocao.findMany()
}

const listaPorId = async (id) => {
    return await prisma.promocao.findUnique({ where: { id: Number(id) } })
}

const criarPromocao = async ({ nome,percentagem }) => {
    return await prisma.promocao.create({
        data: {
            nome,percentagem
        }
    })
}

const atualizarPromocao = async (id, { nome,percentagem }) => {
    return await prisma.promocao.update({
        where: { id: Number(id) }, data: {
            nome,percentagem
        }
    })
}

const deletarPromocao = async (id) => {
    return await prisma.promocao.delete({ where: { id: Number(id) } })
}


export default { listaPorId, listarTodos, atualizarPromocao, criarPromocao, deletarPromocao }