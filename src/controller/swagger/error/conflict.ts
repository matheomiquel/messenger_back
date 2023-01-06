import * as Joi from 'joi'
const conflictSchema = Joi.object({
    message: Joi.array().items(Joi.string()).example(['resource already created'])
})
export { conflictSchema }