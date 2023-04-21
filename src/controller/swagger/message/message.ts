import { endpointMessage } from "@controller/routes";

import {
  createMessageSwagger,
  deleteMessageSwagger,
  readAllMessageSwager,
  updateMessageSwagger
} from "./crud";
const messageSwagger = {
  [`/${endpointMessage}`]: {
    get: { ...readAllMessageSwager },
    post: { ...createMessageSwagger }
  },
  [`/${endpointMessage}/{id}`]: {
    put: { ...updateMessageSwagger },
    delete: { ...deleteMessageSwagger }
  }

};
export { messageSwagger };
