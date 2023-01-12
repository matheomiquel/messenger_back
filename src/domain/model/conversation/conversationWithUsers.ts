import { User } from "@domain/model"

export class ConversationWithUsers {
    id: number
    name: string
    admin: number
    users: User[]
    constructor({ id, name, admin, users }: { id: number, name: string, admin: number, users: User[] }) {
        this.id = id
        this.name = name
        this.admin = admin
        this.users = users.length ? users.map((user) => new User({ id: user.id, email: user.email, name: user.name })) : []
    }
}