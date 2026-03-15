import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const listarTodos = async () => prisma.jogo.findMany();
const listaPorId = async (id) => prisma.jogo.findUnique({ where: { id: Number(id) } });
const criarJogo = async (data) => prisma.jogo.create({ data });
const atualizarJogo = async (id, data) => prisma.jogo.update({ where: { id: Number(id) }, data });
const deletarJogo = async (id) => prisma.jogo.delete({ where: { id: Number(id) } });

export default { listarTodos, listaPorId, criarJogo, atualizarJogo, deletarJogo };
