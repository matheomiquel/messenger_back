import { User } from "@domain/model/user"

export class ConversationWithUsersDB {
    id: number
    name: string
    admin: number
    createdAt: Date
    updatedAt: Date
    conversation_has_user: User[]
    constructor({ id, name, admin, createdAt, updatedAt, conversation_has_user }:
        { id: number, name: string, admin: number, createdAt: Date, updatedAt: Date, conversation_has_user: User[] }) {
        this.id = id
        this.name = name
        this.admin = admin
        this.createdAt = createdAt
        this.updatedAt = updatedAt
        this.conversation_has_user = conversation_has_user
    }
}