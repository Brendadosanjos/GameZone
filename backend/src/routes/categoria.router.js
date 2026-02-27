import express from "express"

import categoriaControler from "../controllers/categoria.controller.js"

const route = express.Router()

route.get("/", categoriaControler.listarTodos)
route.get("/:id", categoriaControler.listaPorId)
route.post("/", categoriaControler.criarCategoria)
route.put("/:id", categoriaControler.atualizarCategoria)
route.delete("/:id", categoriaControler.deletarCategoria)


export default route