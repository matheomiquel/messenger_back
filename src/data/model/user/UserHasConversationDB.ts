export class UserHasConversationDB {
    user_id: number
    conversation_id: number
    createdAt: Date
    updatedAt: Date
    constructor({ user_id, conversation_id, email, password, createdAt, updatedAt, }:
        { user_id: number, conversation_id: number, email: string, password: string, createdAt: Date, updatedAt: Date }
    ) {
        this.user_id = user_id
        this.conversation_id = conversation_id
        this.createdAt = createdAt
        this.updatedAt = updatedAt
    }
}