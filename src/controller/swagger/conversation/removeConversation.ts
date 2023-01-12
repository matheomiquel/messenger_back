import { RemoveUserRequest } from '@controller/schema'
import { tags } from '@controller/swagger/tags'
import { badRequestSchema, unauthorizedSchema, forbidenSchema, badResquestError, unauthorizedError, forbidenError } from '@controller/swagger/error'
import { formattingBody } from '@controller/swagger/formatting'
const removeUserConversationSwagger = {
    tags: [tags.conversation.name],
    description: "remove user from a conversation",
    requestBody: formattingBody({ description: "remove user to a conversation by id conversation", schema: RemoveUserRequest }),
    produces: ["application/json"],
    responses: {
        204: {
            ...formattingBody({ description: "user removed correctly", schema: undefined })
        },
        400: { ...formattingBody({ description: badResquestError, schema: badRequestSchema }) },
        401: { ...formattingBody({ description: unauthorizedError, schema: unauthorizedSchema }) },
        403: { ...formattingBody({ description: forbidenError, schema: forbidenSchema }) },
    }
}
export { removeUserConversationSwagger }