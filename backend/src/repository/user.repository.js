import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient

const listarTodos = async (req, res) => {
    return await prisma.user.findMany()
}

const listaPorId = async (id) => {
    return await prisma.user.findUnique({ where: { id: Number(id) } })
}

const criarUsuario = async ({ nome, cpf, email, celular, endereco_id }) => {
    return await prisma.user.create({ data: { nome, cpf, email, celular, endereco_id } })
}

const atualizarUsuario = async (id, { nome, cpf, email, celular, endereco_id }) => {
    return await prisma.user.update({
        where: { id: Number(id) }, data: {
            nome, cpf, email, celular, endereco_id
        }
    })
}

const deletarUsuario = async (id) => {
    return await prisma.user.delete({ where: { id: Number(id) } })
}


export default {listaPorId, listarTodos, atualizarUsuario, criarUsuario, deletarUsuario}