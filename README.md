# 🎮 GameZone

Plataforma de jogos digitais desenvolvida como projeto acadêmico para a disciplina de **Desenvolvimento de Software em Nuvem** — ADS / IA EAD — Unifor.

## 🔗 Links

| Recurso | URL |
|---|---|
| 🌐 Frontend | [game-zone-nckmq1m55-brendadosanjos-projects.vercel.app](https://game-zone-nckmq1m55-brendadosanjos-projects.vercel.app) |
| ⚙️ Backend API | [gamezone-production-ed79.up.railway.app](https://gamezone-production-ed79.up.railway.app) |
| 📄 Swagger | [gamezone-production-ed79.up.railway.app/api-docs](https://gamezone-production-ed79.up.railway.app/api-docs) |
| 📁 Repositório | [github.com/Brendadosanjos/GameZone](https://github.com/Brendadosanjos/GameZone) |

---

## 📋 Sobre o Projeto

O GameZone é uma loja de jogos digitais com sistema de autenticação, carrinho de compras, histórico de pedidos e plano de assinatura Premium. A aplicação utiliza arquitetura híbrida em nuvem: Firebase para dados em tempo real no frontend e uma API REST containerizada para o backend.

### Funcionalidades

- 🔐 Autenticação com Firebase Auth (login, cadastro, logout)
- 🎮 Catálogo de jogos com filtros por console, categoria e busca
- 🛒 Carrinho de compras persistido por usuário
- 💳 Checkout com cartão, PIX e boleto
- 📦 Histórico de pedidos em tempo real
- ⭐ Assinatura Premium com jogo gratuito do mês
- 👤 Edição de perfil (nome, e-mail e senha)
- 📄 API REST documentada com Swagger
- 🐳 Backend containerizado com Docker

---

## 🏗️ Arquitetura

```
┌─────────────────────────────────────────────────────┐
│                   USUÁRIO (Browser)                  │
└────────────────────────┬────────────────────────────┘
                         │ HTTPS
┌────────────────────────▼────────────────────────────┐
│           FRONTEND — React + Vite                    │
│           Deploy: Vercel                             │
└───────────┬────────────────────────┬────────────────┘
            │ Firebase SDK           │ REST API
┌───────────▼──────────┐  ┌─────────▼──────────────────┐
│ FIREBASE             │  │ BACKEND — Node.js + Express │
│ Auth + Firestore     │  │ Deploy: Railway             │
│ Google Cloud (BaaS)  │  │ Docker Container            │
└──────────────────────┘  └─────────┬──────────────────┘
                                    │
                          ┌─────────▼──────────────────┐
                          │ PostgreSQL (Railway)        │
                          └────────────────────────────┘
                                    │
┌───────────────────────────────────▼────────────────────┐
│              CI/CD — GitHub Actions                     │
│              Build → Testes → Deploy (Vercel)           │
└────────────────────────────────────────────────────────┘
```

---

## 📁 Estrutura do Repositório

```
GameZone/
├── frontend/          # Aplicação React + Vite
│   ├── src/
│   │   ├── Components/
│   │   ├── Context/
│   │   ├── Pages/
│   │   └── firebase.js
│   ├── .env.example
│   └── package.json
├── backend/           # API REST Node.js
│   ├── prisma/
│   ├── src/
│   │   ├── controllers/
│   │   ├── routes/
│   │   └── services/
│   ├── Dockerfile
│   ├── app.js
│   └── package.json
├── docker-compose.yml
└── .github/
    └── workflows/     # CI/CD GitHub Actions
```

---

## 🚀 Como Rodar Localmente

### Pré-requisitos

- Node.js 20+
- Docker e Docker Compose
- Conta no Firebase

### Frontend

```bash
cd frontend
npm install
cp .env.example .env
# Preencha as variáveis do Firebase no .env
npm run dev
```

### Backend (com Docker)

```bash
docker-compose up --build
```

A API estará disponível em `http://localhost:3000` e o Swagger em `http://localhost:3000/api-docs`.

---

## 🛠️ Tecnologias

**Frontend:** React, Vite, Tailwind CSS, Bootstrap, Firebase Auth, Firestore

**Backend:** Node.js, Express, Prisma, PostgreSQL, Swagger UI, Docker

**DevOps:** GitHub Actions, Vercel, Railway, Docker Compose

---

*Unifor — ADS / IA EAD — 2026*