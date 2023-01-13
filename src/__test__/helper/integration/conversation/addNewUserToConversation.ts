import { Express } from "express";
import request from "supertest";
export class AddNewUserToConversation {
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
    userName, email, password, conversationId
  }:
        { userName: string, email: string, password: string, conversationId: number }) {
    const user = await request(this.app)
      .post(`/${this.endpointUser}/register`)
      .send({
        name: userName,
        email,
        password
      });
    await request(this.app)
      .post(`/${this.endpointConversation}/addUser`)
      .set("Authorization", `Bearer ${user.body.token}`)
      .send({
        userId: user.body.id,
        conversationId: conversationId
      });
    return { user };
  }
}
