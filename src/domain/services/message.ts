import { MessageInterface, ConversationInterface } from "@domain/interface";
import { Message } from "@domain/model";
import { createError } from "@src/createError";

export class MessageDomain {
    private readonly messageProvider: MessageInterface
    private readonly conversationProvider: ConversationInterface
    constructor({ messageProvider, conversationProvider }: { messageProvider: MessageInterface, conversationProvider: ConversationInterface }) {
        this.conversationProvider = conversationProvider
        this.messageProvider = messageProvider
    }
    async read({ order, limit, offset }: { order: string, limit: number, offset: number }): Promise<Message[]> {
        return await this.messageProvider.read({ order, limit, offset })
    }

    async create({ userId, content, conversationId }: { userId: number, content: string, conversationId: number }): Promise<Message> {
        const conversationWithUser = await this.conversationProvider.getConversationWithUser({ id: conversationId });
        if (conversationWithUser.users.every(((user) => user.id !== userId)))
            throw await createError({ message: ["you can't write message in this conversation"], status: 403 })
        return await this.messageProvider.create({ userId, content, conversationId })
    }

    async update({ id, userId, content }: { id: number, userId: number, content: string }): Promise<void> {
        const message = await this.messageProvider.getById({ id })
        if (message.userId !== userId) {
            throw await createError({ message: ["you aren't the author"], status: 403 })
        }
        await this.messageProvider.update({ id, content });
    }

    async delete({ id, userId }: { id: number, userId: number }): Promise<void> {
        const message = await this.messageProvider.getById({ id })
        if (message.userId != userId) {
            throw await createError({ message: ["you aren't the author"], status: 403 })

        }
        await this.messageProvider.delete({ id });
    }
}