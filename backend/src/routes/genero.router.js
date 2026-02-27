import express from "express"

import generoControler from "../controllers/genero.controller.js"

const route = express.Router()

route.get("/", generoControler.listarTodos)
route.get("/:id", generoControler.listaPorId)
route.post("/", generoControler.criarGenero)
route.put("/:id", generoControler.atualizarGenero)
route.delete("/:id", generoControler.deletarGenero)


export default route