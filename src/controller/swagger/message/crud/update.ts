import { GetById } from "@controller/schema";
import {
  badRequestSchema, badResquestError, forbidenError, forbidenSchema, notFoundError, notFoundSchema,
  unauthorizedError, unauthorizedSchema
} from "@controller/swagger/error";
import { formattingBody, formattingParameters } from "@controller/swagger/formatting";
import { tags } from "@controller/swagger/tags";
const parameters = [{ in: "path", schema: GetById }];
const updateMessageSwagger = {
  tags: [tags.message.name],
  description: "update message by id and user_id",
  produces: ["application/json"],
  parameters: formattingParameters({ parameters }),
  responses: {
    204: { ...formattingBody({ description: "update message and return nothing" }) },
    400: { ...formattingBody({ description: badResquestError, schema: badRequestSchema }) },
    401: { ...formattingBody({ description: unauthorizedError, schema: unauthorizedSchema }) },
    403: { ...formattingBody({ description: forbidenError, schema: forbidenSchema }) },
    404: { ...formattingBody({ description: notFoundError, schema: notFoundSchema }) }
  }
};
export { updateMessageSwagger };
