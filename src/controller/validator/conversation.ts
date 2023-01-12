import { requestType } from "@controller/routes/type"
import { ValidationError } from 'joi'
import { createError } from '@src/createError'
import {
    CreateConversationRequest,
    AddUserRequest,
    UpdateConversationRequest,
    AddUserRequestType, UpdateConversationRequestType, ConversationRequestType
} from "@controller/schema"
export class ConversationValidator {
    async create(req: requestType<ConversationRequestType>) {
        try {
            await CreateConversationRequest.validateAsync(req.body, {
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
    async update(req: requestType<UpdateConversationRequestType>) {
        try {
            await UpdateConversationRequest.validateAsync(req.body, {
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
    async addUser(req: requestType<AddUserRequestType>) {
        try {
            await AddUserRequest.validateAsync(req.body, {
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