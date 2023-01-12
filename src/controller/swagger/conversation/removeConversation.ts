import { RemoveUserRequest } from "@controller/schema";
import {
  badRequestSchema, badResquestError, forbidenError,
  forbidenSchema, unauthorizedError, unauthorizedSchema
} from "@controller/swagger/error";
import { formattingBody } from "@controller/swagger/formatting";
import { tags } from "@controller/swagger/tags";
const removeUserConversationSwagger = {
  tags: [tags.conversation.name],
  description: "remove user from a conversation",
  requestBody: formattingBody({ description: "remove user to a conversation by id conversation", schema: RemoveUserRequest }),
  produces: ["application/json"],
  responses: {
    204: {
      ...formattingBody({ description: "user removed correctly", schema: undefined })
    },
    400: { ...formattingBody({ description: badResquestError, schema: badRequestSchema }) },
    401: { ...formattingBody({ description: unauthorizedError, schema: unauthorizedSchema }) },
    403: { ...formattingBody({ description: forbidenError, schema: forbidenSchema }) }
  }
};
export { removeUserConversationSwagger };
