import { CreateMessageRequest, CreateMessageResponse } from "@controller/schema";
import {
  badRequestSchema, badResquestError, forbidenError,
  forbidenSchema, unauthorizedError, unauthorizedSchema
} from "@controller/swagger/error";
import { formattingBody } from "@controller/swagger/formatting";
import { tags } from "@controller/swagger/tags";
const createMessageSwagger = {
  tags: [tags.message.name],
  description: "Create new message",
  requestBody: formattingBody({ description: "message we want to create", schema: CreateMessageRequest }),
  produces: ["application/json"],
  responses: {
    200: {
      ...formattingBody({ description: "New message is created", schema: CreateMessageResponse })
    },
    400: { ...formattingBody({ description: badResquestError, schema: badRequestSchema }) },
    401: { ...formattingBody({ description: unauthorizedError, schema: unauthorizedSchema }) },
    403: { ...formattingBody({ description: forbidenError, schema: forbidenSchema }) }
  }
};
export { createMessageSwagger };
