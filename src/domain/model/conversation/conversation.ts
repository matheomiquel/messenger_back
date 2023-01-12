export class Conversation {
    id: number
    name: string
    admin: number
    constructor({ id, name, admin }: { id: number, name: string, admin: number }) {
        this.id = id
        this.name = name
        this.admin = admin
    }
}