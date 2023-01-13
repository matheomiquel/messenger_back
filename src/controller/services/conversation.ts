import { requestType, responseType } from "@controller/routes/type";
import {
  AddUserRequestType, ConversationWithUsersRequestType, ConversationWithUsersResponseType,
  UpdateConversationRequestType
} from "@controller/schema";
import { ConversationRequestType, ConversationResponseType, ConversationWithMessagesResponseType } from "@controller/schema/conversation";
import { CommonValidator, ConversationValidator } from "@controller/validator";
import { UserDomain } from "@domain/services";
import { ConversationDomain } from "@src/domain/services/conversation";
export class ConversationService {
  private readonly conversationDomain: ConversationDomain;

  private readonly conversationValidator: ConversationValidator;

  private readonly commonValidator: CommonValidator;

  constructor({
    conversationDomain, conversationValidator, commonValidator
  }:
    {
      conversationDomain: ConversationDomain,
      conversationValidator: ConversationValidator,
      commonValidator: CommonValidator
    }) {
    this.conversationDomain = conversationDomain;
    this.conversationValidator = conversationValidator;
    this.commonValidator = commonValidator;
  }

  async read(req: requestType<undefined>): responseType<200, ConversationResponseType[]> {
    const messageData = {
      order: String(req.query.order || "ASC"),
      limit: Number(req.query.limit) || 10,
      offset: Number(req.query.offset) || 0
    };
    const users = await this.conversationDomain.read(messageData);
    return { status: 200, data: users };
  }

  async getConversationWithUser(req: requestType<ConversationWithUsersRequestType>):
    responseType<200, ConversationWithUsersResponseType> {
    await this.commonValidator.id(req.params);
    const decodedToken = await UserDomain.getToken({ token: String(req.token) });
    const conversation = await this.conversationDomain.getConversationWithUser({
      userId: decodedToken.id, conversationId: req.params.id
    });
    return { status: 200, data: conversation };
  }

  async getConversationWIthMessage(req: requestType<ConversationWithUsersRequestType>):
    responseType<200, ConversationWithMessagesResponseType> {
    const getConversationData = {
      limit: Number(req.query.limit) || 10,
      offset: Number(req.query.offset) || 0
    };
    await this.commonValidator.id(req.params);
    const decodedToken = await UserDomain.getToken({ token: String(req.token) });
    const conversation = await this.conversationDomain.getConversationWithMessage({
      userId: decodedToken.id,
      conversationId: req.params.id,
      ...getConversationData
    });
    return { status: 200, data: conversation };
  }

  async create(req: requestType<ConversationRequestType>):
    responseType<201, ConversationResponseType> {
    await this.conversationValidator.create(req);
    const decodedToken = await UserDomain.getToken({ token: String(req.token) });
    const message = await this.conversationDomain.create({
      userId: decodedToken.id, name: req.body.name
    });
    return { status: 201, data: message };
  }

  async update(req: requestType<UpdateConversationRequestType>): responseType<204, undefined> {
    Promise.all([
      await this.commonValidator.id(req.params),
      await this.conversationValidator.update(req)
    ]);
    const decodedToken = await UserDomain.getToken({ token: String(req.token) });
    await this.conversationDomain.update({
      id: req.params.id, userId: decodedToken.id, name: req.body.name
    });
    return { status: 204, data: undefined };
  }

  async delete(req: requestType<undefined>): responseType<204, undefined> {
    await this.commonValidator.id(req.params);
    const decodedToken = await UserDomain.getToken({ token: String(req.token) });
    await this.conversationDomain.delete({ id: req.params.id, userId: decodedToken.id });
    return { status: 204, data: undefined };
  }

  async addUserToConversation(req: requestType<AddUserRequestType>): responseType<204, undefined> {
    await this.conversationValidator.addUser(req);
    const decodedToken = await UserDomain.getToken({ token: String(req.token) });
    await this.conversationDomain.addUser({
      tokenId: decodedToken.id, userId: req.body.userId, conversationId: req.body.conversationId
    });
    return { status: 204, data: undefined };
  }

  async removeUserFromConversation(req: requestType<AddUserRequestType>):
    responseType<204, undefined> {
    await this.conversationValidator.addUser(req);
    const decodedToken = await UserDomain.getToken({ token: String(req.token) });
    await this.conversationDomain.removeUser({
      tokenId: decodedToken.id, userId: req.body.userId, conversationId: req.body.conversationId
    });
    return { status: 204, data: undefined };
  }
}
