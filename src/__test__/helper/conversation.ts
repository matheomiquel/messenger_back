import { Express } from "express";
import request from "supertest";
export class ConversationHelper {
  private readonly app: Express;

  private readonly endpointConversation: string;

  constructor({ app, endpointConversation }: { app: Express, endpointConversation: string }) {
    this.app = app;
    this.endpointConversation = endpointConversation;
  }

  async create({ name, token }: { name: string, token: string }) {
    return request(this.app)
      .post(`/${this.endpointConversation}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        name
      });
  }
}
