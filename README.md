# TMJ — Todo Mundo Joga

O **TMJ** é uma aplicação web para gerenciamento de quadras esportivas, jogadores e reservas. O projeto nasceu para substituir agendas informais, cadernos e conflitos de horário por uma experiência simples, visual e acessível.

Mais do que organizar quadras, o TMJ busca incentivar a prática esportiva e aproximar pessoas da comunidade.

## Funcionalidades

### Área pública

- Landing page responsiva com apresentação do produto e modalidades esportivas.
- Demonstração dos benefícios para jogadores e gestores.
- Planos mensais e anuais com comparação de valores.
- Visão de futuro: partidas abertas à comunidade e replays por câmeras.
- Cadastro e login de jogadores.

### Área do jogador

- Dashboard com resumo pessoal.
- Consulta e filtro de quadras por modalidade e localização.
- Agenda carregada automaticamente por quadra e data.
- Seleção de horários em intervalos de 15 minutos.
- Identificação visual de horários livres, selecionados e ocupados.
- Criação, edição e cancelamento de reservas.
- Visualização das próprias reservas.
- Bloqueio de conflitos, datas passadas e horários passados.

### Área administrativa

- Dashboard com indicadores de jogadores, quadras e reservas.
- CRUD de jogadores.
- CRUD de quadras.
- Gerenciamento completo das reservas.
- Filtros por modalidade e localização.
- Sidebar responsiva e minimizável.

## Visão de futuro

As próximas evoluções propostas para o produto incluem:

- Reservas públicas ou particulares.
- Jogos e atividades abertas para a comunidade.
- Limite de participantes e entrada por convite.
- Link compartilhável para partidas.
- Integração com câmeras das arenas.
- Replays e clipes de jogadas para redes sociais.

Essas funcionalidades aparecem no pitch do produto, mas **ainda não fazem parte da versão funcional atual**.

## Tecnologias

### Frontend

- React 19
- React Router
- Vite
- Tailwind CSS
- DaisyUI
- Axios

### Backend

- Node.js
- Express
- Prisma ORM
- PostgreSQL
- Jest e Supertest

## Estrutura do projeto

```text
Sistema-Quadra-Esportiva/
├── frontend/              # Aplicação React
│   ├── public/
│   └── src/
│       ├── auth/
│       ├── components/
│       ├── layouts/
│       ├── pages/
│       ├── routes/
│       ├── services/
│       └── styles/
├── prisma/                # Schema e migrations
├── src/
│   ├── controllers/
│   ├── routes/
│   └── services/
├── tests/                 # Testes de integração da API
└── server.js              # Entrada do backend
```

## Pré-requisitos

- Node.js em versão recente compatível com Vite 8.
- npm.
- PostgreSQL em execução.
- Um banco de dados criado para o projeto.

## Configuração do backend

Na raiz do projeto, instale as dependências:

```bash
npm install
```

Crie um arquivo `.env` na raiz:

```env
DATABASE_URL="postgresql://usuario:senha@localhost:5432/tmj"
PORT=3000
```

Gere o Prisma Client e aplique as migrations:

```bash
npx prisma generate
npx prisma migrate deploy
```

Inicie a API:

```bash
node server.js
```

A API ficará disponível em:

```text
http://localhost:3000
```

Para verificar a conexão com o banco:

```text
GET http://localhost:3000/teste-conexao
```

## Configuração do frontend

Em outro terminal:

```bash
cd frontend
npm install
npm run dev
```

Abra:

```text
http://localhost:5173
```

Para permitir acesso por um celular conectado à mesma rede:

```bash
npm run dev -- --host
```

O frontend utiliza automaticamente o host atual para acessar a API na porta `3000`. Em ambientes publicados, a URL pode ser definida por:

```env
VITE_API_URL="https://api.exemplo.com"
```

## Rotas do frontend

### Públicas

- `/` — landing page
- `/login` — acesso à aplicação
- `/cadastro` — cadastro de jogador

### Jogador

- `/inicio` — dashboard
- `/quadras` — quadras disponíveis
- `/reservas` — agenda e novo agendamento
- `/minhas-reservas` — reservas do jogador

### Administração

- `/admin` — dashboard administrativo
- `/admin/jogadores` — gerenciamento de jogadores
- `/admin/quadras` — gerenciamento de quadras
- `/admin/reservas` — gerenciamento de reservas

## Endpoints principais

```text
/jogadores
/quadras
/reservas
/reservas/agenda
```

Jogadores, quadras e reservas possuem operações de criação, leitura, atualização e exclusão.

## Acesso demonstrativo

Na tela de login, durante o desenvolvimento, estão disponíveis os botões:

- **Entrar como jogador**
- **Entrar como administrador**

O perfil de jogador utiliza um jogador existente no banco. Caso ainda não exista nenhum, cadastre um jogador primeiro.

> A autenticação por JWT não faz parte desta versão. A separação atual de perfis facilita a demonstração das interfaces, mas não substitui autorização segura no backend.

## Validação do frontend

Dentro de `frontend`:

```bash
npm run lint
npm run build
```

## Testes do backend

> **Atenção:** os testes de integração atuais removem os jogadores, quadras e reservas do banco configurado antes de criar seus próprios dados. Nunca execute os testes usando o banco de desenvolvimento ou produção.

Configure `DATABASE_URL` com um banco exclusivo e descartável para testes. Depois execute:

```bash
npm test -- --runInBand
```

## Modelo de negócio apresentado no pitch

- **Jogador:** gratuito.
- **Gestor de Quadras:** R$ 99,90/mês ou R$ 79,90/mês na contratação anual, mais R$ 20,00 por quadra.
- **TMJ Replay:** plano futuro de R$ 149,90/mês ou R$ 129,90/mês na contratação anual.

Os planos anuais representam economia de R$ 240,00 por ano em relação à contratação mensal.

## Equipe e contribuições

- **Paulo:** landing page, identidade visual, responsividade, dashboards, layouts, integração dos módulos e material de apresentação.
- **Monique:** componentes globais, login, cadastro e módulo de jogadores.
- **Rodney:** configuração inicial do frontend, Tailwind, DaisyUI e módulo de quadras.
- **Rafael:** módulo de reservas, agenda, tratamento de conflitos e integração com os endpoints de reservas.

## Repositório

[github.com/Moniq2/Sistema-Quadra-Esportiva](https://github.com/Moniq2/Sistema-Quadra-Esportiva)

Projeto desenvolvido no Bootcamp Atlântico Avanti — Desenvolvimento Full Stack Básico, turma DFS 2026.2.
