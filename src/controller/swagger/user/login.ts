import { RegisterSchemaResponse, LoginSchemaBody } from '../../schema'
import { tags } from '../tags'
import { badRequestSchema, notFoundSchema } from '../error'
import { formattingBody } from '../formatting'
import { endpointUser } from './endpointUser'
const loginSwagger = {
    [`/${endpointUser}/login`]: {
        post: {
            tags: [tags.user.name],
            description: "Login user",
            requestBody: formattingBody({ description: "Login route", schema: LoginSchemaBody }),
            produces: ["application/json"],
            responses: {
                200: {
                    ...formattingBody({ description: "User login", schema: RegisterSchemaResponse })
                },
                400: { ...formattingBody({ description: "Error in request body", schema: badRequestSchema }) },
                404: { ...formattingBody({ description: "wrong email or password", schema: notFoundSchema }) },
            }
        }
    }
}
export { loginSwagger }