import { ConversationsResponse } from '../../schema'
import { tags } from '../tags'
import { unauthorizedSchema } from '@controller/swagger/error'
import { formattingBody } from '../formatting'
import { endpointUser } from './endpointUser'
const getConversationsFromUserSwagger = {
    [`/${endpointUser}/conversations`]: {
        get: {
            tags: [tags.user.name],
            description: "Get all conversation for the current user",
            produces: ["application/json"],
            responses: {
                200: { ...formattingBody({ description: "return all conversation for the current user", schema: ConversationsResponse }) },
                401: { ...formattingBody({ description: "you need to be connected for that", schema: unauthorizedSchema }) },
            }
        }
    }
}
export { getConversationsFromUserSwagger }