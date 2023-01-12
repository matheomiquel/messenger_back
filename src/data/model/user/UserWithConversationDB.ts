import { ConversationDB } from "../conversation"

export class UserWithConversationDB {
    user_id: number
    conversation_id: number
    user_conversation: ConversationDB[]
    createdAt: Date
    updatedAt: Date
    constructor({ user_id, conversation_id, user_conversation, createdAt, updatedAt, }:
        { user_id: number, conversation_id: number, user_conversation: ConversationDB[], createdAt: Date, updatedAt: Date }) {
        this.user_id = user_id
        this.conversation_id = conversation_id
        this.user_conversation = user_conversation
        this.createdAt = createdAt
        this.updatedAt = updatedAt
    }
}