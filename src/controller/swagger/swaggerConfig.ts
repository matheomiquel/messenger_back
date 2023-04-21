import {
  conversationSwagger
} from "./conversation";
import {
  messageSwagger
} from "./message";
import { tags } from "./tags";
import {
  userSwagger
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
    ...userSwagger,
    ...messageSwagger,
    ...conversationSwagger
  }
};
