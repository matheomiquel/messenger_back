import { Message } from "@src/domain/model";
/* eslint-disable camelcase */
export class conversationWithMessageDB {
  id: number;

  name: string;

  admin: number;

  createdAt: Date;

  updatedAt: Date;

  conversation_messages: Message[];

  constructor({
    id, name, admin, createdAt, updatedAt, conversation_messages
  }:
    {
      id: number,
      name: string,
      admin: number,
      createdAt: Date,
      updatedAt: Date,
      conversation_messages: Message[]
    }) {
    this.id = id;
    this.name = name;
    this.admin = admin;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
    this.conversation_messages = conversation_messages;
  }
}
