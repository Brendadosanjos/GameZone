import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const listarTodos = async () => prisma.pedido.findMany({ include: { items: true } });
const listaPorId = async (id) => prisma.pedido.findUnique({ where: { id: Number(id) }, include: { items: true } });
const criarPedido = async (data) => prisma.pedido.create({ data });
const atualizarPedido = async (id, data) => prisma.pedido.update({ where: { id: Number(id) }, data });
const deletarPedido = async (id) => prisma.pedido.delete({ where: { id: Number(id) } });

export default { listarTodos, listaPorId, criarPedido, atualizarPedido, deletarPedido };
