import {
  conversationSwagger
} from "./conversation";
import {
  messageCrudSwagger
} from "./message";
import { tags } from "./tags";
import {
  getAllSwager,
  GetByIdSwagger,
  getByTokenSwagger,
  getConversationsFromUserSwagger,
  loginSwagger,
  registerSwagger
} from "./user";
export const swaggerConfig = {
  openapi: "3.0.0",
  info: {
    version: "1.0.0", // version of the OpenAPI Specification
    title: "Messenger back",
    description: "Messenger"
  },

  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT"
      }
    }
  },
  security: [{
    bearerAuth: []
  }],
  exposeRoute: true,
  tags: Object.values(tags),
  schemes: ["http"],
  consumes: ["application/json"],
  produces: ["application/json"],
  paths: {
    ...registerSwagger,
    ...loginSwagger,
    ...getAllSwager,
    ...GetByIdSwagger,
    ...getByTokenSwagger,
    ...messageCrudSwagger,
    ...conversationSwagger,
    ...getConversationsFromUserSwagger
  }
};
