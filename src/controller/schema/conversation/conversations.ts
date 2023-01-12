import { ConversationResponse } from './conversation'
import Joi from 'joi'
const ConversationsResponse = Joi.array().items(ConversationResponse)

export { ConversationsResponse } 