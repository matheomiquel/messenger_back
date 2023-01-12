import { AddUserRequest } from '@controller/schema'
import { tags } from '@controller/swagger/tags'
import { badRequestSchema, unauthorizedSchema, forbidenSchema, badResquestError, unauthorizedError, forbidenError } from '@controller/swagger/error'
import { formattingBody } from '@controller/swagger/formatting'
const addUserConversationSwagger = {
    tags: [tags.conversation.name],
    description: "Add user to a conversation",
    requestBody: formattingBody({ description: "add user to a conversation by id conversation", schema: AddUserRequest }),
    produces: ["application/json"],
    responses: {
        204: {
            ...formattingBody({ description: "user add correctly", schema: undefined })
        },
        400: { ...formattingBody({ description: badResquestError, schema: badRequestSchema }) },
        401: { ...formattingBody({ description: unauthorizedError, schema: unauthorizedSchema }) },
        403: { ...formattingBody({ description: forbidenError, schema: forbidenSchema }) },
    }
}
export { addUserConversationSwagger }