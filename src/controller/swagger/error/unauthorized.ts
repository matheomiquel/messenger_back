import * as Joi from "joi";
const unauthorizedSchema = Joi.object({
  message: Joi.array().items(Joi.string()).example(["you need to connect first"])
});

const unauthorizedError = "You need to be connected to do that";
export { unauthorizedError, unauthorizedSchema };
