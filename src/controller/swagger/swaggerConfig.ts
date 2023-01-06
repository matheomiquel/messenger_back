import {
    registerSwagger,
    loginSwagger,
    AcceptFriendRequestSwagger,
    addFriendSwagger,
    getAllSwager,
    getAllExceptMyfriendSwagger,
    getfriendSwagger,
    getMeSwagger
} from './user'
import { tags } from './tags'
export const swaggerConfig = {
    openapi: "3.0.0",
    info: {
        version: "1.0.0", //version of the OpenAPI Specification
        title: "Loup-garou back",
        description: "Loup-garou",
    },

    components: {
        securitySchemes: {
            bearerAuth: {
                type: 'http',
                scheme: 'bearer',
                bearerFormat: 'JWT'
            }
        }
    },
    security: {
        bearerAuth: []
    },
    host: `127.0.0.1:${process.env.PORT ?? 3000}`,
    exposeRoute: true,
    tags: [tags.user],
    schemes: ["http"],
    consumes: ["application/json"],
    produces: ["application/json"],
    paths: {
        ...registerSwagger,
        ...loginSwagger,
        ...AcceptFriendRequestSwagger,
        ...addFriendSwagger,
        ...getAllSwager,
        ...getAllExceptMyfriendSwagger,
        ...getfriendSwagger,
        ...getMeSwagger
    }
}

