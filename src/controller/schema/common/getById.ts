import * as Joi from 'joi'
const GetById = Joi.object({
    id: Joi.number().required()
}).options({ allowUnknown: true });

export { GetById };