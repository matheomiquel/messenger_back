import { UsersResponse, GetUserSchemaQuery } from '../../schema'
import { tags } from '../tags'
import { unauthorizedSchema } from '@controller/swagger/error'
import { formattingBody, formattingParameters } from '../formatting'
import { endpointUser } from './endpointUser'
const parameters = [{ in: 'query', schema: GetUserSchemaQuery }]
const getAllSwager = {
    [`/${endpointUser}/getAll`]: {
        get: {
            tags: [tags.user.name],
            description: "Accept a friend request",
            parameters: formattingParameters({ parameters }),
            produces: ["application/json"],
            responses: {
                200: { ...formattingBody({ description: "return all user", schema: UsersResponse }) },
                401: { ...formattingBody({ description: "you need to be connected for that", schema: unauthorizedSchema }) },
            }
        }
    }
}
export { getAllSwager }