import { UserDB } from "./userDB"

export class UserWithFriendDB {
    id: number
    name: string
    email: string
    password: string
    friend: UserDB[]
    constructor({ id, name, email, password, friend
    }: {
            id: number, name: string, email: string, password: string,
            friend: UserDB[],
        }) {
        this.id = id
        this.name = name
        this.email = email
        this.password = password
        this.friend = friend
    }
}