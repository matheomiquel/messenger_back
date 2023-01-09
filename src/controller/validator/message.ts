import { Message } from "@src/domain/model"
import { requestType } from "../routes/type"
import { ValidationError } from 'joi'
import { createError } from '@src/createError'
import { MessageRequest } from "@controller/schema"
export class MessageValidator {
    async create(req: requestType<Message>) {
        try {
            await MessageRequest.validateAsync(req.body, {
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