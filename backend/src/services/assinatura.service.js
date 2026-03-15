import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

const listarTodos = async () => prisma.assinatura.findMany();
const listaPorId = async (id) => prisma.assinatura.findUnique({ where: { id: Number(id) } });
const criarAssinatura = async (data) => prisma.assinatura.create({ data: { ...data, startDate: new Date(data.startDate), endDate: new Date(data.endDate) } });
const atualizarAssinatura = async (id, data) => prisma.assinatura.update({ where: { id: Number(id) }, data });
const deletarAssinatura = async (id) => prisma.assinatura.delete({ where: { id: Number(id) } });

export default { listarTodos, listaPorId, criarAssinatura, atualizarAssinatura, deletarAssinatura };
