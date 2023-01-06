import * as Joi from 'joi'
const notFoundSchema = Joi.object({
    message: Joi.array().items(Joi.string()).example(['resource not found'])
})
export { notFoundSchema }