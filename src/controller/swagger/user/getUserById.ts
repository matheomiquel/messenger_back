import { GetById, UserResponse } from "@controller/schema";
import { unauthorizedSchema } from "@controller/swagger/error";
import { formattingBody, formattingParameters } from "@controller/swagger/formatting";
import { tags } from "@controller/swagger/tags";

const parameters = [{ in: "path", schema: GetById }];
const GetByIdSwagger = {
  tags: [tags.user.name],
  description: "Get user by id",
  produces: ["application/json"],
  parameters: formattingParameters({ parameters }),
  responses: {
    200: { ...formattingBody({ description: "returns the associated user with the given id", schema: UserResponse }) },
    401: { ...formattingBody({ description: "you need to be connected for that", schema: unauthorizedSchema }) }
  }
};
export { GetByIdSwagger };
