import { unauthorizedSchema } from "@controller/swagger/error";

import { ConversationsResponse } from "../../schema";
import { formattingBody } from "../formatting";
import { tags } from "../tags";
const getConversationsFromUserSwagger = {
  tags: [tags.user.name],
  description: "Get all conversation for the current user",
  produces: ["application/json"],
  responses: {
    200: { ...formattingBody({ description: "return all conversation for the current user", schema: ConversationsResponse }) },
    401: { ...formattingBody({ description: "you need to be connected for that", schema: unauthorizedSchema }) }
  }
};
export { getConversationsFromUserSwagger };
