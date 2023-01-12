import { ConversationService } from '@controller/services'
import { authMiddleware } from '@controller/middleware'
import { CreateRoute } from './createRoutes'
import { GET, POST, PUT, DELETE } from './type/requestTypeName'

const endpointConversation = 'conversation'

export class ConversationRoute {
    constructor({ createRoute, conversationService }: { createRoute: CreateRoute, conversationService: ConversationService }) {
        createRoute.createHttpRoute(
            {
                method: GET,
                path: `/${endpointConversation}`,
                handler: conversationService.read,
                middleware: [authMiddleware],
                context: conversationService
            })
        createRoute.createHttpRoute(
            {
                method: GET,
                path: `/${endpointConversation}/:id`,
                handler: conversationService.readConversationByUserId,
                middleware: [authMiddleware],
                context: conversationService
            })
        createRoute.createHttpRoute(
            {
                method: POST,
                path: `/${endpointConversation}`,
                handler: conversationService.create,
                middleware: [authMiddleware],
                context: conversationService
            })

        createRoute.createHttpRoute(
            {
                method: PUT,
                path: `/${endpointConversation}/:id`,
                handler: conversationService.update,
                middleware: [authMiddleware],
                context: conversationService
            })
        createRoute.createHttpRoute(
            {
                method: DELETE,
                path: `/${endpointConversation}/:id`,
                handler: conversationService.delete,
                middleware: [authMiddleware],
                context: conversationService
            })
        createRoute.createHttpRoute(
            {
                method: POST,
                path: `/${endpointConversation}/addUser`,
                handler: conversationService.addUserToConversation,
                middleware: [authMiddleware],
                context: conversationService
            })
        createRoute.createHttpRoute(
            {
                method: POST,
                path: `/${endpointConversation}/removeUser`,
                handler: conversationService.removeUserFromConversation,
                middleware: [authMiddleware],
                context: conversationService
            })
    }
}
export { endpointConversation }