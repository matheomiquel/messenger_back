import * as Joi from "joi";
const content = "I'm an exemple of a content";

const CreateMessageResponse = Joi.object({
  id: Joi.number().required().example(1),
  user_id: Joi.number().required().example(1),
  content: Joi.string().required().example(content)
});

const MessageResponse = Joi.object({
  id: Joi.number().required().example(1),
  userId: Joi.number().required().example(1),
  content: Joi.string().required().example(content),
  conversationId: Joi.number().required().example(1)
});

type MessageResponseType = {
  id: number,
  userId: number,
  conversationId: number,
  content: string
}

export { CreateMessageResponse, MessageResponse, MessageResponseType };
