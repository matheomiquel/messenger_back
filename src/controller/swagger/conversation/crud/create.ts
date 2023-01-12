import { CreateConversationRequest, CreateConversationResponse } from "@controller/schema";
import {
  badRequestSchema, badResquestError, forbidenError,
  forbidenSchema, unauthorizedError, unauthorizedSchema
} from "@controller/swagger/error";
import { formattingBody } from "@controller/swagger/formatting";
import { tags } from "@controller/swagger/tags";
const createConversationSwagger = {
  tags: [tags.conversation.name],
  description: "Create new message",
  requestBody: formattingBody({ description: "message we want to create", schema: CreateConversationRequest }),
  produces: ["application/json"],
  responses: {
    200: {
      ...formattingBody({ description: "New message is created", schema: CreateConversationResponse })
    },
    400: { ...formattingBody({ description: badResquestError, schema: badRequestSchema }) },
    401: { ...formattingBody({ description: unauthorizedError, schema: unauthorizedSchema }) },
    403: { ...formattingBody({ description: forbidenError, schema: forbidenSchema }) }
  }
};
export { createConversationSwagger };
