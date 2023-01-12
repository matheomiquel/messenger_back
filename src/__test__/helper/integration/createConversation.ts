import { Express } from "express";
import request from "supertest";
export class CreateConversationHelper {
  private readonly app: Express;

  private readonly endpointUser: string;

  private readonly endpointConversation: string;

  constructor({ app, endpointUser, endpointConversation }:
    { app: Express, endpointUser: string, endpointConversation: string }) {
    this.app = app;
    this.endpointUser = endpointUser;
    this.endpointConversation = endpointConversation;
  }

  async create({
    userName, email, password, conversationName
  }:
    { userName: string, email: string, password: string, conversationName: string }) {
    const creator = await request(this.app)
      .post(`/${this.endpointUser}/register`)
      .send({
        name: userName,
        email,
        password
      });
    const conversation = await request(this.app)
      .post(`/${this.endpointConversation}`)
      .set("Authorization", `Bearer ${creator.body.token}`)
      .send({
        name: conversationName
      });
    return { creator, conversation };
  }
}
