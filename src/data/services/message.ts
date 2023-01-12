import { MessageDB } from "@data/model";
import { MessageModel } from "@data/sequelizeModel/message";
import { MessageInterface } from "@domain/interface";
import { createError } from "@src/createError";
import { Message } from "@src/domain/model";
export class MessageData implements MessageInterface {
  private readonly messageModel: typeof MessageModel;

  constructor({ messageModel }: { messageModel: typeof MessageModel }) {
    this.messageModel = messageModel;
  }

  async read({ order, limit, offset }:
    { order: string, limit: number, offset: number }): Promise<Message[]> {
    const messageDB = await this.messageModel.findAll({
      offset,
      limit,
      order: [["createdAt", order]]
    }) as unknown as MessageDB[];
    return messageDB.map((mess => new Message({
      id: mess.id, userId: mess.user_id, content: mess.content, conversationId: mess.conversation_id
    })
    ));
  }

  async getById({ id }: { id: number }): Promise<Message> {
    const message = await this.messageModel.findByPk(id) as unknown as MessageDB;
    if (!message) {
      throw await createError({ message: ["Message not found"], status: 404 });
    }
    return new Message({
      id: message.id,
      content: message.content,
      userId: message.user_id,
      conversationId: message.conversation_id
    });
  }

  async create({ userId, content, conversationId }:
    { userId: number; content: string; conversationId: number }): Promise<Message> {
    const message = await this.messageModel.create({
      user_id: userId,
      content,
      conversation_id: conversationId
    }) as unknown as MessageDB;
    return new Message({
      id: message.id,
      userId: message.user_id,
      content: message.content,
      conversationId: message.conversation_id
    });
  }

  async update({ id, content }: { id: number; content: string; }): Promise<void> {
    await this.messageModel.update(
      {
        content: content
      },
      {
        where: {
          id: id
        }
      }
    );
  }

  async delete({ id }: { id: number; }): Promise<void> {
    await this.messageModel.destroy(
      {
        where: {
          id: id
        }
      }
    );
  }
}
