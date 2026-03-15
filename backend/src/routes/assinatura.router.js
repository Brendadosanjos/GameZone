import express from "express";
import assinaturaController from "../controllers/assinatura.controller.js";
const route = express.Router();
route.get("/", assinaturaController.listarTodos);
route.get("/:id", assinaturaController.listaPorId);
route.post("/", assinaturaController.criarAssinatura);
route.put("/:id", assinaturaController.atualizarAssinatura);
route.delete("/:id", assinaturaController.deletarAssinatura);
export default route;
