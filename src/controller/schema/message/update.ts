import Joi from 'joi';
const content = "Je suis un exemple de contenue de message"
const UpdateMessageRequest = Joi.object({
    content: Joi.string().required().example(content)
})

type UpdateMessageRequestType = {
    content: string
}
export { UpdateMessageRequest, UpdateMessageRequestType };