
# React Project

Bem-vindo ao projeto! Este documento irá guiá-lo pelos passos necessários para clonar, configurar e executar a aplicação localmente.

## Requisitos

Certifique-se de ter as seguintes ferramentas instaladas no seu ambiente de desenvolvimento:

- [Node.js](https://nodejs.org/) (versão recomendada: LTS)
- [npm](https://www.npmjs.com/)
- [Git](https://git-scm.com/) para clonar o repositório

## Passos para configurar o projeto

1. **Clone o repositório**

   Abra o terminal e execute o seguinte comando:

   ```bash
   git clone <URL_DO_REPOSITORIO>
   ```

   Substitua `<URL_DO_REPOSITORIO>` pelo link do repositório do projeto.

2. **Acesse o diretório do projeto**

   ```bash
   cd <NOME_DO_DIRETORIO>
   ```

   Substitua `<NOME_DO_DIRETORIO>` pelo nome do diretório onde o projeto foi clonado.

3. **Instale as dependências**

   Se você usa `npm`, execute:

   ```bash
   npm install
   ```

5. **Inicie o servidor de desenvolvimento**

   Para iniciar o projeto em modo de desenvolvimento, execute:

   ```bash
   npm run dev
   ```

   O projeto estará disponível no navegador no endereço [http://localhost:5173](http://localhost:5173) (por padrão).


## Estrutura do Projeto

Uma visão geral da estrutura do projeto:

```
.
├── public/             # Arquivos públicos (HTML, imagens, etc.)
├── src/                # Código fonte do projeto
│   ├── Components/     # Componentes reutilizáveis
│   ├── pages/          # Páginas principais
│   └── App.js          # Componente principal
├── package.json        # Gerenciador de dependências
└── README.md           # Este arquivo
```

## Contribuindo

Se você deseja contribuir com este projeto, siga os passos abaixo:

1. Crie uma nova branch:

   ```bash
   git checkout -b minha-feature
   ```

2. Faça suas alterações e adicione os commits:

   ```bash
   git commit -m "Descrição das mudanças"
   ```

3. Envie sua branch para o repositório remoto:

   ```bash
   git push origin minha-feature
   ```

4. Abra um Pull Request no GitHub.
=======
# 🎮 GameZone - Aplicação Web em Nuvem

Projeto desenvolvido como atividade final da disciplina **Desenvolvimento de Software em Nuvem** do curso de **Análise e Desenvolvimento de Sistemas / Inteligência Artificial – UNIFOR**.

A aplicação consiste em um **catálogo de jogos digitais**, permitindo visualizar jogos disponíveis, consultar detalhes e realizar operações de gerenciamento através de uma API REST.

---

# 📌 Objetivo do Projeto

Desenvolver e implantar uma aplicação web utilizando **arquitetura em camadas**, serviços em nuvem, containers e práticas básicas de **DevOps**, garantindo escalabilidade, organização e boas práticas de desenvolvimento.

---

# 🧱 Arquitetura da Aplicação

A aplicação segue o modelo **cliente-servidor**:

Frontend → Interface do usuário  
Backend → API REST responsável pela lógica da aplicação  
Banco de Dados → Armazenamento persistente em PostgreSQL


---


### Divirta-se codando! 🚀

# 🚀 Tecnologias Utilizadas

## Frontend
- React
- Vite
- JavaScript
- CSS

## Backend
- Node.js
- Express
- Prisma ORM

## Banco de Dados
- PostgreSQL

## DevOps e Cloud
- Docker (containerização do backend)
- GitHub (controle de versão)
- Vercel (deploy do frontend)
- Render (deploy do backend)

---

# 🎮 Funcionalidades

### Usuário
- Visualização de catálogo de jogos
- Consulta de detalhes dos jogos
- Filtro por categorias
- Filtro por plataforma


