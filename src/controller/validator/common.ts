import { createError } from "@src/createError";
import { Schema, ValidationError } from "joi";
export class CommonValidator {
  private readonly getById: Schema;

  constructor({ getById }: { getById: Schema }) {
    this.getById = getById;
  }

  async id(params: object) {
    try {
      await this.getById.validateAsync(params, {
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
