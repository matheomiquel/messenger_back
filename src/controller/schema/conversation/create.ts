import Joi from "joi";
const name = "i'm a name";
const CreateConversationRequest = Joi.object({
  name: Joi.string().required().example(name)
});

const CreateConversationResponse = Joi.object({
  name: Joi.string().required().example(name),
  id: Joi.number().positive().required().example(1),
  admin: Joi.number().positive().required().example(1)
});

type CreateConversationResponseType = {
    name: string,
    id: number,
    admin: number
}

export { CreateConversationRequest, CreateConversationResponse, CreateConversationResponseType };
