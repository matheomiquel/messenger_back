import { UserResponse } from "@controller/schema/user";
import * as Joi from "joi";

const UsersResponse = Joi.array().items(UserResponse);

export { UsersResponse };
