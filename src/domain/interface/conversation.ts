import { Conversation, ConversationWithUsers } from "@domain/model";

export interface ConversationInterface {
    read({ order, limit, offset }:
        { order: string, limit: number, offset: number }): Promise<Conversation[]>
    getConversationWithUser({ id }: { id: number }): Promise<ConversationWithUsers>
    getById({ id }: { id: number }): Promise<Conversation>
    create({ userId, name }: { userId: number; name: string; }): Promise<Conversation>
    update({ id, name }: { id: number; name: string; }): Promise<void>
    delete({ id }: { id: number }): Promise<void>
    addUser({ userId, conversationId }: { userId: number, conversationId: number }): Promise<void>
    removeUser({ userId, conversationId }:
        { userId: number, conversationId: number }): Promise<void>
}
