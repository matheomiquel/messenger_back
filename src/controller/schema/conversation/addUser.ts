import Joi from "joi";
const AddUserRequest = Joi.object({
  userId: Joi.number().required().positive().example(1),
  conversationId: Joi.number().required().positive().example(1)
});

type AddUserRequestType = {
    userId: number,
    conversationId: number,
}

export { AddUserRequest, AddUserRequestType };
