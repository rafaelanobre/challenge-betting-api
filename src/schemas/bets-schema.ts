import joi from 'joi';

export const betSchema = joi.object({
    gameId: joi.number().required(),
    participantId: joi.number().required(),
    homeTeamScore: joi.number().integer().positive().allow(0).required(),
    awayTeamScore: joi.number().integer().positive().allow(0).required(),
    amountBet: joi.number().integer().positive().required(),
});