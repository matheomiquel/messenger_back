import { MessageRequest, MessageResponse, GetPagination } from '@controller/schema'
import { tags } from '@controller/swagger/tags'
import { badRequestSchema, unauthorizedSchema, forbidenSchema, badResquestError, unauthorizedError, forbidenError } from '@controller/swagger/error'
import { formattingBody } from '@controller/swagger/formatting'
const createMessageSwagger = {
    tags: [tags.message.name],
    description: "Create new message",
    requestBody: formattingBody({ description: "message we want to create", schema: MessageRequest }),
    produces: ["application/json"],
    responses: {
        200: {
            ...formattingBody({ description: "New message is created", schema: MessageResponse })
        },
        400: { ...formattingBody({ description: badResquestError, schema: badRequestSchema }) },
        401: { ...formattingBody({ description: unauthorizedError, schema: unauthorizedSchema }) },
        403: { ...formattingBody({ description: forbidenError, schema: forbidenSchema }) },
    }
}
export { createMessageSwagger }