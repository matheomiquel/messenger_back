import * as Joi from 'joi'
const content = "I'm an exemple of a content"

const MessageResponse = Joi.object({
    id: Joi.number().required().example(1),
    user_id: Joi.number().required().example(1),
    content: Joi.string().required().example(content),
})

export { MessageResponse };