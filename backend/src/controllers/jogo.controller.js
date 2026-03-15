import jogoService from "../services/jogo.service.js";

const listarTodos = async (req, res) => {
  try {
    const jogos = await jogoService.listarTodos();
    res.status(200).send(jogos);
  } catch (error) {
    res.status(500).send(`Erro na listagem de jogos: ${error}`);
  }
};

const listaPorId = async (req, res) => {
  try {
    const jogo = await jogoService.listaPorId(req.params.id);
    res.status(200).send(jogo);
  } catch (error) {
    res.status(500).send(`Erro ao encontrar jogo: ${error}`);
  }
};

const criarJogo = async (req, res) => {
  try {
    const { title, category, console: plataforma, description, imageUrl, price, releaseYear, stock } = req.body;
    if (!title || title.trim() === "") return res.status(400).send("O campo 'title' é obrigatório.");
    if (!category || category.trim() === "") return res.status(400).send("O campo 'category' é obrigatório.");
    if (!plataforma || plataforma.trim() === "") return res.status(400).send("O campo 'console' é obrigatório.");
    if (!description || description.trim() === "") return res.status(400).send("O campo 'description' é obrigatório.");
    if (!imageUrl || imageUrl.trim() === "") return res.status(400).send("O campo 'imageUrl' é obrigatório.");
    if (price === undefined || isNaN(price) || price < 0) return res.status(400).send("O campo 'price' deve ser um número válido.");
    if (!releaseYear || isNaN(releaseYear)) return res.status(400).send("O campo 'releaseYear' deve ser um ano válido.");
    if (stock === undefined || isNaN(stock) || stock < 0) return res.status(400).send("O campo 'stock' deve ser um número válido.");
    await jogoService.criarJogo(req.body);
    res.status(201).send("Jogo criado com sucesso!");
  } catch (error) {
    res.status(500).send(`Erro na criação de jogo: ${error}`);
  }
};

const atualizarJogo = async (req, res) => {
  try {
    const { price, stock } = req.body;
    if (price !== undefined && (isNaN(price) || price < 0)) return res.status(400).send("O campo 'price' deve ser um número válido.");
    if (stock !== undefined && (isNaN(stock) || stock < 0)) return res.status(400).send("O campo 'stock' deve ser um número válido.");
    await jogoService.atualizarJogo(req.params.id, req.body);
    res.status(200).send("Jogo atualizado com sucesso!");
  } catch (error) {
    res.status(500).send(`Erro na atualização de jogo: ${error}`);
  }
};

const deletarJogo = async (req, res) => {
  try {
    await jogoService.deletarJogo(req.params.id);
    res.status(200).send("Jogo deletado com sucesso!");
  } catch (error) {
    res.status(500).send(`Erro ao deletar jogo: ${error}`);
  }
};

export default { listarTodos, listaPorId, criarJogo, atualizarJogo, deletarJogo };
