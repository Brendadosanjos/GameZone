import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient

const listarTodos = async (req, res) => {
    return await prisma.cupom.findMany()
}

const listaPorId = async (id) => {
    return await prisma.cupom.findUnique({ where: { id: Number(id) } })
}

const criarCupom = async ({ nome,percentagem }) => {
    return await prisma.cupom.create({
        data: {
            nome:nome,
            percentagem:percentagem
        }
    })
}

const atualizarCupom = async (id, { nome,percentagem }) => {
    return await prisma.cupom.update({
        where: { id: Number(id) }, data: {
            nome:nome,
            percentagem:percentagem
        }
    })
}

const deletarCupom = async (id) => {
    return await prisma.cupom.delete({ where: { id: Number(id) } })
}


export default { listaPorId, listarTodos, atualizarCupom, criarCupom, deletarCupom }