import { MessageDomain, UserDomain } from '@domain/services'
import { requestType, responseType } from '@controller/routes/type';
import { MessageValidator, CommonValidator } from '@controller/validator';
import { Message } from '@src/domain/model';
export class MessageService {
    private readonly messageDomain: MessageDomain
    private readonly userDomain: UserDomain
    private readonly messageValidator: MessageValidator
    private readonly commonValidator: CommonValidator
    constructor({ messageDomain, userDomain, messageValidator, commonValidator }:
        { messageDomain: MessageDomain, userDomain: UserDomain, messageValidator: MessageValidator, commonValidator: CommonValidator }) {
        this.messageDomain = messageDomain;
        this.userDomain = userDomain;
        this.messageValidator = messageValidator;
        this.commonValidator = commonValidator;
    }
    async read(req: requestType<undefined>): responseType<200, Message[]> {
        const messageData = {
            order: String(req.query.order || "ASC"),
            limit: Number(req.query.limit) || 10,
            offset: Number(req.query.offset) || 0
        }
        const users = await this.messageDomain.read(messageData);
        return { status: 200, data: users }
    }

    async create(req: requestType<Message>): responseType<200, Message> {
        await this.messageValidator.create(req);
        const decodedToken = await this.userDomain.getToken({ token: String(req.token) })
        const message = await this.messageDomain.create({ user_id: decodedToken.id, content: req.body.content })
        return { status: 200, data: message }
    }

    async update(req: requestType<undefined>): responseType<204, undefined> {
        Promise.all([
            await this.commonValidator.id(req),
            await this.messageValidator.create(req)
        ])
        const decodedToken = await this.userDomain.getToken({ token: String(req.token) })
        await this.messageDomain.update({ id: req.params.id, user_id: decodedToken.id, content: req.body.content })
        return { status: 204, data: undefined }
    }


    async delete(req: requestType<undefined>): responseType<204, undefined> {
        await this.commonValidator.id(req)
        const decodedToken = await this.userDomain.getToken({ token: String(req.token) })
        await this.messageDomain.delete({ id: req.params.id, user_id: decodedToken.id });
        return { status: 204, data: undefined }
    }
}

