# Betting API 📈 ⚽

A RESTful API for managing sports betting pools. Participants can register with a wallet balance, place bets on game scores, and receive winnings proportionally when games are finished. A 30% house fee is applied to the total pool before distributing winnings.

## Tech Stack

- **Runtime:** Node.js with TypeScript
- **Framework:** Express
- **Database:** PostgreSQL
- **ORM:** Prisma
- **Testing:** Jest + Supertest

## Prerequisites

- [Node.js](https://nodejs.org/) (v18+)
- [PostgreSQL](https://www.postgresql.org/) (v14+)

## Getting Started

1. Clone the repository:

```bash
git clone https://github.com/rafaelanobre/challenge-betting-api.git
cd challenge-betting-api
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory with your database connection string:

```
DATABASE_URL=postgresql://username:password@localhost:5432/betting_api
```

4. Run database migrations:

```bash
npx prisma migrate dev
```

5. Start the development server:

```bash
npm run dev
```

The server will be available at `http://localhost:5000`.

## Running Tests

1. Create a `.env.test` file with a **separate** database for testing:

```
DATABASE_URL=postgresql://username:password@localhost:5432/betting_api_test
```

2. Run the tests:

```bash
npm run test
```

## API Endpoints

### Participants

| Method | Endpoint        | Description               |
|--------|-----------------|---------------------------|
| GET    | /participants   | List all participants     |
| POST   | /participants   | Create a new participant  |

**POST /participants** — Body:
```json
{
  "name": "John",
  "balance": 10000
}
```
> Balance is in cents. Minimum value is 1000 (R$ 10.00).

### Games

| Method | Endpoint             | Description                          |
|--------|----------------------|--------------------------------------|
| GET    | /games               | List all games                       |
| GET    | /games/:id           | Get a game by ID (includes its bets) |
| POST   | /games               | Create a new game                    |
| POST   | /games/:id/finish    | Finish a game and resolve all bets   |

**POST /games** — Body:
```json
{
  "homeTeamName": "Team A",
  "awayTeamName": "Team B"
}
```

**POST /games/:id/finish** — Body:
```json
{
  "homeTeamScore": 2,
  "awayTeamScore": 1
}
```

### Bets

| Method | Endpoint | Description      |
|--------|----------|------------------|
| POST   | /bets    | Place a new bet  |

**POST /bets** — Body:
```json
{
  "gameId": 1,
  "participantId": 1,
  "homeTeamScore": 2,
  "awayTeamScore": 1,
  "amountBet": 5000
}
```

## Business Rules

- Participants must register with a minimum balance of 1000 cents (R$ 10.00).
- Bets can only be placed on games that haven't been finished yet.
- A bet amount cannot exceed the participant's current balance.
- When a bet is placed, the amount is immediately deducted from the participant's balance.
- When a game is finished, all bets are resolved: winning bets split the total pool (minus a 30% house fee) proportionally to their bet amounts.
