import { User } from '../model'
export interface UserInterface {
    getAll({ order, limit, offset }: { order: string, limit: number, offset: number }): Promise<User[]>
    getById({ id }: { id: number }): Promise<User>
    getByEmail({ email }: { email: string }): Promise<User | null>
    register({ name, email, password }: { name: string, email: string, password: string }): Promise<User>
    login({ email, password }: { email: string, password: string }): Promise<User>
}