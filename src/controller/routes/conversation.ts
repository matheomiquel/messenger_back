import { authMiddleware } from "@controller/middleware";
import { ConversationService } from "@controller/services";

import { CreateRoute } from "./createRoutes";
import {
  DELETE,
  GET, POST, PUT
} from "./type/requestTypeName";

const endpointConversation = "conversation";

export class ConversationRoute {
  private readonly createRoute: InstanceType<typeof CreateRoute>;

  private readonly conversationService: InstanceType<typeof ConversationService>;

  constructor({ createRoute, conversationService }:
    {
      createRoute: InstanceType<typeof CreateRoute>,
      conversationService: InstanceType<typeof ConversationService>
    }) {
    this.createRoute = createRoute;
    this.conversationService = conversationService;
  }

  init() {
    this.createRoute.createHttpRoute(
      {
        method: GET,
        path: `/${endpointConversation}`,
        handler: this.conversationService.read,
        middleware: [authMiddleware],
        context: this.conversationService
      }
    );
    this.createRoute.createHttpRoute(
      {
        method: GET,
        path: `/${endpointConversation}/:id`,
        handler: this.conversationService.readConversationByUserId,
        middleware: [authMiddleware],
        context: this.conversationService
      }
    );
    this.createRoute.createHttpRoute(
      {
        method: POST,
        path: `/${endpointConversation}`,
        handler: this.conversationService.create,
        middleware: [authMiddleware],
        context: this.conversationService
      }
    );

    this.createRoute.createHttpRoute(
      {
        method: PUT,
        path: `/${endpointConversation}/:id`,
        handler: this.conversationService.update,
        middleware: [authMiddleware],
        context: this.conversationService
      }
    );
    this.createRoute.createHttpRoute(
      {
        method: DELETE,
        path: `/${endpointConversation}/:id`,
        handler: this.conversationService.delete,
        middleware: [authMiddleware],
        context: this.conversationService
      }
    );
    this.createRoute.createHttpRoute(
      {
        method: POST,
        path: `/${endpointConversation}/addUser`,
        handler: this.conversationService.addUserToConversation,
        middleware: [authMiddleware],
        context: this.conversationService
      }
    );
    this.createRoute.createHttpRoute(
      {
        method: POST,
        path: `/${endpointConversation}/removeUser`,
        handler: this.conversationService.removeUserFromConversation,
        middleware: [authMiddleware],
        context: this.conversationService
      }
    );
  }
}
export { endpointConversation };
