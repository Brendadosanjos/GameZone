import express from "express"

import promocaoControler from "../controllers/promocao.controller.js"

const route = express.Router()

route.get("/", promocaoControler.listarTodos)
route.get("/:id", promocaoControler.listaPorId)
route.post("/", promocaoControler.criarPromocao)
route.put("/:id", promocaoControler.atualizarPromocao)
route.delete("/:id", promocaoControler.deletarPromocao)


export default route