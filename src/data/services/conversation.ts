import { ConversationDB, conversationWithMessageDB, ConversationWithUsersDB } from "@data/model";
import {
  ConversationModel, MessageModel, UserHasConverstionModel, UserModel
} from "@data/sequelizeModel";
import { ConversationInterface } from "@domain/interface";
import { createError } from "@src/createError";
import { Conversation, ConversationWithUsers } from "@src/domain/model";
import { ConversationWithMessages } from "@src/domain/model/conversation/conversationWithMessage";
export class ConversationData implements ConversationInterface {
  private readonly conversationModel: typeof ConversationModel;

  private readonly userHasConverstionModel: typeof UserHasConverstionModel;

  constructor({ conversationModel, userHasConverstionModel }: {
    conversationModel: typeof ConversationModel,
    userHasConverstionModel: typeof UserHasConverstionModel
  }) {
    this.userHasConverstionModel = userHasConverstionModel;
    this.conversationModel = conversationModel;
  }

  async read({ order, limit, offset }:
    { order: string, limit: number, offset: number }): Promise<Conversation[]> {
    const conversationDB = await this.conversationModel.findAll({
      offset,
      limit,
      order: [["createdAt", order]]
    }) as unknown as Conversation[];
    return conversationDB.map((conversation => new Conversation(
      { id: conversation.id, name: conversation.name, admin: conversation.admin }
    )
    ));
  }

  async getById({ id }: { id: number }): Promise<Conversation> {
    const conversation = await this.conversationModel.findByPk(id) as unknown as ConversationDB;
    if (!conversation) {
      throw await createError({ message: ["Conversation not found"], status: 404 });
    }
    return new Conversation({
      id: conversation.id, name: conversation.name, admin: conversation.admin
    });
  }

  async getConversationWithUser({ id }: { id: number }): Promise<ConversationWithUsers> {
    const conversationWithUserDB = await this.conversationModel.findByPk(id, {
      include: [{
        as: "conversation_has_user",
        model: UserModel
      }]
    }) as unknown as ConversationWithUsersDB;
    if (!conversationWithUserDB) throw await createError({ message: ["conversation not found"], status: 404 });
    const conversation = new ConversationWithUsers({
      id: conversationWithUserDB.id,
      name: conversationWithUserDB.name,
      admin: conversationWithUserDB.admin,
      users: conversationWithUserDB.conversation_has_user
    });
    return conversation;
  }

  async getConversationWithMessage({ id, limit, offset }: {
    id: number,
    limit: number,
    offset: number
  }): Promise<ConversationWithMessages> {
    const conversationWithUserDB = await this.conversationModel.findByPk(id, {
      include: [{
        as: "conversation_messages",
        model: MessageModel,
        separate: true,
        limit,
        offset
      }]
    }) as unknown as conversationWithMessageDB;
    if (!conversationWithUserDB) throw await createError({ message: ["conversation not found"], status: 404 });
    const conversation = new ConversationWithMessages({
      id: conversationWithUserDB.id,
      name: conversationWithUserDB.name,
      admin: conversationWithUserDB.admin,
      messages: conversationWithUserDB.conversation_messages
    });
    return conversation;
  }

  async create({ userId, name }: { userId: number; name: string; }): Promise<Conversation> {
    const conversation = await this.conversationModel.create({
      admin: userId,
      name
    }) as unknown as ConversationDB;
    await UserHasConverstionModel.create({
      user_id: userId,
      conversation_id: conversation.id
    });
    return new Conversation({
      id: conversation.id, name: conversation.name, admin: conversation.admin
    });
  }

  async update({ id, name }: { id: number; name: string; }): Promise<void> {
    await this.conversationModel.update(
      {
        name: name
      },
      {
        where: {
          id: id
        }
      }
    );
  }

  async delete({ id }: { id: number; }): Promise<void> {
    await UserHasConverstionModel.destroy({
      where: {
        conversation_id: id
      }
    });
    await this.conversationModel.destroy(
      {
        where: {
          id: id
        }
      }
    );
  }

  async addUser({ userId, conversationId }:
    { userId: number; conversationId: number; }): Promise<void> {
    await this.userHasConverstionModel.create({
      user_id: userId,
      conversation_id: conversationId
    });
  }

  async removeUser({ userId, conversationId }:
    { userId: number; conversationId: number; }): Promise<void> {
    await this.userHasConverstionModel.destroy({
      where: {
        user_id: userId,
        conversation_id: conversationId
      }
    });
  }
}
