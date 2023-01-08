import { ValidationError } from 'joi'
import { RegisterSchemaBody,LoginSchemaBody } from '@controller/schema'
import { User } from '@src/domain/model'
import { requestType } from '@controller/routes/type/requestType'
import {createError} from '@src/createError'
import { LoginTypeRequest } from '../schema/user'
export class UserValidator {
    async register(req: requestType<User>) {
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