# 🎮 GameZone — Frontend

Aplicação React + Vite da plataforma GameZone. Interface do usuário com autenticação, catálogo de jogos, carrinho, checkout e assinatura Premium.

---

## 🔗 Deploy

**Produção:** [game-zone-nckmq1m55-brendadosanjos-projects.vercel.app](https://game-zone-nckmq1m55-brendadosanjos-projects.vercel.app)

---

## 🛠️ Tecnologias

| Tecnologia | Uso |
|---|---|
| React 18 | Framework principal |
| Vite | Bundler e servidor de desenvolvimento |
| Tailwind CSS | Estilização utilitária |
| Bootstrap | Componentes de UI |
| React Router DOM | Roteamento client-side |
| Firebase Auth | Autenticação de usuários |
| Firebase Firestore | Banco de dados em tempo real |

---

## 📁 Estrutura

```
frontend/
├── public/
│   ├── logo.png
│   └── Buy.png
├── src/
│   ├── Components/
│   │   ├── NavBar.jsx         # Barra de navegação com badge do carrinho
│   │   ├── Footer.jsx
│   │   ├── CartItem.jsx
│   │   └── ProtectedRoute.jsx # Proteção de rotas autenticadas
│   ├── Context/
│   │   └── AuthContext.jsx    # Contexto de autenticação global
│   ├── Pages/
│   │   ├── Home.jsx
│   │   ├── ProductListPage.jsx
│   │   ├── ProductPage.jsx
│   │   ├── Cart.jsx
│   │   ├── Checkout.jsx
│   │   ├── Orders.jsx
│   │   ├── SubscriptionPage.jsx
│   │   ├── CheckoutSubscription.jsx
│   │   ├── CategoryPage.jsx
│   │   ├── EditarPerfil.jsx
│   │   ├── Login.jsx
│   │   ├── Cadastro.jsx
│   │   └── NotFound.jsx
│   ├── Styles/
│   ├── firebase.js            # Configuração do Firebase
│   └── App.jsx                # Rotas da aplicação
├── .env.example
├── index.html
├── package.json
└── vite.config.js
```

---

## ⚙️ Configuração

### 1. Instalar dependências

```bash
npm install
```

### 2. Configurar variáveis de ambiente

Crie um arquivo `.env` na raiz da pasta `frontend` com base no `.env.example`:

```env
VITE_FIREBASE_API_KEY=sua_api_key
VITE_FIREBASE_AUTH_DOMAIN=seu_projeto.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=seu_projeto
VITE_FIREBASE_STORAGE_BUCKET=seu_projeto.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=seu_sender_id
VITE_FIREBASE_APP_ID=seu_app_id
```

### 3. Rodar em desenvolvimento

```bash
npm run dev
```

A aplicação estará disponível em `http://localhost:5173`.

### 4. Build para produção

```bash
npm run build
```

---

## 🔐 Rotas Protegidas

As seguintes rotas requerem autenticação. Usuários não autenticados são redirecionados para `/login`:

- `/carrinho` — Carrinho de compras
- `/pedidos` — Histórico de pedidos
- `/checkout` — Finalização de compra
- `/checkout-assinatura` — Checkout da assinatura Premium
- `/perfil` — Edição de perfil

---

## 🗂️ Coleções Firestore

| Coleção | Campos |
|---|---|
| `users` | userId, name, email, isSubscriber, createdAt |
| `games` | title, category, console, description, imageUrl, price, releaseYear, stock |
| `cart` | userId, gameId, title, price, imageUrl, console, category, quantity |
| `orders` | userId, items[], total, status, paymentMethod, createdAt |
| `subscriptions` | userId, plan, status, startDate, endDate, paymentMethod |

---

## 🚀 Deploy — Vercel

O deploy é feito automaticamente via GitHub Actions a cada push na branch `main`. As variáveis de ambiente do Firebase são configuradas no painel da Vercel.