import { authMiddleware } from "@controller/middleware";
import { MessageService } from "@controller/services";

import { CreateRoute } from "./createRoutes";
import {
  DELETE,
  GET, POST, PUT
} from "./type/requestTypeName";

const endpointMessage = "message";

export class MessageRoute {
  private readonly createRoute: InstanceType<typeof CreateRoute>;

  private readonly messageService: InstanceType<typeof MessageService>;

  constructor({ createRoute, messageService }:
    {
      createRoute: InstanceType<typeof CreateRoute>,
      messageService: InstanceType<typeof MessageService>
    }) {
    this.createRoute = createRoute;
    this.messageService = messageService;
  }

  init() {
    this.createRoute.createHttpRoute(
      {
        method: POST,
        path: `/${endpointMessage}`,
        handler: this.messageService.create,
        middleware: [authMiddleware],
        context: this.messageService
      }
    );
    this.createRoute.createHttpRoute(
      {
        method: GET,
        path: `/${endpointMessage}`,
        handler: this.messageService.read,
        middleware: [authMiddleware],
        context: this.messageService
      }
    );
    this.createRoute.createHttpRoute(
      {
        method: PUT,
        path: `/${endpointMessage}/:id`,
        handler: this.messageService.update,
        middleware: [authMiddleware],
        context: this.messageService
      }
    );
    this.createRoute.createHttpRoute(
      {
        method: DELETE,
        path: `/${endpointMessage}/:id`,
        handler: this.messageService.delete,
        middleware: [authMiddleware],
        context: this.messageService
      }
    );
  }
}
export { endpointMessage };
