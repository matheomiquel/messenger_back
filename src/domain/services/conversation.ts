import { ConversationInterface, UserInterface } from "@domain/interface";
import { Conversation, ConversationWithUsers, User } from "@domain/model";
import { createError } from "@src/createError";

export class ConversationDomain {
    private readonly conversationProvider: ConversationInterface
    private readonly userProvider: UserInterface
    constructor({ conversationProvider, userProvider }: { conversationProvider: ConversationInterface, userProvider: UserInterface }) {
        this.conversationProvider = conversationProvider
        this.userProvider = userProvider
    }
    async read({ order, limit, offset }: { order: string, limit: number, offset: number }): Promise<Conversation[]> {
        return await this.conversationProvider.read({ order, limit, offset })
    }
    async getConversationWithUser({ userId, conversationId }: { userId: number, conversationId: number }): Promise<ConversationWithUsers> {
        const conversation = await this.conversationProvider.getConversationWithUser({ id: conversationId })
        if (conversation.users.every(((user) => user.id !== userId)))
            throw await createError({ message: ["you don't have acces to this information"], status: 403 })
        return conversation
    }

    async create({ userId, name }: { userId: number, name: string }): Promise<Conversation> {
        return await this.conversationProvider.create({ userId, name })
    }

    async update({ id, userId, name }: { id: number, userId: number, name: string }): Promise<void> {
        const conversation = await this.conversationProvider.getById({ id })
        if (conversation.admin !== userId) {
            throw await createError({ message: ["you aren't the admin"], status: 403 })
        }
        await this.conversationProvider.update({ id, name });
    }

    async delete({ id, user_id }: { id: number, user_id: number }): Promise<void> {
        const conversation = await this.conversationProvider.getById({ id })
        if (conversation.admin != user_id) {
            throw await createError({ message: ["you aren't the admin"], status: 403 })

        }
        await this.conversationProvider.delete({ id });
    }

    async addUser({ tokenId, userId, conversationId }: { tokenId: number, userId: number, conversationId: number }): Promise<void> {

        const [_, conversationWithUser] = await Promise.all([
            await this.userProvider.getById({ id: userId }),
            await this.conversationProvider.getConversationWithUser({ id: conversationId })
        ])
        await this.checkRightForUpdateMembers({ userId, tokenId, users: conversationWithUser.users })
        await this.conversationProvider.addUser({ userId, conversationId });
    }

    async removeUser({ tokenId, userId, conversationId }: { tokenId: number, userId: number, conversationId: number }): Promise<void> {
         const [_, conversationWithUser] = await Promise.all([
             await this.userProvider.getById({ id: userId }),
             await this.conversationProvider.getConversationWithUser({ id: conversationId })
         ])
         if (conversationWithUser.admin !== tokenId && userId !== tokenId)
             throw await createError({ message: ["you can't remothis this user"], status: 403 })
        await this.conversationProvider.removeUser({ userId, conversationId });
    }

    private async checkRightForUpdateMembers({ userId, tokenId, users }: { userId: number, tokenId: number, users: User[] }): Promise<void> {
        let userCanAdd = true;
        let userAlreadyInConversation = false;
        for (let i = 0; i < users.length; i++) {
            if (users[i].id === userId) {
                userAlreadyInConversation = true
                break;
            }
            if (users[i].id === tokenId) {
                userCanAdd = false
                break;
            }
        }
        if (userCanAdd)
            throw await createError({ message: ["you can't add someone in this conversation"], status: 403 })
        if (userAlreadyInConversation)
            throw await createError({ message: ["this user is already in this conversation"], status: 409 })
    }
}