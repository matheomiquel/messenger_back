import { MessageService } from '@controller/services'
import { authMiddleware } from '@controller/middleware'
import { CreateRoute } from './createRoutes'
import { GET, POST, PUT, DELETE } from './type/requestTypeName'

const endpointMessage = 'message'

export class MessageRoute {
    constructor({ createRoute, messageService }: { createRoute: CreateRoute, messageService: MessageService }) {
        createRoute.createHttpRoute(
            {
                method: POST,
                path: `/${endpointMessage}`,
                handler: messageService.create,
                middleware: [authMiddleware],
                context: messageService
            })
        createRoute.createHttpRoute(
            {
                method: GET,
                path: `/${endpointMessage}`,
                handler: messageService.read,
                middleware: [authMiddleware],
                context: messageService
            })
        createRoute.createHttpRoute(
            {
                method: PUT,
                path: `/${endpointMessage}/:id`,
                handler: messageService.update,
                middleware: [authMiddleware],
                context: messageService
            })
        createRoute.createHttpRoute(
            {
                method: DELETE,
                path: `/${endpointMessage}/:id`,
                handler: messageService.delete,
                middleware: [authMiddleware],
                context: messageService
            })
    }
}
export { endpointMessage }