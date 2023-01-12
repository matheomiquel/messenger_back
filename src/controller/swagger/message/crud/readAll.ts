import { unauthorizedSchema } from "@controller/swagger/error";
import { formattingBody, formattingParameters } from "@controller/swagger/formatting";
import { tags } from "@controller/swagger/tags";
import { CreateMessageResponse, GetPagination } from "@src/controller/schema";
const parameters = [{ in: "query", schema: GetPagination }];
const readAllMessageSwager = {
  tags: [tags.message.name],
  description: "Get all messages",
  parameters: formattingParameters({ parameters }),
  produces: ["application/json"],
  responses: {
    200: { ...formattingBody({ description: "return all message", schema: CreateMessageResponse }) },
    401: { ...formattingBody({ description: "you need to be connected for that", schema: unauthorizedSchema }) }
  }
};
export { readAllMessageSwager };
