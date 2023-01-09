export class MessageDB {
    id: number
    user_id: number
    content: string
    createdAt: Date
    updatedAt: Date
    constructor({ id, user_id, content, createdAt, updatedAt }:
        {
            id: number, user_id: number, content: string, createdAt: Date, updatedAt: Date
        }) {
        this.id = id
        this.user_id = user_id
        this.content = content
        this.createdAt = createdAt
        this.updatedAt = updatedAt
    }
}