import { requestType } from "@controller/routes/type/requestType";
import { createError } from "@src/createError";
import { Schema, ValidationError } from "joi";

import { LoginTypeRequest, RegisterSchemaBodyType } from "../schema/user";
export class UserValidator {
  private readonly registerSchemaBody: Schema;

  private readonly LoginSchemaBody: Schema;

  constructor({ registerSchemaBody, loginSchemaBody }:
    { registerSchemaBody: Schema, loginSchemaBody: Schema }) {
    this.registerSchemaBody = registerSchemaBody;
    this.LoginSchemaBody = loginSchemaBody;
  }

  async register(req: requestType<RegisterSchemaBodyType>) {
    try {
      await this.registerSchemaBody.validateAsync(req.body, {
        abortEarly: false
      });
    } catch (e) {
      const errors = e as ValidationError;
      throw await createError({
        message: errors.details.map((error) => error.message),
        status: 400
      });
    }
  }

  async login(req: requestType<LoginTypeRequest>) {
    try {
      await this.LoginSchemaBody.validateAsync(req.body, {
        abortEarly: false
      });
    } catch (e) {
      const errors = e as ValidationError;
      throw await createError({
        message: errors.details.map((error) => error.message),
        status: 400
      });
    }
  }
}
