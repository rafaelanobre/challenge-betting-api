import joi from 'joi';

export const newGameSchema = joi.object({
    homeTeamName: joi.string().required(),
	awayTeamName: joi.string().required()
});

export const finishGameSchema = joi.object({
    homeTeamScore: joi.number().required(),
    awayTeamScore: joi.number().required()
});