import prisma from "../database/index";
import { Bet, BetCreate, BetResult } from "../protocols/index";

export async function create(bet: BetCreate) {
    const result: Bet = await prisma.bet.create({
        data: {
            gameId: bet.gameId,
            participantId: bet.participantId,
            homeTeamScore: bet.homeTeamScore,
            awayTeamScore: bet.awayTeamScore,
            amountBet: bet.amountBet,
            status: 'PENDING',
            amountWon: null,
            createdAt: new Date(),
            updatedAt: new Date(),
        }
    })
    return result;
}

export async function update(id: number, result: BetResult,) {
    await prisma.bet.update({
        data:{
            status: result.status,
            amountWon: result.amountWon,
            updatedAt: new Date(),
        }, where: {id}
    })
}

export async function getByGameId(id: number){
    return await prisma.bet.findMany({ where: { gameId: id }})
}