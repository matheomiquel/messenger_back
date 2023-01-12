import Joi from "joi";

import { ConversationResponse } from "./conversation";
const ConversationsResponse = Joi.array().items(ConversationResponse);

export { ConversationsResponse };
