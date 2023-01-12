import Joi from 'joi';
const name = "i'm a name"
const UpdateConversationRequest = Joi.object({
    name: Joi.string().required().example(name)
})

type UpdateConversationRequestType = {
    name: string,
}

export { UpdateConversationRequest, UpdateConversationRequestType };