import { BetCreate, Bet, Game } from "../protocols/index";
import * as betsRepository from "../repositories/bets-repository";
import * as participantsService from "../services/participants-service";
import * as gamesService from "../services/games-service";
import { isValidId } from "../utils/id-validator";
import { conflictError, invalidDataError } from "../errors/index";
import { wonBet } from "../utils/won-bet";

export async function create(bet: BetCreate) {
    if(!isValidId(bet.participantId)) throw  invalidDataError('Participant Id');
    const participant = await participantsService.getById(bet.participantId);
    
    if(!isValidId(bet.gameId)) throw  invalidDataError('Game Id');
    const game = await gamesService.getById(bet.gameId);

    if(game.isFinished === true) throw conflictError();

    if(bet.amountBet > participant.balance) throw invalidDataError('Bet amount is bigger than participant balance');

    const result = await betsRepository.create(bet);

    await participantsService.update(participant.balance, bet.amountBet, bet.participantId);

    return result;
}

export async function updateAll(game: Game, bets: Bet[]) {
    let totalAmount = 0;
    let winningAmount = 0;

    for (const bet of bets) {
        totalAmount += bet.amountBet;
        if(wonBet(game, bet)){
            winningAmount = winningAmount + bet.amountBet;
        }
    };

    const updatePromises = bets.map(async (bet) => {
        try {
            if (wonBet(game, bet)) {
                const amountWon = (bet.amountBet / winningAmount) * totalAmount * (1 - 0.3);
                await betsRepository.update(bet.id, { status: 'WON', amountWon });
                await participantsService.updateWhenWon(bet.participantId, amountWon);
            } else {
                await betsRepository.update(bet.id, { status: 'LOST', amountWon: 0 });
            }
        } catch (error) {
            console.error("Error updating bet or participant:", error);
        }
    });

    await Promise.all(updatePromises);
}

export async function getByGameId(gameId: number) {
    return await betsRepository.getByGameId(gameId);
}