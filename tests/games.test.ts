import supertest from "supertest";
import { faker } from '@faker-js/faker';
import app from "../src/app";
import prisma from "../src/database/index";
import { createGame } from "./factories/index";
import { GameCreate, GameUpdate } from "../src/protocols/index";

const api = supertest(app);

describe("Games test", () =>{
    beforeEach(async () =>{
        await prisma.game.deleteMany();
    });

    it("GET: should return all the games and status 200", async () =>{
        await createGame();
        await createGame();

        const {status, body} = await api.get('/games');
        expect(status).toBe(200);
        expect(body).toHaveLength(2);
        expect(body).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    id: expect.any(Number),
                    homeTeamName:  expect.any(String),
                    awayTeamName:  expect.any(String),
                    homeTeamScore: expect.any(Number),
                    awayTeamScore: expect.any(Number),
                    isFinished: expect.any(Boolean),
                    createdAt: expect.stringMatching(/^20\d{2}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/),
                    updatedAt: expect.stringMatching(/^20\d{2}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/),
                })
            ])
        )
    })

    it("GET: should return game by id with bets and return 200", async () =>{
        const game = await createGame();

        const {status, body} = await api.get(`/games/${game.id}`);
        expect(status).toBe(200);
        expect(body).toEqual(
            expect.objectContaining({
                id: game.id,
                homeTeamName:  game.homeTeamName,
                awayTeamName:  game.awayTeamName,
                homeTeamScore: game.homeTeamScore,
                awayTeamScore: game.awayTeamScore,
                isFinished: game.isFinished,
                bets: expect.anything(),
                createdAt: expect.stringMatching(/^20\d{2}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/),
                updatedAt: expect.stringMatching(/^20\d{2}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/),
            })
        )
    })

    it("GET: should return 404 error when id is invalid", async () =>{
        const game = await createGame();

        const {status} = await api.get(`/games/error}`);
        expect(status).toBe(404);
    })

    it("POST: should create a game and return 201", async () =>{
        const game: GameCreate = {
            homeTeamName: faker.company.name(),
            awayTeamName: faker.company.name(),
        };

        const {status, body} = await api.post('/games').send(game);
        expect(status).toBe(201);
        expect(body).toEqual(
            expect.objectContaining({
                homeTeamName: game.homeTeamName,
                awayTeamName: game.awayTeamName,
                isFinished: false,
                homeTeamScore: 0,
                awayTeamScore: 0,
            })
        );
    })

    it("POST: should finish the game and return 200", async () =>{
        const game = await createGame();
        const score: GameUpdate = {
            homeTeamScore: faker.number.int({max: 100}),
            awayTeamScore: faker.number.int({max: 100})
        };

        const {status, body} = await api.post(`/games/${game.id}/finish`).send(score);
        expect(status).toBe(200);
        expect(body).toEqual(
            expect.objectContaining({
                isFinished: true,
                homeTeamScore: score.homeTeamScore,
                awayTeamScore: score.awayTeamScore,
            })
        );
    })

    it("POST: should return conflict error when trying to finish a game that is alredy finished", async () =>{
        const game = await createGame();
        const score: GameUpdate = {
            homeTeamScore: faker.number.int({max: 100}),
            awayTeamScore: faker.number.int({max: 100})
        };
        
        await api.post(`/games/${game.id}/finish`).send(score);

        const {status, text} = await api.post(`/games/${game.id}/finish`).send(score);
        expect(status).toBe(409);
        expect(text).toBe("Conflict, you cannot do this");
    })

    it("POST: should return 404 error when id is invalid", async () =>{
        const game = await createGame();
        const score: GameUpdate = {
            homeTeamScore: faker.number.int({max: 100}),
            awayTeamScore: faker.number.int({max: 100})
        };

        const {status} = await api.post(`/games/-1/finish}`).send(score);
        expect(status).toBe(404);
    })
})