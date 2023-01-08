import { UserInterface } from "@src/domain/interface";
import { User } from "@src/domain/model";
import { UserDB } from "@data/model";
import { UserModel } from "@data/sequelizeModel";
import { createError } from "@src/createError";
import { compareSync } from 'bcrypt';

export class UserData implements UserInterface {
    async getAll({ order, limit, offset }: { order: string, limit: number, offset: number }): Promise<User[]> {
        const users = await UserModel.findAll({
            offset,
            limit,
            order: [['createdAt', order]],
        }) as unknown as UserDB[]
        return users.map(user => {
            return new User({ id: user.id, name: user.name, email: user.email })
        })
    }

    async getById({ id }: { id: number }): Promise<User> {
        try {
            const user = await UserModel.findByPk(id) as unknown as UserDB
            return new User({ id: user.id, name: user.name, email: user.email })

        } catch (e) {
            console.log(e)
            throw await createError({ message: ['user not found'], status: 404 })
        }
    }

    async getByEmail({ email }: { email: string }): Promise<User | null> {
        const user = await UserModel.findOne({
            where: {
                email
            }
        }) as unknown as UserDB
        if (user) {
            return new User({ id: user.id, name: user.name, email: user.email })
        }
        return null
    }

    async register({ name, email, password }: { name: string, email: string, password: string }): Promise<User> {
        const user = await UserModel.create({
            name,
            email,
            password,
        }) as unknown as UserDB
        return new User({ id: user.id, name: user.name, email: user.email })
    }

    async login({ email, password }: { email: string, password: string }): Promise<User> {
        const user = await UserModel.findOne({
            where: {
                email
            }
        }) as unknown as UserDB
        if (!user || !compareSync(password, user.password)) {
            throw await createError({ message: ['user not found'], status: 404 })
        }
        return new User({ id: user.id, name: user.name, email: user.email })
    }
}