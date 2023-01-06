export class UserDB {
    id: number
    name: string
    email: string
    password: string
    createdAt: Date
    updatedAt: Date
    constructor({ id, name, email, password, createdAt, updatedAt, }:
        { id: number, name: string, email: string, password: string,  createdAt: Date, updatedAt: Date }
    ) {
        this.id = id
        this.name = name
        this.email = email
        this.password = password
        this.createdAt = createdAt
        this.updatedAt = updatedAt
    }
}