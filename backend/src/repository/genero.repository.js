import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient

const listarTodos = async (req, res) => {
    return await prisma.genero.findMany()
}

const listaPorId = async (id) => { 
    
    return await prisma.genero.findUnique({ where: { id: Number(id) } })
}

const criarGenero = async ({ nome }) => {
    return await prisma.genero.create({
        data: {
            nome
        }
    })
}

const atualizarGenero = async (id, { nome }) => {
    return await prisma.genero.update({
        where: { id: Number(id) }, data: {
            nome
        }
    })
}

const deletarGenero = async (id) => {
    return await prisma.genero.delete({ where: { id: Number(id) } })
}


export default { listaPorId, listarTodos, atualizarGenero, criarGenero, deletarGenero }