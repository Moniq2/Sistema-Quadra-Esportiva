# 🏆 Sistema de Agendamento de Quadras Esportivas

Aplicação web completa para agendamento de quadras esportivas com validação de conflitos de horário, desenvolvida durante o Bootcamp Avanti.

---

## 📋 Sumário

1. [Visão Geral](#visão-geral)
2. [Distribuição de Tarefas](#distribuição-de-tarefas)
3. [Arquitetura do Projeto](#arquitetura-do-projeto)
4. [Estrutura de Pastas](#estrutura-de-pastas)
5. [Tecnologias Utilizadas](#tecnologias-utilizadas)
6. [Como Executar](#como-executar)
7. [Módulo de Reservas](#módulo-de-reservas)
8. [Endpoints da API](#endpoints-da-api)
9. [Contribuidores](#contribuidores)

---

## 🎯 Visão Geral

Este projeto implementa um sistema completo de agendamento de quadras esportivas com as seguintes funcionalidades:

- ✅ **CRUD Completo** - Criação, leitura, atualização e exclusão de reservas
- ✅ **Validação de Conflitos** - Previne reservas sobrepostas no mesmo horário
- ✅ **Consulta de Agenda** - Visualize horários ocupados e disponíveis
- ✅ **Interface Intuitiva** - Feedback visual com cores (verde/vermelho)
- ✅ **Integração React Router** - Navegação fluida entre páginas
- ✅ **Responsivo** - Funciona em desktop e mobile

---

## 👥 Distribuição de Tarefas

| Membro | Módulo | Status |
|--------|--------|--------|
| **Paulo** | CRUD Reservas (Backend) | ✅ Concluído |
| **Rafael** | Testes, Validação e Frontend de Reservas | ✅ Concluído |
| **Monique** | CRUD Jogadores (Backend) | ✅ Concluído |
| **Rodney** | CRUD Quadras (Backend) | ✅ Concluído |
| **Afonso** | Frontend Quadras (User View) | ✅ Concluído |

---

## 🏗️ Arquitetura do Projeto

### Padrão: Service/Controller/Routes

A aplicação segue uma arquitetura em camadas que separa as responsabilidades:

```
┌─────────────────────────────────────┐
│     Frontend (React Router)          │
│  ├── Reservas.jsx                   │
│  ├── QuadrasUsuario.jsx              │
│  └── App.jsx (Rotas)                 │
└─────────────────┬───────────────────┘
                  │ (Axios)
┌─────────────────▼───────────────────┐
│   Backend (Express)                 │
│  ├── Routes (reservaRoutes.js)      │
│  ├── Controllers (reservaController)│
│  └── Services (reservaService.js)   │
└─────────────────┬───────────────────┘
                  │ (Prisma ORM)
┌─────────────────▼───────────────────┐
│   Database (PostgreSQL)              │
│  ├── tabela reservas                │
│  ├── tabela jogadores               │
│  └── tabela quadras                 │
└─────────────────────────────────────┘
```

### Responsabilidades

- **Services** (`reservaService.js`): Lógica de negócio, validações, acesso ao banco
- **Controllers** (`reservaController.js`): Recebe requisições HTTP, chama services, retorna respostas
- **Routes** (`reservaRoutes.js`): Define endpoints GET, POST, PUT, DELETE

---

## 📁 Estrutura de Pastas

```
Sistema-Quadra-Esportiva/
│
├── src/                               # Backend
│   ├── controllers/
│   │   ├── reservaController.js      # Endpoints de reservas
│   │   ├── jogadorController.js
│   │   └── quadraController.js
│   │
│   ├── services/
│   │   ├── reservaService.js         # Lógica de negócio de reservas
│   │   ├── jogadorService.js
│   │   └── quadraService.js
│   │
│   └── routes/
│       ├── reservaRoutes.js          # Endpoints /reservas
│       ├── jogadorRoutes.js
│       └── quadraRoutes.js
│
├── frontend/                          # Frontend
│   └── src/
│       ├── App.jsx                    # Router principal
│       ├── pages/
│       │   ├── Reservas.jsx           # Interface de Reservas
│       │   ├── Quadras.jsx            # Admin view
│       │   └── QuadrasUsuario.jsx     # User view (botão Reservar)
│       │
│       └── services/
│           └── api.js                 # Cliente Axios
│
├── prisma/
│   ├── schema.prisma                  # Modelo de dados
│   └── migrations/                    # Histórico de migrações
│
├── server.js                          # Servidor Express
├── package.json                       # Dependências
├── .env                               # Variáveis de ambiente
└── README.md                          # Este arquivo
```

### Arquivos Principais do Módulo de Reservas

| Arquivo | Descrição |
|---------|-----------|
| `src/services/reservaService.js` | Lógica: CRUD, validação de conflitos, consulta de agenda |
| `src/controllers/reservaController.js` | Recebe requisições HTTP, chama services, retorna responses |
| `src/routes/reservaRoutes.js` | Define endpoints GET, POST, PUT, DELETE |
| `frontend/src/pages/Reservas.jsx` | Componente React com formulário e tabela |
| `frontend/src/pages/QuadrasUsuario.jsx` | Listagem de quadras com botão "Reservar" |
| `frontend/src/App.jsx` | Configuração de rotas (/, /quadras, /reservas) |

---

## 🛠️ Tecnologias Utilizadas

### Backend
- **Node.js** v18+ - Runtime JavaScript
- **Express.js** v4.18+ - Framework HTTP
- **Prisma ORM** v5.0+ - ORM para banco de dados
- **PostgreSQL** 14+ - Banco de dados relacional
- **pg** v8.0+ - Cliente PostgreSQL

### Frontend
- **React** 18.2+ - Biblioteca UI
- **TypeScript** 5.0+ - Superset JavaScript tipado
- **Vite** 4.0+ - Bundler otimizado
- **React Router** v6.0+ - Roteamento SPA
- **Axios** 1.0+ - Cliente HTTP
- **Tailwind CSS** 3.3+ - Utility CSS
- **DaisyUI** 3.0+ - Componentes UI

---

## 🚀 Como Executar

### Pré-requisitos

```bash
# Verificar versões
node --version  # v18+
npm --version   # v9+
psql --version  # PostgreSQL 14+
```

### Setup Backend

```bash
# 1. Clone e navegue
cd Sistema-Quadra-Esportiva

# 2. Instale dependências
npm install

# 3. Configure .env
# DATABASE_URL="postgresql://user:password@localhost:5432/quadras_esportivas"
# PORT=5000

# 4. Execute migrações do Prisma
npx prisma migrate dev

# 5. Inicie o servidor
npm start
# Servidor em: http://localhost:5000
```

### Setup Frontend

```bash
# 1. Navegue para frontend
cd frontend

# 2. Instale dependências
npm install

# 3. Inicie Vite
npm run dev
# Frontend em: http://localhost:5173
```

### Testes Principais

1. Abra http://localhost:5173
2. Clique em "Reservar Quadra" em qualquer quadra
3. A quadra deve estar pré-selecionada
4. Selecione uma data e clique "Consultar Agenda"
5. Verifique horários ocupados (vermelho) e disponíveis (verde)
6. Clique em um horário disponível para preenchê-lo
7. Selecione um responsável e confirme a reserva
8. Verifique se aparece na tabela "Reservas Agendadas"

---

## 📦 Módulo de Reservas

### Funcionalidades Implementadas

#### 1. **CRUD Completo**
- ✅ Criar nova reserva
- ✅ Listar reservas com filtros
- ✅ Buscar reserva específica
- ✅ Atualizar reserva
- ✅ Excluir reserva

#### 2. **Validação de Conflitos**
- Detecta sobreposição de horários
- Retorna erro 409 (Conflict) se houver conflito
- Impede duplas reservas na mesma quadra/horário

#### 3. **Consulta de Agenda**
- Retorna horários ocupados com nome do responsável
- Retorna horários disponíveis para clique direto
- Funciona com horário de funcionamento (08:00 - 22:00)

#### 4. **Interface Visual**
- Horários ocupados em **VERMELHO** (desabilitados)
- Horários disponíveis em **VERDE** (clicáveis)
- Tabela com todas as reservas
- Botão excluir com confirmação

### Fluxo de Uso

```
┌──────────────────┐
│  /quadras        │ ← Página inicial
│ (QuadrasUsuario) │
└────────┬─────────┘
         │ Clica em "Reservar Quadra"
         ▼
┌──────────────────────┐
│  /reservas           │ ← Quadra pré-selecionada
│  (Reservas.jsx)      │
│                      │
│ 1. Data             │
│ 2. Consultar Agenda │ ← Busca horários
│ 3. Ver ocupados/... │
│ 4. Responsável      │
│ 5. Reservar         │ ← Confirma
└──────────────────────┘
```

---

## 🔌 Endpoints da API

### Base URL
```
http://localhost:5000/reservas
```

### Endpoints

#### 1. Listar Reservas
```
GET /reservas
GET /reservas?quadra_id=1&data=2026-08-21

Response:
{
  "reservas": [
    {
      "id": 1,
      "quadra_id": 1,
      "responsavel_id": 5,
      "data_reserva": "2026-08-21T00:00:00Z",
      "horario_inicio": "1970-01-01T11:00:00Z",
      "horario_fim": "1970-01-01T12:00:00Z",
      "quadra": { "nome": "Quadra Society Principal", ... },
      "responsavel": { "nome": "Carlos Eduardo", ... }
    }
  ]
}
```

#### 2. Consultar Agenda
```
GET /reservas/agenda?quadra_id=1&data=2026-08-21

Response:
{
  "quadra": { "id": 1, "nome": "Quadra Society Principal", ... },
  "data": "2026-08-21",
  "funcionamento": { "inicio": "08:00", "fim": "22:00" },
  "horarios_ocupados": [
    { "reserva_id": 1, "inicio": "11:00", "fim": "12:00", "responsavel": {...} }
  ],
  "horarios_disponiveis": [
    { "inicio": "08:00", "fim": "11:00" },
    { "inicio": "12:00", "fim": "22:00" }
  ]
}
```

#### 3. Buscar Reserva
```
GET /reservas/123

Response:
{
  "id": 123,
  "quadra_id": 1,
  "responsavel_id": 5,
  ...
}
```

#### 4. Criar Reserva
```
POST /reservas

Body:
{
  "quadra_id": 1,
  "responsavel_id": 5,
  "data_reserva": "2026-08-21",
  "horario_inicio": "14:00",
  "horario_fim": "15:00",
  "jogadores_ids": [5, 6, 7]
}

Response: 201 Created
```

#### 5. Atualizar Reserva
```
PUT /reservas/123

Body:
{
  "quadra_id": 1,
  "responsavel_id": 5,
  "data_reserva": "2026-08-22",
  "horario_inicio": "15:00",
  "horario_fim": "16:00",
  "jogadores_ids": []
}

Response: 200 OK
```

#### 6. Excluir Reserva
```
DELETE /reservas/123

Response: 204 No Content
```

---

## 📊 Etapas do Desenvolvimento

### ✅ Etapa 1: Idealização
- Definição de objetivos e arquitetura
- Stack tecnológico decidido
- Divisão de tarefas entre equipe

### ✅ Etapa 2: Backend - CRUD
- Implementação de Services (validação, CRUD)
- Implementação de Controllers (HTTP)
- Criação de Routes (endpoints)

### ✅ Etapa 3: Validação de Conflitos
- Função `verificarConflito()` implementada
- Função `consultarAgenda()` implementada
- Validação de sobreposição de horários

### ✅ Etapa 4: Frontend
- Componente `Reservas.jsx` com 270+ linhas
- Interface com feedback visual (horários em cores)
- Integração com API via Axios

### ✅ Etapa 5: Testes e Validação
- Validação de funcionalidades principais
- Testes de fluxo de reserva
- Confirmação de dados integrados

### ✅ Etapa 6: Integração React Router
- Configuração de rotas em `App.jsx`
- Navegação entre páginas
- Pré-seleção de quadra via navegação
- Fluxo completo: /quadras → /reservas

---

## ⚙️ Configuração

### Horários de Funcionamento
O sistema está configurado para funcionar de **08:00 às 22:00**.

### Formato de Data na API
A API espera e retorna datas em formato ISO 8601:
- Data: `YYYY-MM-DD` (ex: 2026-08-21)
- Hora: `HH:mm` (ex: 14:30)

---

## 👨‍💻 Contribuidores

- **Paulo** - Backend CRUD Reservas
- **Rafael** - Testes, Validação e Frontend
- **Monique** - Backend CRUD Jogadores
- **Rodney** - Backend CRUD Quadras
- **Afonso** - Frontend User View

**Facilitadora**:  Júlia Freitas

**Bootcamp**: Bootcamp Avanti 2026

---

## 📅 Data de Conclusão

21 de agosto de 2026

---

**Desenvolvido com ❤️ durante o Bootcamp Avanti**
