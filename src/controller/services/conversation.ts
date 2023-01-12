import { UserDomain } from '@domain/services'
import { requestType, responseType } from '@controller/routes/type';
import { CommonValidator, ConversationValidator } from '@controller/validator';
import { ConversationDomain } from '@src/domain/services/conversation';
import { AddUserRequestType, UpdateConversationRequestType, ConversationWithUsersRequestType, ConversationWithUsersResponseType } from '@controller/schema';
import { ConversationRequestType, ConversationResponseType } from '@controller/schema/conversation';
export class ConversationService {
    private readonly conversationDomain: ConversationDomain
    private readonly userDomain: UserDomain
    private readonly conversationValidator: ConversationValidator
    private readonly commonValidator: CommonValidator
    constructor({ conversationDomain, userDomain, conversationValidator, commonValidator }:
        { conversationDomain: ConversationDomain, userDomain: UserDomain, conversationValidator: ConversationValidator, commonValidator: CommonValidator }) {
        this.conversationDomain = conversationDomain;
        this.userDomain = userDomain;
        this.conversationValidator = conversationValidator;
        this.commonValidator = commonValidator;
    }
    async read(req: requestType<undefined>): responseType<200, ConversationResponseType[]> {
        const messageData = {
            order: String(req.query.order || "ASC"),
            limit: Number(req.query.limit) || 10,
            offset: Number(req.query.offset) || 0
        }
        const users = await this.conversationDomain.read(messageData);
        return { status: 200, data: users }
    }
    async readConversationByUserId(req: requestType<ConversationWithUsersRequestType>): responseType<200, ConversationWithUsersResponseType> {
        await this.commonValidator.id(req.params)
        const decodedToken = await this.userDomain.getToken({ token: String(req.token) })
        const users = await this.conversationDomain.getConversationWithUser({ userId: decodedToken.id, conversationId: req.params.id });
        return { status: 200, data: users }
    }

    async create(req: requestType<ConversationRequestType>): responseType<201, ConversationResponseType> {
        await this.conversationValidator.create(req);
        const decodedToken = await this.userDomain.getToken({ token: String(req.token) })
        const message = await this.conversationDomain.create({ userId: decodedToken.id, name: req.body.name })
        return { status: 201, data: message }
    }

    async update(req: requestType<UpdateConversationRequestType>): responseType<204, undefined> {
        Promise.all([
            await this.commonValidator.id(req.params),
            await this.conversationValidator.update(req)
        ])
        const decodedToken = await this.userDomain.getToken({ token: String(req.token) })
        await this.conversationDomain.update({ id: req.params.id, userId: decodedToken.id, name: req.body.name })
        return { status: 204, data: undefined }
    }


    async delete(req: requestType<undefined>): responseType<204, undefined> {
        await this.commonValidator.id(req.params)
        const decodedToken = await this.userDomain.getToken({ token: String(req.token) })
        await this.conversationDomain.delete({ id: req.params.id, user_id: decodedToken.id });
        return { status: 204, data: undefined }
    }

    async addUserToConversation(req: requestType<AddUserRequestType>): responseType<204, undefined> {
        await this.conversationValidator.addUser(req);
        const decodedToken = await this.userDomain.getToken({ token: String(req.token) })
        await this.conversationDomain.addUser({ tokenId: decodedToken.id, userId: req.body.userId, conversationId: req.body.conversationId })
        return { status: 204, data: undefined }
    }
    async removeUserFromConversation(req: requestType<AddUserRequestType>): responseType<204, undefined> {
        await this.conversationValidator.addUser(req);
        const decodedToken = await this.userDomain.getToken({ token: String(req.token) })
        await this.conversationDomain.removeUser({ tokenId: decodedToken.id, userId: req.body.userId, conversationId: req.body.conversationId })
        return { status: 204, data: undefined }
    }
}

