import prisma from "../database/index";
import { Game, GameCreate, GameUpdate, GameWithBets } from "../protocols/index";

export async function getAll() {
    const result: Game[] = await prisma.game.findMany();
    return result;
}

export async function getById(id: number) {
    const result: GameWithBets = await prisma.game.findUnique({
        where: { id },
        include: {bets: true}
    })
    return result;
}

export async function create(game: GameCreate) {
    const result: Game = await prisma.game.create({
        data: {
            homeTeamName: game.homeTeamName,
            awayTeamName: game.awayTeamName,
            homeTeamScore: 0,
            awayTeamScore: 0,
            isFinished: false,
            createdAt: new Date(),
            updatedAt: new Date(),
        }
    })
    return result;
}

export async function update(id: number, score: GameUpdate) {
    const result: Game = await prisma.game.update({
        data: {
            homeTeamScore: score.homeTeamScore,
            awayTeamScore: score.awayTeamScore,
            isFinished: true,
            updatedAt: new Date()
        },
        where:{ id }
    })
    return result;
}