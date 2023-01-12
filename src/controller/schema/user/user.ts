import * as Joi from 'joi'
const name = 'Matheo'
const email = 'matheo@gmail.com'

const UserResponse = Joi.object({
    id: Joi.number().required().example(1),
    name: Joi.string().required().example(name),
    email: Joi.string().required().email().example(email),
})

type UserResponseType = {
    id: number,
    name: string,
    email: string
}

export { UserResponse, UserResponseType };