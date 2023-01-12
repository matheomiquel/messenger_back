import Joi from "joi";
const content = "Je suis un exemple de contenue de message";
const CreateMessageRequest = Joi.object({
  content: Joi.string().required().example(content),
  conversationId: Joi.number().required().positive().example(1)
});

type CreateMessageRequestType = {
    content: string,
    conversationId: number
}

type CreateMessageResponseType = {
    id: number,
    content: string,
    conversationId: number
}

export { CreateMessageRequest, CreateMessageRequestType, CreateMessageResponseType };
