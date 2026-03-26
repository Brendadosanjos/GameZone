# 🎮 GameZone — Backend

API REST da plataforma GameZone. Construída com Node.js + Express + Prisma + PostgreSQL, containerizada com Docker e deployada no Railway.

---

## 🔗 Links

| Recurso | URL |
|---|---|
| 🌐 API | [gamezone-production-ed79.up.railway.app](https://gamezone-production-ed79.up.railway.app) |
| 📄 Swagger | [gamezone-production-ed79.up.railway.app/api-docs](https://gamezone-production-ed79.up.railway.app/api-docs) |

---

## 🛠️ Tecnologias

| Tecnologia | Uso |
|---|---|
| Node.js 20 | Runtime JavaScript |
| Express | Framework HTTP |
| Prisma ORM | Mapeamento objeto-relacional |
| PostgreSQL | Banco de dados relacional |
| Swagger UI Express | Documentação interativa da API |
| Docker | Containerização |
| Docker Compose | Orquestração de containers |

---

## 📁 Estrutura

```
backend/
├── prisma/
│   ├── schema.prisma          # Modelos do banco de dados
│   └── migrations/            # Histórico de migrations
├── src/
│   ├── controllers/           # Lógica de requisição/resposta
│   │   ├── usuario.controller.js
│   │   ├── jogo.controller.js
│   │   ├── pedido.controller.js
│   │   └── assinatura.controller.js
│   ├── routes/                # Definição das rotas
│   │   ├── usuario.router.js
│   │   ├── jogo.router.js
│   │   ├── pedido.router.js
│   │   └── assinatura.router.js
│   └── services/              # Acesso ao banco via Prisma
│       ├── usuario.service.js
│       ├── jogo.service.js
│       ├── pedido.service.js
│       └── assinatura.service.js
├── logs/                      # Logs gerados em runtime
│   ├── access.log             # Log de todas as requisições
│   └── error.log              # Log de erros internos
├── app.js                     # Entry point + Swagger
├── Dockerfile
├── .dockerignore
└── package.json
```

---

## 📄 Endpoints da API

| Método | Rota | Descrição |
|---|---|---|
| GET | /usuarios | Listar usuários |
| POST | /usuarios | Criar usuário |
| GET | /usuarios/:id | Buscar por ID |
| PUT | /usuarios/:id | Atualizar usuário |
| DELETE | /usuarios/:id | Deletar usuário |
| GET | /jogos | Listar jogos |
| POST | /jogos | Criar jogo |
| GET | /jogos/:id | Buscar por ID |
| PUT | /jogos/:id | Atualizar jogo |
| DELETE | /jogos/:id | Deletar jogo |
| GET | /pedidos | Listar pedidos |
| POST | /pedidos | Criar pedido |
| GET | /pedidos/:id | Buscar por ID |
| PUT | /pedidos/:id | Atualizar pedido |
| DELETE | /pedidos/:id | Deletar pedido |
| GET | /assinaturas | Listar assinaturas |
| POST | /assinaturas | Criar assinatura |
| GET | /assinaturas/:id | Buscar por ID |
| PUT | /assinaturas/:id | Atualizar assinatura |
| DELETE | /assinaturas/:id | Cancelar assinatura |

A documentação completa e interativa está disponível em `/api-docs`.

---

## ⚙️ Configuração

### Variáveis de ambiente

Crie um arquivo `.env` na raiz da pasta `backend`:

```env
DATABASE_URL=postgresql://usuario:senha@host:5432/gamezone
```

---

## 🐳 Rodando com Docker

### Subir todos os serviços (banco + backend)

```bash
docker-compose up --build
```

A API estará disponível em `http://localhost:3000`.
O Swagger estará em `http://localhost:3000/api-docs`.

### Parar os serviços

```bash
docker-compose down
```

### Rodar migrations manualmente (fora do Docker)

```bash
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/gamezone" npx prisma migrate dev --name nome_da_migration
```

---

## 📋 Logs

O backend registra automaticamente dois tipos de log na pasta `logs/`:

- **access.log** — todas as requisições com método, rota e status code
- **error.log** — erros internos com detalhes da exceção

Exemplo de entrada no access.log:
```
[2026-03-15T22:00:00.000Z] GET /jogos - 200
[2026-03-15T22:00:01.000Z] POST /usuarios - 201
```

---

## 🚀 Deploy — Railway

O backend é deployado automaticamente no Railway a cada push na branch `main`. O Railway utiliza o `Dockerfile` na pasta `backend` para buildar e subir o container.

**Configuração necessária no Railway:**
- Root Directory: `backend`
- Variável de ambiente: `DATABASE_URL`