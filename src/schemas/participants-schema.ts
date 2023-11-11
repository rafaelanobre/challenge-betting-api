import joi from 'joi';

const participantSchema = joi.object({
    name: joi.string().required(),
    balance: joi.number().required(),
});

export default participantSchema;