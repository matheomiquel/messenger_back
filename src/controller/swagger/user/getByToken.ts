import { UserResponse } from "@controller/schema";
import { unauthorizedSchema } from "@controller/swagger/error";
import { formattingBody } from "@controller/swagger/formatting";
import { tags } from "@controller/swagger/tags";
const getByTokenSwagger = {
  tags: [tags.user.name],
  description: "return user by token",
  produces: ["application/json"],
  responses: {
    200: { ...formattingBody({ description: "return user by token", schema: UserResponse }) },
    401: { ...formattingBody({ description: "you need to be connected for that", schema: unauthorizedSchema }) }
  }
};
export { getByTokenSwagger };
