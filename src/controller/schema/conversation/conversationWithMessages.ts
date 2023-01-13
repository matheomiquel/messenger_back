import { MessageResponse, MessageResponseType } from "@controller/schema/message";
import Joi from "joi";
const name = "i'm a name";
const ConversationWithMessagesRequest = Joi.object({
  id: Joi.number().required().example(1)
});
const ConversationWithMessagesResponse = Joi.object({
  name: Joi.string().required().example(name),
  id: Joi.number().positive().required().example(1),
  admin: Joi.number().positive().required().example(1),
  messages: Joi.array().items(MessageResponse)
});

type ConversationWithMessagesRequestType = {
  id: number,
}

type ConversationWithMessagesResponseType = {
  id: number
  name: string
  admin: number
  messages: MessageResponseType[]
}

export {
  ConversationWithMessagesRequest,
  ConversationWithMessagesRequestType,
  ConversationWithMessagesResponse,
  ConversationWithMessagesResponseType
};
