export class Message {
    id: number
    user_id: number
    content: string
    constructor({ id, user_id, content }: { id: number, user_id: number, content: string }) {
        this.id = id
        this.user_id = user_id
        this.content = content
    }
}