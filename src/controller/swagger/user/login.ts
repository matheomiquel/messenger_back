import { LoginSchemaBody, RegisterSchemaResponse } from "../../schema";
import { badRequestSchema, notFoundSchema } from "../error";
import { formattingBody } from "../formatting";
import { tags } from "../tags";
const loginSwagger = {
  tags: [tags.user.name],
  description: "Login user",
  requestBody: formattingBody({ description: "Login route", schema: LoginSchemaBody }),
  produces: ["application/json"],
  responses: {
    200: {
      ...formattingBody({ description: "User login", schema: RegisterSchemaResponse })
    },
    400: { ...formattingBody({ description: "Error in request body", schema: badRequestSchema }) },
    404: { ...formattingBody({ description: "wrong email or password", schema: notFoundSchema }) }
  }
};
export { loginSwagger };
