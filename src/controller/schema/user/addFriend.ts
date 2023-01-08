import * as Joi from 'joi'
const AddFriendSchemaBody = Joi.object({
    friendId: Joi.number()
        .required()
})
    ;

export { AddFriendSchemaBody };