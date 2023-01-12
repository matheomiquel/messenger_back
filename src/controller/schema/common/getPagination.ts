import * as Joi from "joi";

const GetPagination = Joi.object({
  order: Joi.string().valid("ASC", "DESC").default("ASC").required(),
  limit: Joi.number().positive().default(10).required(),
  offset: Joi.number().min(0).allow(0).default(0)
    .required()
}).options({ allowUnknown: true });

export { GetPagination };
