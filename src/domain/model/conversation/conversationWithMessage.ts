import { Message } from "@domain/model";

export class ConversationWithMessages {
  id: number;

  name: string;

  admin: number;

  messages: Message[];

  constructor({
    id, name, admin, messages
  }: { id: number, name: string, admin: number, messages: Message[] }) {
    this.id = id;
    this.name = name;
    this.admin = admin;
    this.messages = messages.length
      ? messages.map((message) => {
        return new Message({
          id: message.id,
          content: message.content,
          conversationId: message.conversationId,
          userId: message.userId
        });
      })
      : [];
  }
}
