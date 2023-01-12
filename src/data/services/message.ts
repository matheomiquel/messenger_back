import { MessageInterface } from "@domain/interface";
import { MessageModel } from "@data/sequelizeModel/message";
import { Message } from "@src/domain/model";
import { MessageDB } from "@data/model";
import { createError } from "@src/createError";
export class MessageData implements MessageInterface {
    async read({ order, limit, offset }: { order: string, limit: number, offset: number }): Promise<Message[]> {
        const messageDB = await MessageModel.findAll({
            offset,
            limit,
            order: [['createdAt', order]],
        }) as unknown as MessageDB[];
        return messageDB.map((message =>
            new Message({ id: message.id, userId: message.user_id, content: message.content, conversationId: message.conversation_id })
        ))
    }

    async getById({ id }: { id: number }): Promise<Message> {
        const message = await MessageModel.findByPk(id) as unknown as MessageDB
        if (!message) {
            throw await createError({ message: ['Message not found'], status: 404 })
        }
        return new Message({ id: message.id, content: message.content, userId: message.user_id, conversationId: message.conversation_id })
    }

    async create({ userId, content, conversationId }: { userId: number; content: string; conversationId: number }): Promise<Message> {
        const message = await MessageModel.create({
            user_id: userId,
            content,
            conversation_id: conversationId
        }) as unknown as MessageDB;
        return new Message({ id: message.id, userId: message.user_id, content: message.content, conversationId: message.conversation_id })
    }

    async update({ id, content }: { id: number; content: string; }): Promise<void> {
        await MessageModel.update({
            content: content
        },
            {
                where: {
                    id: id,
                }
            })
    }

    async delete({ id }: { id: number; }): Promise<void> {
        await MessageModel.destroy(
            {
                where: {
                    id: id,
                }
            })
    }
}