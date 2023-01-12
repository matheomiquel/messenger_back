import { unauthorizedSchema } from "@controller/swagger/error";

import { GetPagination, UserResponse } from "../../schema";
import { formattingBody, formattingParameters } from "../formatting";
import { tags } from "../tags";
import { endpointUser } from "./endpointUser";
const parameters = [{ in: "query", schema: GetPagination }];
const getAllSwager = {
  [`/${endpointUser}`]: {
    get: {
      tags: [tags.user.name],
      description: "get current user information",
      parameters: formattingParameters({ parameters }),
      produces: ["application/json"],
      responses: {
        200: { ...formattingBody({ description: "return information for the current user", schema: UserResponse }) },
        401: { ...formattingBody({ description: "you need to be connected for that", schema: unauthorizedSchema }) }
      }
    }
  }
};
export { getAllSwager };
