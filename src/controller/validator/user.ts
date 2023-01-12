import { ValidationError } from 'joi'
import { RegisterSchemaBody, LoginSchemaBody } from '@controller/schema'
import { requestType } from '@controller/routes/type/requestType'
import { createError } from '@src/createError'
import { LoginTypeRequest, RegisterSchemaBodyType } from '../schema/user'
export class UserValidator {
    async register(req: requestType<RegisterSchemaBodyType>) {
        try {
            await RegisterSchemaBody.validateAsync(req.body, {
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

    async login(req: requestType<LoginTypeRequest>) {
        try {
            await LoginSchemaBody.validateAsync(req.body, {
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