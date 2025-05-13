# Desafio Jazida - Backend Pokémons

## Pré-requisitos
- Docker e Docker Compose instalados
- Node.js e npm instalados

## 1. Suba o banco de dados PostgreSQL

```bash
docker-compose up -d
```

O banco estará disponível em `localhost:5432` (ou `db:5432` dentro do Docker).

## 2. Instale as dependências do projeto

```bash
npm install
```

## 3. Rode as migrations para criar a tabela de pokémons

```bash
npx sequelize-cli db:migrate
```

## 4. Inicie o backend

```bash
npm start
```

## 5. Teste a API

Acesse os endpoints conforme a documentação do desafio (CRUD e batalha de pokémons).

---

- O banco de dados usado é PostgreSQL.
- A configuração do banco está em `config/config.json`.
- As migrations estão na pasta `migrations/`. 