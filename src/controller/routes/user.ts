import { UserService } from '@controller/services'
import { authMiddleware } from '../middleware'
import { CreateRoute } from './createRoutes'
import { GET, POST } from './type/requestTypeName'

const endpointUser = 'user'
export class UserRoute {
    constructor({ createRoute, userService }: { createRoute: CreateRoute, userService: UserService }) {
        createRoute.createHttpRoute(
            {
                method: POST,
                path: `/${endpointUser}/register`,
                handler: userService.register,
                context: userService
            })

        createRoute.createHttpRoute(
            {
                method: POST,
                path: `/${endpointUser}/login`,
                handler: userService.login,
                context: userService
            })

        createRoute.createHttpRoute(
            {
                method: GET,
                path: `/${endpointUser}/getAll`,
                middleware: [authMiddleware],
                handler: userService.getAll,
                context: userService
            })
        createRoute.createHttpRoute(
            {
                method: GET,
                path: `/${endpointUser}`,
                middleware: [authMiddleware],
                handler: userService.getByToken,
                context: userService
            })

        createRoute.createHttpRoute(
            {
                method: GET,
                path: `/${endpointUser}/conversations`,
                middleware: [authMiddleware],
                handler: userService.getConversation,
                context: userService
            })

        createRoute.createHttpRoute(
            {
                method: GET,
                path: `/${endpointUser}/:id`,
                middleware: [authMiddleware],
                handler: userService.getById,
                context: userService
            })
    }
}

export { endpointUser }