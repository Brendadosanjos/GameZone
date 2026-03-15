import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const listarTodos = async () => prisma.usuario.findMany();
const listaPorId = async (id) => prisma.usuario.findUnique({ where: { id: Number(id) } });
const criarUsuario = async (data) => prisma.usuario.create({ data });
const atualizarUsuario = async (id, data) => prisma.usuario.update({ where: { id: Number(id) }, data });
const deletarUsuario = async (id) => prisma.usuario.delete({ where: { id: Number(id) } });

export default { listarTodos, listaPorId, criarUsuario, atualizarUsuario, deletarUsuario };
