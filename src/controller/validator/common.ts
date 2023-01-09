import { Message } from "@src/domain/model"
import { requestType } from "../routes/type"
import { ValidationError } from 'joi'
import { createError } from '@src/createError'
import { GetById } from "@controller/schema"
export class CommonValidator {
    async id(req: requestType<Message>) {
        try {
            await GetById.validateAsync(req.params, {
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