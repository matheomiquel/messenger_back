import * as Joi from 'joi'
const badRequestSchema = Joi.object({
    message: Joi.array().items(Joi.string()).example(['invalid request'])
})
const badResquestError = "Problem in the request"
export { badRequestSchema, badResquestError }