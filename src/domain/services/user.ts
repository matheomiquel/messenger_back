
import { ErrorType } from '@src/errorType';
import { sign, decode, JwtPayload } from 'jsonwebtoken'
import { UserInterface } from '../interface';
import { User } from '../model';
export class UserDomain {
  private readonly userProvider: UserInterface
  constructor({ userProvider }: { userProvider: UserInterface }) {
    this.userProvider = userProvider;
  }
  async getAll({ order, limit, offset }: { order: string, limit: number, offset: number }): Promise<User[]> {
    return await this.userProvider.getAll({ order, limit, offset });
  }

  async getById({ id }: { id: number }): Promise<User> {
    return this.userProvider.getById({ id })
}

  async register({ name, email, password }: { name: string, email: string, password: string }): Promise<User> {
    const created = await this.userProvider.getByEmail({ email })
    if (created) {
      throw { status: 409, message: ['email already taken'] } as ErrorType
    }
    return this.userProvider.register({ name, email, password })
  }

  async login({ email, password }: { email: string, password: string }): Promise<User> {
    return this.userProvider.login({ email, password })
}

  async createToken({ id }: { id: number }): Promise<string> {
    return sign({ id }, String(process.env.PRIVATE_KEY))
  }

  async getToken({ token }: { token: string }): Promise<JwtPayload> {
    return decode(String(token)) as JwtPayload
}
}
