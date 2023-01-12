import { ConversationWithUsersResponse, GetPagination } from "@controller/schema";
import {
  forbidenError, forbidenSchema, notFoundError, notFoundSchema, unauthorizedSchema
} from "@controller/swagger/error";
import { formattingBody, formattingParameters } from "@controller/swagger/formatting";
import { tags } from "@controller/swagger/tags";
const parameters = [{ in: "query", schema: GetPagination }];
const readConversationWithUser = {
  tags: [tags.conversation.name],
  description: "Get one conversation with all users inside",
  parameters: formattingParameters({ parameters }),
  produces: ["application/json"],
  responses: {
    200: { ...formattingBody({ description: "return conversation with users", schema: ConversationWithUsersResponse }) },
    401: { ...formattingBody({ description: "you need to be connected for that", schema: unauthorizedSchema }) },
    403: { ...formattingBody({ description: forbidenError, schema: forbidenSchema }) },
    404: { ...formattingBody({ description: notFoundError, schema: notFoundSchema }) }
  }
};
export { readConversationWithUser };
