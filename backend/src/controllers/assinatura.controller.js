import assinaturaService from "../services/assinatura.service.js";

const listarTodos = async (req, res) => {
  try {
    const assinaturas = await assinaturaService.listarTodos();
    res.status(200).send(assinaturas);
  } catch (error) {
    res.status(500).send(`Erro na listagem de assinaturas: ${error}`);
  }
};

const listaPorId = async (req, res) => {
  try {
    const assinatura = await assinaturaService.listaPorId(req.params.id);
    res.status(200).send(assinatura);
  } catch (error) {
    res.status(500).send(`Erro ao encontrar assinatura: ${error}`);
  }
};

const criarAssinatura = async (req, res) => {
  try {
    const { usuarioId, plan, status, startDate, endDate, paymentMethod } = req.body;
    if (!usuarioId || isNaN(usuarioId)) return res.status(400).send("O campo 'usuarioId' é obrigatório.");
    if (!plan || plan.trim() === "") return res.status(400).send("O campo 'plan' é obrigatório.");
    if (!status || status.trim() === "") return res.status(400).send("O campo 'status' é obrigatório.");
    if (!startDate) return res.status(400).send("O campo 'startDate' é obrigatório.");
    if (!endDate) return res.status(400).send("O campo 'endDate' é obrigatório.");
    if (!paymentMethod || paymentMethod.trim() === "") return res.status(400).send("O campo 'paymentMethod' é obrigatório.");
    await assinaturaService.criarAssinatura(req.body);
    res.status(201).send("Assinatura criada com sucesso!");
  } catch (error) {
    res.status(500).send(`Erro na criação de assinatura: ${error}`);
  }
};

const atualizarAssinatura = async (req, res) => {
  try {
    await assinaturaService.atualizarAssinatura(req.params.id, req.body);
    res.status(200).send("Assinatura atualizada com sucesso!");
  } catch (error) {
    res.status(500).send(`Erro na atualização de assinatura: ${error}`);
  }
};

const deletarAssinatura = async (req, res) => {
  try {
    await assinaturaService.deletarAssinatura(req.params.id);
    res.status(200).send("Assinatura cancelada com sucesso!");
  } catch (error) {
    res.status(500).send(`Erro ao cancelar assinatura: ${error}`);
  }
};

export default { listarTodos, listaPorId, criarAssinatura, atualizarAssinatura, deletarAssinatura };
