import * as Joi from 'joi'
const forbidenSchema = Joi.object({
    message: Joi.array().items(Joi.string()).example(['you need to connect first'])
})
const forbidenError = "You don't have right to do that"
export { forbidenSchema ,forbidenError}