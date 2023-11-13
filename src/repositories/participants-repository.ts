import prisma from "../database/index";
import { Participant, ParticipantCreate } from "../protocols/index";

export async function getAll() {
    const result: Participant[]  = await prisma.participant.findMany()
    return result;
}

export async function create(participant: ParticipantCreate) {
    const result: Participant = await prisma.participant.create({
        data: {
            ...participant,
            createdAt: new Date(),
            updatedAt: new Date(),
        },
    });
    return result;
}

export async function getById(id: number) {
    const result: Participant  = await prisma.participant.findUnique({ where: { id } })
    return result;
}

export async function update(balance: number, id: number){
    await prisma.participant.update({ data:{ balance: balance }, where: { id } })
}