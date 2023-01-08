import { hash } from 'bcrypt'
import { UserDomain } from '@domain/services'
import { responseType } from "../routes/type"
import { requestType } from "@controller/routes/type"
import { User, UserWithToken } from '@src/domain/model';
import { UserValidator } from '../validator/user';
import { LoginTypeResponse, LoginTypeRequest } from '../schema/user';
export class UserService {
    private readonly userDomain: UserDomain
    private readonly userValidator: UserValidator
    constructor({ userDomain, userValidator }: { userDomain: UserDomain, userValidator: UserValidator }) {
        this.userDomain = userDomain;
        this.userValidator = userValidator;
    }
    async getAll(req: requestType<undefined>): responseType<200, User[]> {
        const getUserData = {
            order: String(req.query.order || "ASC"),
            limit: Number(req.query.limit) || 10,
            offset: Number(req.query.offset) || 0
        }
        const users = await this.userDomain.getAll(getUserData);
        return { status: 200, data: users }
    }

    async register(req: requestType<User>): responseType<201, UserWithToken> {
        await this.userValidator.register(req)
        const registerData = {
            name: req.body.name,
            email: req.body.email,
            password: await hash(String(req.body.password), Number(process.env.SALT)),
        }
        const user = await this.userDomain.register(registerData)
        const token = await this.userDomain.createToken({ id: user.id })
        return { status: 201, data: new UserWithToken({ ...user, token }) }
    }

    async login(req: requestType<LoginTypeRequest>): responseType<200, LoginTypeResponse> {
        await this.userValidator.login(req)
        const loginData = {
            email: req.body.email,
            password: req.body.password
        }
        const user = await this.userDomain.login(loginData)
        const token = await this.userDomain.createToken({ id: user.id })
        return { status: 200, data: { user, token } }

    }

    async getById(req: requestType<User>): responseType<200, User> {
        const user = await this.userDomain.getById({ id: req.params.id })
        return { status: 200, data: user }
    }

    async getByToken(req: requestType<undefined>): responseType<200, User> {
        const decodedToken = await this.userDomain.getToken({ token: String(req.token) })
        const user = await this.userDomain.getById({ id: decodedToken.id })
        return { status: 200, data: user }
    }
}

