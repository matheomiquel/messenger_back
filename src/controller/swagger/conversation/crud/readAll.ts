import { ConversationsResponse, GetPagination } from "@controller/schema";
import { unauthorizedSchema } from "@controller/swagger/error";
import { formattingBody, formattingParameters } from "@controller/swagger/formatting";
import { tags } from "@controller/swagger/tags";
const parameters = [{ in: "query", schema: GetPagination }];
const readAllConversationSwagger = {
  tags: [tags.conversation.name],
  description: "Get all conversation",
  parameters: formattingParameters({ parameters }),
  produces: ["application/json"],
  responses: {
    200: { ...formattingBody({ description: "return all conversation", schema: ConversationsResponse }) },
    401: { ...formattingBody({ description: "you need to be connected for that", schema: unauthorizedSchema }) }
  }
};
export { readAllConversationSwagger };
