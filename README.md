
# Betting API 📈 ⚽

Uma API para gerenciar bolões de apostas em jogos esportivos.

## Tecnologias utilizadas
- TypeScript
- Node + Express
- Prisma (ORM)
- PostgreSQL
- Jest e Supertest

## Pré-requisitos
Para rodar esse projeto localmente, você precisa ter instalado o Node e o PostgreSQL na sua máquina.
## Como rodar o projeto
1. Clone o repositório
2. Baixe as dependências do projeto usando o comando:
```
  npm install
```
3. Crie um arquivo .env com base no .env.example para configurar a conexão com o seu banco de dados.
4.  Execute as migrações para criar as tabelas no banco de dados usando:

```
npx prisma migrate dev
```
5. Inicie o servidor de desenvolvimento com o comando:
```
npm run dev
```
## Como rodar os testes

1. Crie um arquivo .env.test com base no .env.example para configurar a conexão com o seu banco de dados, lembre-se de criar um banco de dados diferente do banco de desenvolvimento.
2. Rode os testes com o comando:
```
  npm run test
```

