import Joi from "joi";
const name = "I'm an exemple of a conversation name";

const ConversationResponse = Joi.object({
  id: Joi.number().required().example(1),
  admin: Joi.number().required().example(1),
  name: Joi.string().required().example(name)
});

const ConversationRequest = Joi.object({
  admin: Joi.number().required().example(1),
  name: Joi.string().required().example(name)
});

type ConversationRequestType = {
    admin: number,
    name: string
}

type ConversationResponseType = {
    id: number,
    admin: number,
    name: string
}

export {
  ConversationRequest, ConversationRequestType,
  ConversationResponse, ConversationResponseType
};
