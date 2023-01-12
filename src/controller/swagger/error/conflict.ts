import * as Joi from "joi";
const conflictSchema = Joi.object({
  message: Joi.array().items(Joi.string()).example(["resource already created"])
});
const conflictError = "The ressource is already created";

export { conflictError, conflictSchema };
