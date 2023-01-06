export class UserHasUserDB {
    user_id: number
    friend_id: number
    state: 'SEND' | 'ACCEPTED'
    createdAt: Date
    updatedAt: Date
    constructor({ user_id, friend_id, state, createdAt, updatedAt, }:
        { user_id: number, friend_id: number, state: 'SEND' | 'ACCEPTED', createdAt: Date, updatedAt: Date }) {
        this.user_id = user_id
        this.friend_id = friend_id
        this.state = state
        this.createdAt = createdAt
        this.updatedAt = updatedAt
    }
}