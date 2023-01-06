import * as Joi from 'joi'
const badRequestSchema = Joi.object({
    message: Joi.array().items(Joi.string()).example(['invalid request'])
})
export { badRequestSchema }