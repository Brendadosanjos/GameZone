import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import swaggerUi from "swagger-ui-express";
import usuarioRouter from "./src/routes/usuario.router.js";
import jogoRouter from "./src/routes/jogo.router.js";
import pedidoRouter from "./src/routes/pedido.router.js";
import assinaturaRouter from "./src/routes/assinatura.router.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = 3000;
const app = express();

// ─── Logs ────────────────────────────────────────────────────────────────────
const logsDir = path.join(__dirname, "logs");
if (!fs.existsSync(logsDir)) fs.mkdirSync(logsDir);

function writeLog(filename, message) {
  const timestamp = new Date().toISOString();
  const line = `[${timestamp}] ${message}\n`;
  fs.appendFileSync(path.join(logsDir, filename), line);
}

app.use((req, res, next) => {
  res.on("finish", () => {
    const msg = `${req.method} ${req.originalUrl} - ${res.statusCode}`;
    writeLog("access.log", msg);
    console.log(`[ACCESS] ${msg}`);
  });
  next();
});

// ─── CORS ────────────────────────────────────────────────────────────────────
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");
  res.header("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  if (req.method === "OPTIONS") return res.sendStatus(204);
  next();
});

app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    status: "online",
    api: "GameZone",
    docs: "/api-docs"
  });
});

