import {
  CreateMessageRequestType,
  UpdateMessageRequestType
} from "@controller/schema";
import { createError } from "@src/createError";
import { Schema, ValidationError } from "joi";

import { requestType } from "../routes/type";
export class MessageValidator {
  private readonly createMessageRequest: Schema;

  private readonly updateMessageRequest: Schema;

  constructor({ createMessageRequest, updateMessageRequest }:
    { createMessageRequest: Schema, updateMessageRequest: Schema }) {
    this.createMessageRequest = createMessageRequest;
    this.updateMessageRequest = updateMessageRequest;
  }

  async create(req: requestType<CreateMessageRequestType>) {
    try {
      await this.createMessageRequest.validateAsync(req.body, {
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

  async update(req: requestType<UpdateMessageRequestType>) {
    try {
      await this.updateMessageRequest.validateAsync(req.body, {
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
