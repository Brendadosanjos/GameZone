import express from "express"

import cupomController from "../controllers/cupom.controller.js"

const route = express.Router()

route.get("/", cupomController.listarTodos)
route.get("/:id", cupomController.listaPorId)
route.post("/", cupomController.criarCupom)
route.put("/:id", cupomController.atualizarCupom)
route.delete("/:id", cupomController.deletarCupom)


export default route