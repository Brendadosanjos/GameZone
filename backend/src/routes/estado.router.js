import express from "express"

import estadoController from "../controllers/estado.controller.js"

const route = express.Router()

route.get("/", estadoController.listarTodos)
route.get("/:id", estadoController.listaPorId)
route.post("/", estadoController.criarEstado)
route.put("/:id", estadoController.atualizarEstado)
route.delete("/:id", estadoController.deletarEstado)


export default route