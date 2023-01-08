import * as Joi from 'joi'
const AcceptFriendRequestSchemaBody = Joi.object({
    friendId: Joi.number()
        .required()
})

export { AcceptFriendRequestSchemaBody };