import Joi from 'joi';
import { UserResponseType } from "@controller/schema"
const name = "i'm a name"
const ConversationWithUsersRequest = Joi.object({
    id: Joi.number().required().example(1)
})

const ConversationWithUsersResponse = Joi.object({
    name: Joi.string().required().example(name),
    id: Joi.number().positive().required().example(1),
    admin: Joi.number().positive().required().example(1),
})

type ConversationWithUsersRequestType = {
    id: number,
}

type ConversationWithUsersResponseType = {
    id: number
    name: string
    admin: number
    users: UserResponseType[]
}

export { ConversationWithUsersRequest, ConversationWithUsersResponse, ConversationWithUsersRequestType, ConversationWithUsersResponseType };