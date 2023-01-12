import { GetById, UserResponse } from "@controller/schema";
import {
  badRequestSchema, badResquestError, forbidenError, forbidenSchema, notFoundError, notFoundSchema,
  unauthorizedError, unauthorizedSchema
} from "@controller/swagger/error";
import { formattingBody, formattingParameters } from "@controller/swagger/formatting";
import { tags } from "@controller/swagger/tags";
const parameters = [{ in: "path", schema: GetById }];
const deleteConversationSwagger = {
  tags: [tags.conversation.name],
  description: "delete conversation by id and user_id",
  produces: ["application/json"],
  parameters: formattingParameters({ parameters }),
  responses: {
    204: { ...formattingBody({ description: "delete conversation and return nothing", schema: UserResponse }) },
    400: { ...formattingBody({ description: badResquestError, schema: badRequestSchema }) },
    401: { ...formattingBody({ description: unauthorizedError, schema: unauthorizedSchema }) },
    403: { ...formattingBody({ description: forbidenError, schema: forbidenSchema }) },
    404: { ...formattingBody({ description: notFoundError, schema: notFoundSchema }) }
  }
};
export { deleteConversationSwagger };
