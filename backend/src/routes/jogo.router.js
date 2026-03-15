import express from "express";
import jogoController from "../controllers/jogo.controller.js";
const route = express.Router();
route.get("/", jogoController.listarTodos);
route.get("/:id", jogoController.listaPorId);
route.post("/", jogoController.criarJogo);
route.put("/:id", jogoController.atualizarJogo);
route.delete("/:id", jogoController.deletarJogo);
export default route;
