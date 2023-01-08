import { methodType, functionType ,requestType} from './type'
import { Express, Handler, Request, Response } from 'express'
import * as services from "@controller/services"
import { ErrorType } from '@src/errorType';
type ControllerServiceType = InstanceType<typeof services[keyof typeof services]>
export class CreateRoute {
    private readonly app: Express
    constructor({ app }: { app: Express }) {
        this.app = app
    }

    createHttpRoute({ method, middleware = [], handler, path, context }:
        { method: methodType, middleware?: Handler[], handler: functionType, path: string, context: ControllerServiceType }) {
        const newHandler = handler.bind({ ...context })
        this.app[method](path, middleware, (req: Request, res: Response) => {
            const request = {
                body: req.body,
                query: req.query,
                params: req.params,
                token :  String(req.headers.token)
            } 
            this.handlerFunction(request, res, newHandler)
        })
    }
    async handlerFunction(req: requestType<any>, res: Response, handler: functionType) {
        try {
            const result = await handler(req)
            res.status(result.status).send(result.data)
        } catch (e: any) {
            if(e.status && e.message){
                const error = await e as ErrorType
                return res.status(error.status).send(error.message)
            }
            console.log(e);
           return res.status(500).send({message: 'erreur inconnue'})
        }
    }
}