// ─── Swagger ─────────────────────────────────────────────────────────────────
const swaggerDocument = {
  openapi: "3.0.0",
  info: {
    title: "GameZone API",
    version: "1.0.0",
    description: "API REST da plataforma GameZone — gerenciamento de usuários, jogos, pedidos e assinaturas.",
  },
  servers: [{ url: "http://localhost:3000", description: "Servidor local" }],
  tags: [
    { name: "Usuários" },
    { name: "Jogos" },
    { name: "Pedidos" },
    { name: "Assinaturas" },
  ],
  paths: {
    "/usuarios": {
      get: { tags: ["Usuários"], summary: "Listar todos os usuários", responses: { 200: { description: "Lista de usuários" } } },
      post: {
        tags: ["Usuários"], summary: "Criar usuário",
        requestBody: { required: true, content: { "application/json": { schema: { type: "object", required: ["name", "email"], properties: { name: { type: "string", example: "Brenda Silva" }, email: { type: "string", example: "brenda@email.com" }, isSubscriber: { type: "boolean", example: false } } } } } },
        responses: { 201: { description: "Usuário criado" }, 400: { description: "Dados inválidos" } },
      },
    },
    "/usuarios/{id}": {
      get: { tags: ["Usuários"], summary: "Buscar usuário por ID", parameters: [{ name: "id", in: "path", required: true, schema: { type: "integer" } }], responses: { 200: { description: "Usuário encontrado" }, 404: { description: "Não encontrado" } } },
      put: { tags: ["Usuários"], summary: "Atualizar usuário", parameters: [{ name: "id", in: "path", required: true, schema: { type: "integer" } }], requestBody: { content: { "application/json": { schema: { type: "object", properties: { name: { type: "string" }, email: { type: "string" }, isSubscriber: { type: "boolean" } } } } } }, responses: { 200: { description: "Usuário atualizado" } } },
      delete: { tags: ["Usuários"], summary: "Deletar usuário", parameters: [{ name: "id", in: "path", required: true, schema: { type: "integer" } }], responses: { 200: { description: "Usuário deletado" } } },
    },
    "/jogos": {
      get: { tags: ["Jogos"], summary: "Listar todos os jogos", responses: { 200: { description: "Lista de jogos" } } },
      post: {
        tags: ["Jogos"], summary: "Criar jogo",
        requestBody: { required: true, content: { "application/json": { schema: { type: "object", required: ["title", "category", "console", "description", "imageUrl", "price", "releaseYear", "stock"], properties: { title: { type: "string", example: "God of War Ragnarök" }, category: { type: "string", example: "Ação" }, console: { type: "string", example: "PlayStation" }, description: { type: "string", example: "Jogo de ação e aventura." }, imageUrl: { type: "string", example: "https://exemplo.com/img.jpg" }, price: { type: "number", example: 299.90 }, releaseYear: { type: "integer", example: 2022 }, stock: { type: "integer", example: 10 } } } } } },
        responses: { 201: { description: "Jogo criado" }, 400: { description: "Dados inválidos" } },
      },
    },
    "/jogos/{id}": {
      get: { tags: ["Jogos"], summary: "Buscar jogo por ID", parameters: [{ name: "id", in: "path", required: true, schema: { type: "integer" } }], responses: { 200: { description: "Jogo encontrado" }, 404: { description: "Não encontrado" } } },
      put: { tags: ["Jogos"], summary: "Atualizar jogo", parameters: [{ name: "id", in: "path", required: true, schema: { type: "integer" } }], requestBody: { content: { "application/json": { schema: { type: "object", properties: { title: { type: "string" }, category: { type: "string" }, console: { type: "string" }, price: { type: "number" }, stock: { type: "integer" } } } } } }, responses: { 200: { description: "Jogo atualizado" } } },
      delete: { tags: ["Jogos"], summary: "Deletar jogo", parameters: [{ name: "id", in: "path", required: true, schema: { type: "integer" } }], responses: { 200: { description: "Jogo deletado" } } },
    },
    "/pedidos": {
      get: { tags: ["Pedidos"], summary: "Listar todos os pedidos", responses: { 200: { description: "Lista de pedidos" } } },
      post: {
        tags: ["Pedidos"], summary: "Criar pedido",
        requestBody: { required: true, content: { "application/json": { schema: { type: "object", required: ["usuarioId", "total", "paymentMethod"], properties: { usuarioId: { type: "integer", example: 1 }, total: { type: "number", example: 299.90 }, status: { type: "string", example: "Aguardando entrega" }, paymentMethod: { type: "string", example: "pix" } } } } } },
        responses: { 201: { description: "Pedido criado" }, 400: { description: "Dados inválidos" } },
      },
    },
    "/pedidos/{id}": {
      get: { tags: ["Pedidos"], summary: "Buscar pedido por ID", parameters: [{ name: "id", in: "path", required: true, schema: { type: "integer" } }], responses: { 200: { description: "Pedido encontrado" }, 404: { description: "Não encontrado" } } },
      put: { tags: ["Pedidos"], summary: "Atualizar status do pedido", parameters: [{ name: "id", in: "path", required: true, schema: { type: "integer" } }], requestBody: { content: { "application/json": { schema: { type: "object", properties: { status: { type: "string", example: "Entregue" } } } } } }, responses: { 200: { description: "Pedido atualizado" } } },
      delete: { tags: ["Pedidos"], summary: "Deletar pedido", parameters: [{ name: "id", in: "path", required: true, schema: { type: "integer" } }], responses: { 200: { description: "Pedido deletado" } } },
    },
    "/assinaturas": {
      get: { tags: ["Assinaturas"], summary: "Listar todas as assinaturas", responses: { 200: { description: "Lista de assinaturas" } } },
      post: {
        tags: ["Assinaturas"], summary: "Criar assinatura",
        requestBody: { required: true, content: { "application/json": { schema: { type: "object", required: ["usuarioId", "plan", "status", "startDate", "endDate", "paymentMethod"], properties: { usuarioId: { type: "integer", example: 1 }, plan: { type: "string", example: "premium" }, status: { type: "string", example: "ativo" }, startDate: { type: "string", example: "2026-03-15" }, endDate: { type: "string", example: "2027-03-15" }, paymentMethod: { type: "string", example: "cartao" } } } } } },
        responses: { 201: { description: "Assinatura criada" }, 400: { description: "Dados inválidos" } },
      },
    },
    "/assinaturas/{id}": {
      get: { tags: ["Assinaturas"], summary: "Buscar assinatura por ID", parameters: [{ name: "id", in: "path", required: true, schema: { type: "integer" } }], responses: { 200: { description: "Assinatura encontrada" }, 404: { description: "Não encontrada" } } },
      put: { tags: ["Assinaturas"], summary: "Atualizar assinatura", parameters: [{ name: "id", in: "path", required: true, schema: { type: "integer" } }], requestBody: { content: { "application/json": { schema: { type: "object", properties: { status: { type: "string", example: "cancelado" }, endDate: { type: "string", example: "2026-04-15" } } } } } }, responses: { 200: { description: "Assinatura atualizada" } } },
      delete: { tags: ["Assinaturas"], summary: "Cancelar assinatura", parameters: [{ name: "id", in: "path", required: true, schema: { type: "integer" } }], responses: { 200: { description: "Assinatura cancelada" } } },
    },
  },
};

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// ─── Rotas ───────────────────────────────────────────────────────────────────
app.use("/usuarios",    usuarioRouter);
app.use("/jogos",       jogoRouter);
app.use("/pedidos",     pedidoRouter);
app.use("/assinaturas", assinaturaRouter);

// ─── Log de erro global ───────────────────────────────────────────────────────
app.use((err, req, res, next) => {
  const msg = `${req.method} ${req.originalUrl} - ERRO: ${err.message}`;
  writeLog("error.log", msg);
  console.error(`[ERROR] ${msg}`);
  res.status(500).json({ error: "Erro interno no servidor" });
});

app.listen(PORT, () => {
  console.log(`Aplicacao rodando na porta ${PORT}`);
  console.log(`Swagger disponível em http://localhost:${PORT}/api-docs`);
});