import Joi from 'joi';
const content = "Je suis un exemple de contenue de message"
const MessageRequest = Joi.object({
    content: Joi.string().required().example(content)
})

export { MessageRequest };