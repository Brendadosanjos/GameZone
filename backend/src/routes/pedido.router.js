import express from "express";
import pedidoController from "../controllers/pedido.controller.js";
const route = express.Router();
route.get("/", pedidoController.listarTodos);
route.get("/:id", pedidoController.listaPorId);
route.post("/", pedidoController.criarPedido);
route.put("/:id", pedidoController.atualizarPedido);
route.delete("/:id", pedidoController.deletarPedido);
export default route;
