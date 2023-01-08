import * as Joi from 'joi'
import { UserResponse } from './user'

const UsersResponse = Joi.array().items(UserResponse)

export { UsersResponse };