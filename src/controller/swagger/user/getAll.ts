import { unauthorizedSchema } from "@controller/swagger/error";

import { GetPagination, UsersResponse } from "../../schema";
import { formattingBody, formattingParameters } from "../formatting";
import { tags } from "../tags";
const parameters = [{ in: "query", schema: GetPagination }];
const getAllSwager = {
  tags: [tags.user.name],
  description: "Get all users",
  parameters: formattingParameters({ parameters }),
  produces: ["application/json"],
  responses: {
    200: { ...formattingBody({ description: "return all user", schema: UsersResponse }) },
    401: { ...formattingBody({ description: "you need to be connected for that", schema: unauthorizedSchema }) }
  }
};
export { getAllSwager };
