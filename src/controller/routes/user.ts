import { UserService } from '@controller/services'
import { authMiddleware } from '../middleware'
import { CreateRoute } from './createRoutes'
import { GET, POST } from './type/requestTypeName'

const endpoint = 'user'
export class UserRoute {
    constructor({ createRoute, userService }: { createRoute: CreateRoute, userService: UserService }) {
        createRoute.createHttpRoute(
            {
                method: POST,
                path: `/${endpoint}/register`,
                handler: userService.register,
                context: userService
            })

        createRoute.createHttpRoute(
            {
                method: POST,
                path: `/${endpoint}/login`,
                handler: userService.login,
                context: userService
            })

        createRoute.createHttpRoute(
            {
                method: GET,
                path: `/${endpoint}/getAll`,
                handler: userService.getAll,
                context: userService
            })
        createRoute.createHttpRoute(
            {
                method: GET,
                path: `/${endpoint}`,
                middleware: [authMiddleware],
                handler: userService.getByToken,
                context: userService
            })
        createRoute.createHttpRoute(
            {
                method: GET,
                path: `/${endpoint}/:id`,
                handler: userService.getById,
                context: userService
            })


    }
}