import { UserService } from "@controller/services";

import { authMiddleware } from "../middleware";
import { CreateRoute } from "./createRoutes";
import { GET, POST } from "./type/requestTypeName";

const endpointUser = "user";
export class UserRoute {
  private readonly createRoute: InstanceType<typeof CreateRoute>;

  private readonly userService: InstanceType<typeof UserService>;

  constructor({ createRoute, userService }:
    {
      createRoute: InstanceType<typeof CreateRoute>,
      userService: InstanceType<typeof UserService>
    }) {
    this.createRoute = createRoute;
    this.userService = userService;
  }

  async init() {
    this.createRoute.createHttpRoute(
      {
        method: POST,
        path: `/${endpointUser}/register`,
        handler: this.userService.register,
        context: this.userService
      }
    );

    this.createRoute.createHttpRoute(
      {
        method: POST,
        path: `/${endpointUser}/login`,
        handler: this.userService.login,
        context: this.userService
      }
    );

    this.createRoute.createHttpRoute(
      {
        method: GET,
        path: `/${endpointUser}/getAll`,
        middleware: [authMiddleware],
        handler: this.userService.getAll,
        context: this.userService
      }
    );
    this.createRoute.createHttpRoute(
      {
        method: GET,
        path: `/${endpointUser}`,
        middleware: [authMiddleware],
        handler: this.userService.getByToken,
        context: this.userService
      }
    );

    this.createRoute.createHttpRoute(
      {
        method: GET,
        path: `/${endpointUser}/conversations`,
        middleware: [authMiddleware],
        handler: this.userService.getConversation,
        context: this.userService
      }
    );

    this.createRoute.createHttpRoute(
      {
        method: GET,
        path: `/${endpointUser}/:id`,
        middleware: [authMiddleware],
        handler: this.userService.getById,
        context: this.userService
      }
    );
  }
}

export { endpointUser };
