import { conflictError, notFoundError } from '../errors/index';
import { GameCreate, GameUpdate } from '../protocols/index';
import * as gamesRepository from '../repositories/games-repository';
import * as betsService from '../services/bets-service';

export async function getAll() {
    return await gamesRepository.getAll();
}

export async function getById(id: number) {
    const game = await gamesRepository.getById(id);
    if(!game) throw notFoundError('Game');
    return game;
}

export async function create(gameData: GameCreate) {
    return await gamesRepository.create(gameData);
}

export async function update(id: number, score: GameUpdate) {
    const game = await getById(id);
    if(game.isFinished === true) throw conflictError();

    const result = await gamesRepository.update(id, score);

    const bets = await betsService.getByGameId(id);
    await betsService.updateAll(game, bets);

    return result;
}