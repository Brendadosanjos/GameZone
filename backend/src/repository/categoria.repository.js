import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient

const listarTodos = async (req, res) => {
    return await prisma.categoria.findMany()
}

const listaPorId = async (id) => {
    return await prisma.categoria.findUnique({ where: { id: Number(id) } })
}

const criarCategoria = async ({ descricao }) => {
    return await prisma.categoria.create({
        data: {
            descricao
        }
    })
}

const atualizarCategoria = async (id, { descricao }) => {
    return await prisma.categoria.update({
        where: { id: Number(id) }, data: {
            descricao
        }
    })
}

const deletarCategoria = async (id) => {
    return await prisma.categoria.delete({ where: { id: Number(id) } })
}


export default { listaPorId, listarTodos, atualizarCategoria, criarCategoria, deletarCategoria }