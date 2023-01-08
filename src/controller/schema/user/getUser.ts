import * as Joi from 'joi'

const GetUserSchemaQuery = Joi.object({
    order: Joi.string().valid('ASC', 'DESC').default('ASC').required(),
    limit: Joi.number().positive().default(10).required(),
    offset: Joi.number().positive().allow(0).default(1-1).required()
}).options({ allowUnknown: true });

export { GetUserSchemaQuery };