import { requestType } from "@controller/routes/type";
import {
  AddUserRequestType, ConversationRequestType,
  UpdateConversationRequestType
} from "@controller/schema";
import { createError } from "@src/createError";
import { Schema, ValidationError } from "joi";
export class ConversationValidator {
  private readonly createConversationRequest: Schema;

  private readonly updateConversationRequest: Schema;

  private readonly addUserRequest: Schema;

  constructor({ createConversationRequest, updateConversationRequest, addUserRequest }:
    {
      createConversationRequest: Schema,
      updateConversationRequest: Schema,
      addUserRequest: Schema
    }) {
    this.createConversationRequest = createConversationRequest;
    this.updateConversationRequest = updateConversationRequest;
    this.addUserRequest = addUserRequest;
  }

  async create(req: requestType<ConversationRequestType>) {
    try {
      await this.createConversationRequest.validateAsync(req.body, {
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

  async update(req: requestType<UpdateConversationRequestType>) {
    try {
      await this.updateConversationRequest.validateAsync(req.body, {
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

  async addUser(req: requestType<AddUserRequestType>) {
    try {
      await this.addUserRequest.validateAsync(req.body, {
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
