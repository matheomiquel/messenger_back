import * as Joi from 'joi'
const unauthorizedSchema = Joi.object({
    message: Joi.array().items(Joi.string()).example(['you need to connect first'])
})
export { unauthorizedSchema }