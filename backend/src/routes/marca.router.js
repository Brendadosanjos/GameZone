import express from "express";

import marcaController from "../controllers/marca.controller.js";

const route = express.Router();

route.get("/", marcaController.listarTodos)
route.get("/:id", marcaController.listarPorId)
route.post("/criar", marcaController.criarMarca)
route.put("/:id", marcaController.atualizarMarca)
route.delete("/:id", marcaController.deletarMarca)

export default route;