import Joi from 'joi';
const RemoveUserRequest = Joi.object({
    userId: Joi.number().required().positive().example(1),
    conversationId: Joi.number().required().positive().example(1)
})

type RemoveUserRequestType = {
    userId: number,
    conversationId: number,
}

export { RemoveUserRequest, RemoveUserRequestType };