import pedidoService from "../services/pedido.service.js";

const listarTodos = async (req, res) => {
  try {
    const pedidos = await pedidoService.listarTodos();
    res.status(200).send(pedidos);
  } catch (error) {
    res.status(500).send(`Erro na listagem de pedidos: ${error}`);
  }
};

const listaPorId = async (req, res) => {
  try {
    const pedido = await pedidoService.listaPorId(req.params.id);
    res.status(200).send(pedido);
  } catch (error) {
    res.status(500).send(`Erro ao encontrar pedido: ${error}`);
  }
};

const criarPedido = async (req, res) => {
  try {
    const { usuarioId, total, paymentMethod } = req.body;
    if (!usuarioId || isNaN(usuarioId)) return res.status(400).send("O campo 'usuarioId' é obrigatório.");
    if (total === undefined || isNaN(total) || total < 0) return res.status(400).send("O campo 'total' deve ser um número válido.");
    if (!paymentMethod || paymentMethod.trim() === "") return res.status(400).send("O campo 'paymentMethod' é obrigatório.");
    await pedidoService.criarPedido(req.body);
    res.status(201).send("Pedido criado com sucesso!");
  } catch (error) {
    res.status(500).send(`Erro na criação de pedido: ${error}`);
  }
};

const atualizarPedido = async (req, res) => {
  try {
    await pedidoService.atualizarPedido(req.params.id, req.body);
    res.status(200).send("Pedido atualizado com sucesso!");
  } catch (error) {
    res.status(500).send(`Erro na atualização de pedido: ${error}`);
  }
};

const deletarPedido = async (req, res) => {
  try {
    await pedidoService.deletarPedido(req.params.id);
    res.status(200).send("Pedido deletado com sucesso!");
  } catch (error) {
    res.status(500).send(`Erro ao deletar pedido: ${error}`);
  }
};

export default { listarTodos, listaPorId, criarPedido, atualizarPedido, deletarPedido };
