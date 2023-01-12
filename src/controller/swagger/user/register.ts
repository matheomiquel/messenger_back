import { RegisterSchemaBody, RegisterSchemaResponse } from "@controller/schema";
import { badRequestSchema, conflictSchema } from "@controller/swagger/error";
import { formattingBody } from "@controller/swagger/formatting";
import { tags } from "@controller/swagger/tags";

import { endpointUser } from "./endpointUser";
const registerSwagger = {
  [`/${endpointUser}/register`]: {
    post: {
      tags: [tags.user.name],
      description: "Create new user in system",
      requestBody: formattingBody({ description: "User that we want to create", schema: RegisterSchemaBody }),
      produces: ["application/json"],
      responses: {
        200: {
          ...formattingBody({ description: "New user is created", schema: RegisterSchemaResponse })
        },
        400: { ...formattingBody({ description: "Error in request body", schema: badRequestSchema }) },
        409: { ...formattingBody({ description: "email already taken", schema: conflictSchema }) }
      }
    }
  }
};
export { registerSwagger };
