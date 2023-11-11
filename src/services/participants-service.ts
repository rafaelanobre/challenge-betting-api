import { ParticipantCreate } from "../protocols/index";
import * as participantsRepository from '../repositories/participants-repository'
import { badRequestError, invalidDataError } from "../errors/index";

export async function getAll() {
    return await participantsRepository.getAll();
}

export async function create(participant: ParticipantCreate) {
    if(participant.balance < 1000) throw invalidDataError('Balance must be R$10,00 or greater')

    const result = await participantsRepository.create(participant);
    if(!result) throw badRequestError();

    return result;
}