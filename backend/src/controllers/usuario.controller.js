import usuarioService from "../services/usuario.service.js";

const listarTodos = async (req, res) => {
  try {
    const usuarios = await usuarioService.listarTodos();
    res.status(200).send(usuarios);
  } catch (error) {
    res.status(500).send(`Erro na listagem de usuários: ${error}`);
  }
};

const listaPorId = async (req, res) => {
  try {
    const usuario = await usuarioService.listaPorId(req.params.id);
    res.status(200).send(usuario);
  } catch (error) {
    res.status(500).send(`Erro ao encontrar usuário: ${error}`);
  }
};

const criarUsuario = async (req, res) => {
  try {
    const { name, email } = req.body;
    if (!name || typeof name !== "string" || name.trim() === "")
      return res.status(400).send("O campo 'name' é obrigatório.");
    if (!email || typeof email !== "string" || !email.includes("@"))
      return res.status(400).send("O campo 'email' é obrigatório e deve ser válido.");
    const usuario = await usuarioService.criarUsuario({ name: name.trim(), email: email.trim().toLowerCase(), isSubscriber: req.body.isSubscriber ?? false });
    res.status(201).send("Usuário criado com sucesso!");
  } catch (error) {
    res.status(500).send(`Erro na criação de usuário: ${error}`);
  }
};

const atualizarUsuario = async (req, res) => {
  try {
    const { name, email } = req.body;
    if (name !== undefined && (typeof name !== "string" || name.trim() === ""))
      return res.status(400).send("O campo 'name' deve ser um texto válido.");
    if (email !== undefined && (typeof email !== "string" || !email.includes("@")))
      return res.status(400).send("O campo 'email' deve ser válido.");
    await usuarioService.atualizarUsuario(req.params.id, req.body);
    res.status(200).send("Usuário atualizado com sucesso!");
  } catch (error) {
    res.status(500).send(`Erro na atualização de usuário: ${error}`);
  }
};

const deletarUsuario = async (req, res) => {
  try {
    await usuarioService.deletarUsuario(req.params.id);
    res.status(200).send("Usuário deletado com sucesso!");
  } catch (error) {
    res.status(500).send(`Erro ao deletar usuário: ${error}`);
  }
};

export default { listarTodos, listaPorId, criarUsuario, atualizarUsuario, deletarUsuario };
