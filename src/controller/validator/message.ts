import { requestType } from "../routes/type"
import { ValidationError } from 'joi'
import { createError } from '@src/createError'
import { CreateMessageRequest, UpdateMessageRequestType, CreateMessageRequestType, UpdateMessageRequest } from "@controller/schema"
export class MessageValidator {
    async create(req: requestType<CreateMessageRequestType>) {
        try {
            await CreateMessageRequest.validateAsync(req.body, {
                abortEarly: false
            })
        } catch (e) {
            const errors = e as ValidationError
            throw await createError({
                message: errors.details.map((error) => error.message),
                status: 400
            })
        }
    }
    async update(req: requestType<UpdateMessageRequestType>) {
        try {
            await UpdateMessageRequest.validateAsync(req.body, {
                abortEarly: false
            })
        } catch (e) {
            const errors = e as ValidationError
            throw await createError({
                message: errors.details.map((error) => error.message),
                status: 400
            })
        }
    }
}