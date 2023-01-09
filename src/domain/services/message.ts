import { MessageInterface } from "@domain/interface/message";
import { Message } from "@domain/model";
import { createError } from "@src/createError";

export class MessageDomain {
    private readonly messageProvider: MessageInterface
    constructor({ messageProvider }: { messageProvider: MessageInterface }) {
        this.messageProvider = messageProvider
    }
    async read({ order, limit, offset }: { order: string, limit: number, offset: number }): Promise<Message[]> {
        return await this.messageProvider.read({ order, limit, offset })
    }

    async create({ user_id, content }: { user_id: number, content: string }): Promise<Message> {
        return await this.messageProvider.create({ user_id, content })
    }

    async update({ id, user_id, content }: { id: number, user_id: number, content: string }): Promise<void> {
        const message = await this.messageProvider.getById({ id })
        if (message.user_id !== user_id) {
            throw await createError({ message: ["you aren't the author"], status: 403 })
        }
        await this.messageProvider.update({ id, content });
    }

    async delete({ id, user_id }: { id: number, user_id: number }): Promise<void> {
        const message = await this.messageProvider.getById({ id })
        if (message.user_id != user_id) {
            throw await createError({ message: ["you aren't the author"], status: 403 })

        }
        await this.messageProvider.delete({ id });
    }
}