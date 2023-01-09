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
        return messageDB.map((mess =>
            new Message({ id: mess.id, user_id: mess.user_id, content: mess.content })
        ))
    }

    async getById({ id }: { id: number }): Promise<Message> {
        const message = await MessageModel.findByPk(id) as unknown as MessageDB
        if (!message) {
            throw await createError({ message: ['Message not found'], status: 404 })
        }
        return new Message({ id: message.id, content: message.content, user_id: message.user_id })
    }

    async create({ user_id, content }: { user_id: number; content: string; }): Promise<Message> {
        const message = await MessageModel.create({
            user_id,
            content
        }) as unknown as MessageDB;
        return new Message({ id: message.id, user_id: message.user_id, content: message.content })
    }

    async update({ id, content }: { id: number; content: string; }): Promise<void> {
        const message = await MessageModel.update({
            content: content
        },
            {
                where: {
                    id: id,
                }
            }) as unknown as MessageDB;
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