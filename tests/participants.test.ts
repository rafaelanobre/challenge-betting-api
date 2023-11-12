import supertest from "supertest";
import { faker } from '@faker-js/faker';
import app from "../src/app";
import prisma from "../src/database/index";
import { createParticipant } from "./factories/index";
import { ParticipantCreate } from "../src/protocols/index";

const api = supertest(app);

describe("Participants test", () => {
    beforeEach(async () =>{
        await prisma.participant.deleteMany();
    });

    it("GET: should return all the participants and status 200", async () => {
        await createParticipant();
        await createParticipant();

        const {status, body} = await api.get('/participants');
        expect(status).toBe(200);
        expect(body).toHaveLength(2);
    });

    it("POST: should create a participants and return status 201", async () => {
        const participant: ParticipantCreate = {
            name: faker.person.firstName(),
            balance: faker.number.int({ min: 1000, max: 2147483647 }),
        };

        const {status, body} = await api.post('/participants').send(participant);
        expect(status).toBe(201);
        expect(body.name).toBe(participant.name);
        expect(body.balance).toBe(participant.balance);
    });

    it("POST: should return invalid data error when creating a participant without name", async () => {
        const participant: ParticipantCreate = {
            name: "",
            balance: faker.number.int({ min: 1000, max: 2147483647 }),
        };
    
        const { status } = await api.post('/participants').send(participant);
        expect(status).toBe(422);
    });

    it("POST: should return invalid data error when creating a participant without balance", async () => {
        const participant = {
            name: faker.person.firstName(),
        };
    
        const { status } = await api.post('/participants').send(participant);
        expect(status).toBe(422);
    });

    it("POST: should return invalid data error when creating a participant with a balance minor than 1000", async () => {
        const participant: ParticipantCreate = {
            name: faker.person.firstName(),
            balance: faker.number.int({ max: 999 }),
        };

        const {status, text} = await api.post('/participants').send(participant);
        expect(status).toBe(422);
        expect(text).toBe("Invalid data: Balance must be R$10,00 or greater");
    });
});