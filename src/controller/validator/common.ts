import { ValidationError } from 'joi'
import { createError } from '@src/createError'
import { GetById } from "@controller/schema"
export class CommonValidator {
    async id(params: Object) {
        try {
            await GetById.validateAsync(params, {
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