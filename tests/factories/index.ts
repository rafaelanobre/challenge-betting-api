import prisma from "../../src/database/index";
import { faker } from '@faker-js/faker';

export async function createParticipant(){
    return await prisma.participant.create({
        data:{
            name: faker.person.firstName(),
            balance: faker.number.int({ min: 1000, max: 2147483647 }),
            createdAt: new Date(),
            updatedAt: new Date(),
        }
    })
}

export async function createGame(){
    return await prisma.game.create({
        data:{
            homeTeamName: faker.company.name(),
            awayTeamName: faker.company.name(),
            homeTeamScore: 0,
            awayTeamScore: 0,
            isFinished: false,
            createdAt: new Date(),
            updatedAt: new Date(),
        }
    })
}