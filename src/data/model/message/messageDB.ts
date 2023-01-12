export class MessageDB {
    id: number
    user_id: number
    content: string
    conversation_id: number
    createdAt: Date
    updatedAt: Date
    constructor({ id, user_id, content, conversation_id, createdAt, updatedAt }:
        {
            id: number, user_id: number, content: string, conversation_id: number, createdAt: Date, updatedAt: Date
        }) {
        this.id = id
        this.user_id = user_id
        this.content = content
        this.conversation_id = conversation_id
        this.createdAt = createdAt
        this.updatedAt = updatedAt
    }
}