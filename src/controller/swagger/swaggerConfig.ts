import {
    getAllSwager,
    registerSwagger,
    GetByIdSwagger,
    loginSwagger,
    getByTokenSwagger
} from './user'

import {
    //readAllMessageSwager,
    createMessageSwagger,
    updateMessageSwagger,
    messageCrudSwagger,
} from './message'
import { tags } from './tags'
export const swaggerConfig = {
    openapi: "3.0.0",
    info: {
        version: "1.0.0", //version of the OpenAPI Specification
        title: "Messenger back",
        description: "Messenger",
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
    security: [{
        bearerAuth: []
    }],
    host: `127.0.0.1:${process.env.PORT ?? 3000}`,
    exposeRoute: true,
    tags: [tags.user],
    schemes: ["http"],
    consumes: ["application/json"],
    produces: ["application/json"],
    paths: {
        ...registerSwagger,
        ...loginSwagger,
        ...getAllSwager,
        ...GetByIdSwagger,
        ...getByTokenSwagger,
        ...messageCrudSwagger
        //...readAllMessageSwager,
        //...createMessageSwagger,
        //...updateMessageSwagger
    }
}

