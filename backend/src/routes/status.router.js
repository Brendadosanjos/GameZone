import express from "express"

import statusControler from "../controllers/status.controller.js"

const route = express.Router()

route.get("/", statusControler.listarTodos)
route.get("/:id", statusControler.listaPorId)
route.post("/", statusControler.criarStatus)
route.put("/:id", statusControler.atualizarStatus)
route.delete("/:id", statusControler.deletarStatus)


export default route