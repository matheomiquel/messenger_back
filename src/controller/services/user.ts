import { requestType, responseType } from "@controller/routes/type";
import {
  LoginTypeRequest,
  LoginTypeResponse,
  RegisterSchemaBodyType,
  UserResponseType,
  UserWithTokenResponseType
} from "@controller/schema/user";
import { CommonValidator, UserValidator } from "@controller/validator";
import { UserDomain } from "@domain/services";
import { UserWithToken } from "@src/domain/model";
import { hash } from "bcrypt";

import { ConversationResponseType } from "../schema";
export class UserService {
  private readonly userDomain: UserDomain;

  private readonly userValidator: UserValidator;

  private readonly commonValidator: CommonValidator;

  constructor({ userDomain, userValidator, commonValidator }:
    { userDomain: UserDomain, userValidator: UserValidator, commonValidator: CommonValidator }) {
    this.userDomain = userDomain;
    this.userValidator = userValidator;
    this.commonValidator = commonValidator;
  }

  async getAll(req: requestType<undefined>): responseType<200, UserResponseType[]> {
    const getUserData = {
      order: String(req.query.order || "ASC"),
      limit: Number(req.query.limit) || 10,
      offset: Number(req.query.offset) || 0
    };
    const users = await this.userDomain.getAll(getUserData);
    return { status: 200, data: users };
  }

  async register(req: requestType<RegisterSchemaBodyType>):
    responseType<201, UserWithTokenResponseType> {
    await this.userValidator.register(req);
    const registerData = {
      name: req.body.name,
      email: req.body.email,
      password: await hash(String(req.body.password), Number(process.env.SALT))
    };
    const user = await this.userDomain.register(registerData);
    const token = await UserDomain.createToken({ id: user.id });
    return { status: 201, data: new UserWithToken({ ...user, token }) };
  }

  async login(req: requestType<LoginTypeRequest>): responseType<200, LoginTypeResponse> {
    await this.userValidator.login(req);
    const loginData = {
      email: req.body.email,
      password: req.body.password
    };
    const user = await this.userDomain.login(loginData);
    const token = await UserDomain.createToken({ id: user.id });
    return { status: 200, data: { user, token } };
  }

  async getById(req: requestType<undefined>): responseType<200, UserResponseType> {
    await this.commonValidator.id(req.params);
    const user = await this.userDomain.getById({ id: req.params.id });
    return { status: 200, data: user };
  }

  async getByToken(req: requestType<undefined>): responseType<200, UserResponseType> {
    const decodedToken = await UserDomain.getToken({ token: String(req.token) });
    const user = await this.userDomain.getById({ id: decodedToken.id });
    return { status: 200, data: user };
  }

  async getConversation(req: requestType<undefined>):
    responseType<200, ConversationResponseType[]> {
    const decodedToken = await UserDomain.getToken({ token: String(req.token) });
    const user = await this.userDomain.getConversation({ id: decodedToken.id });
    return { status: 200, data: user };
  }
}
