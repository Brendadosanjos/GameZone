import express from "express"

import userControler from "../controllers/user.controler.js"

const route = express.Router()

route.get("/usuario", userControler.listarTodos)
route.get("/usuario/:id", userControler.listaPorId)
route.post("/usuario/criar", userControler.criarUsuario)
route.put("/usuario/atualizar/:id", userControler.atualizarUsuario)
route.delete("/usuario/:id", userControler.deletarUsuario)


export default route