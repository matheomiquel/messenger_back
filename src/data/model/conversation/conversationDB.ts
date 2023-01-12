export class ConversationDB {
    id: number
    name: string
    admin: number
    createdAt: Date
    updatedAt: Date
    constructor({ id, name, admin, createdAt, updatedAt }:
        {
            id: number, name: string, admin: number, createdAt: Date, updatedAt: Date
        }) {
        this.id = id
        this.name = name
        this.admin = admin
        this.createdAt = createdAt
        this.updatedAt = updatedAt
    }
}