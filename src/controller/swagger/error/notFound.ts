import * as Joi from "joi";
const notFoundSchema = Joi.object({
  message: Joi.array().items(Joi.string()).example(["resource not found"])
});

const notFoundError = "The ressource is not found";
export { notFoundError, notFoundSchema };
