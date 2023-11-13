import { ParticipantCreate } from "../protocols/index";
import * as participantsRepository from '../repositories/participants-repository'
import { badRequestError, invalidDataError, notFoundError } from "../errors/index";

export async function getAll() {
    return await participantsRepository.getAll();
}

export async function create(participant: ParticipantCreate) {
    if(participant.balance < 1000) throw invalidDataError('Balance must be R$10,00 or greater')

    const result = await participantsRepository.create(participant);
    if(!result) throw badRequestError();

    return result;
}

export async function getById(id: number) {
    const participant = await participantsRepository.getById(id);
    if(!participant) throw notFoundError('Participant');
    return participant;
}

export async function update(balance: number, betValue: number , id: number) {
    const newBalance = (balance - betValue);
    return await participantsRepository.update(newBalance, id);
}

export async function updateWhenWon(id: number, wonAmount: number) {
    const user = await getById(id);
    const newBalance = (user.balance + wonAmount);
    return await participantsRepository.update(newBalance, id);
}