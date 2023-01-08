import * as Joi from 'joi'

const TokenHeader = Joi.object({
    token: Joi.string().required(),
})

export { TokenHeader };