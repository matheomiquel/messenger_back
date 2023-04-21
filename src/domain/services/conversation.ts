import { ConversationInterface, UserInterface } from "@domain/interface";
import { Conversation, ConversationWithMessages, ConversationWithUsers } from "@domain/model";
import { createError } from "@src/createError";

export class ConversationDomain {
  private readonly conversationProvider: ConversationInterface;

  private readonly userProvider: UserInterface;

  constructor({ conversationProvider, userProvider }:
    { conversationProvider: ConversationInterface, userProvider: UserInterface }) {
    this.conversationProvider = conversationProvider;
    this.userProvider = userProvider;
  }

  async read({ order, limit, offset }:
    { order: string, limit: number, offset: number }): Promise<Conversation[]> {
    return this.conversationProvider.read({ order, limit, offset });
  }

  async getConversationWithUser({ userId, conversationId }:
    { userId: number, conversationId: number }): Promise<ConversationWithUsers> {
    const conversationWithUser = await this.conversationProvider.getConversationWithUser(
      { id: conversationId }
    );
    if (conversationWithUser.users.every(((user) => user.id !== userId))) {
      throw await createError({ message: ["you don't have acces to this information"], status: 403 });
    }
    return conversationWithUser;
  }

  async getConversationWithMessage({
    userId, conversationId, limit, offset
  }:
    {
      userId: number,
      conversationId: number,
      limit: number,
      offset: number
    }):
    Promise<ConversationWithMessages> {
    await this.getConversationWithUser({ userId, conversationId });
    return this.conversationProvider.getConversationWithMessage({
      id: conversationId,
      limit,
      offset
    });
  }

  async create({ userId, name }: { userId: number, name: string }): Promise<Conversation> {
    return this.conversationProvider.create({ userId, name });
  }

  async update({ id, userId, name }: { id: number, userId: number, name: string }): Promise<void> {
    const conversation = await this.conversationProvider.getById({ id });
    if (conversation.admin !== userId) {
      throw await createError({ message: ["you aren't the admin"], status: 403 });
    }
    await this.conversationProvider.update({ id, name });
  }

  async delete({ id, userId }: { id: number, userId: number }): Promise<void> {
    const conversation = await this.conversationProvider.getById({ id });
    if (conversation.admin !== userId) {
      throw await createError({ message: ["you aren't the admin"], status: 403 });
    }
    await this.conversationProvider.delete({ id });
  }

  async addUser({ tokenId, userId, conversationId }:
    { tokenId: number, userId: number, conversationId: number }): Promise<void> {
    const [, conversationWithUser] = await Promise.all([
      await this.userProvider.getById({ id: userId }),
      await this.conversationProvider.getConversationWithUser({ id: conversationId })
    ]);
    if (!conversationWithUser.users.some((user) => user.id === tokenId)) throw await createError({ message: ["you can't add someone in this conversation"], status: 403 });
    if (conversationWithUser.users.some((user) => user.id === userId)) throw await createError({ message: ["this user is already in this conversation"], status: 409 });
    await this.conversationProvider.addUser({ userId, conversationId });
  }

  async removeUser({ tokenId, userId, conversationId }:
    { tokenId: number, userId: number, conversationId: number }): Promise<void> {
    const [, conversationWithUser] = await Promise.all([
      await this.userProvider.getById({ id: userId }),
      await this.conversationProvider.getConversationWithUser({ id: conversationId })
    ]);
    if (conversationWithUser.admin !== tokenId && userId !== tokenId) throw await createError({ message: ["you can't remothis this user"], status: 403 });
    await this.conversationProvider.removeUser({ userId, conversationId });
  }
}
