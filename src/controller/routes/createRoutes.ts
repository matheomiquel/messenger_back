/* eslint class-methods-use-this: 0 */
import * as services from "@controller/services";
import { ErrorType } from "@src/errorType";
import {
  Express, Handler, Request, Response
} from "express";

import { functionType, methodType, requestType } from "./type";
type ControllerServiceType = InstanceType<typeof services[keyof typeof services]>
export class CreateRoute {
  private readonly app: Express;

  private readonly res: Response;

  constructor({ app, res }: { app: Express, res: Response }) {
    this.app = app;
    this.res = res;
  }

  async createHttpRoute({
    method, middleware = [], handler, path, context
  }:
    {
      method: methodType,
      middleware?: Handler[],
      handler: functionType,
      path: string,
      context: ControllerServiceType
    }):
    Promise<void> {
    const newHandler = handler.bind({ ...context });
    this.app[method](path, middleware, (req: Request, res: Response) => {
      const request = {
        body: req.body,
        query: req.query,
        params: req.params,
        token: String(req.headers.token)
      };
      this.handlerFunction(request, res, newHandler);
    });
  }

  async handlerFunction(req: requestType<object | undefined>, res: Response, handler: functionType):
    Promise<Response> {
    try {
      const result = await handler(req);
      return res.status(result.status).send(result.data);
    } catch (e) {
      if (e.status && e.message) {
        const error = await e as ErrorType;
        return res.status(error.status).send(error.message);
      }
      console.log(e); // eslint-disable-line no-console
      return res.status(500).send({ message: "erreur inconnue" });
    }
  }
}
