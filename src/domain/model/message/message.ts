export class Message {
    id: number
    userId: number
    content: string
    conversationId: number
    constructor({ id, userId, content, conversationId }: { id: number, userId: number, content: string, conversationId: number }) {
        this.id = id
        this.userId = userId
        this.content = content
        this.conversationId = conversationId
    }
}