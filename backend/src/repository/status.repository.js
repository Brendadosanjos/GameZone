import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient

const listarTodos = async (req, res) => {
    return await prisma.status.findMany()
}

const listaPorId = async (id) => { 
    
    return await prisma.status.findUnique({ where: { id: Number(id) } })
}

const criarStatus = async ({ nome }) => {
    return await prisma.status.create({
        data: {
            nome
        }
    })
}

const atualizarStatus = async (id, { nome }) => {
    return await prisma.status.update({
        where: { id: Number(id) }, data: {
            nome
        }
    })
}

const deletarStatus = async (id) => {
    return await prisma.status.delete({ where: { id: Number(id) } })
}


export default { listaPorId, listarTodos, atualizarStatus, criarStatus, deletarStatus }