import express from "express";
import usuarioController from "../controllers/usuario.controller.js";
const route = express.Router();
route.get("/", usuarioController.listarTodos);
route.get("/:id", usuarioController.listaPorId);
route.post("/", usuarioController.criarUsuario);
route.put("/:id", usuarioController.atualizarUsuario);
route.delete("/:id", usuarioController.deletarUsuario);
export default route;
