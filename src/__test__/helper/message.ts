import { Express } from "express";
import request from "supertest";

export class MessageHelper {
  private readonly app: Express;

  private readonly endpointMessage: string;

  constructor({ app, endpointMessage }: { app: Express, endpointMessage: string }) {
    this.app = app;
    this.endpointMessage = endpointMessage;
  }

  async create({ token, content, conversationId }:
    { token: string, content: string, conversationId: number }) {
    return request(this.app)
      .post(`/${this.endpointMessage}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        content,
        conversationId
      });
  }

  async read({ token }: { token: string }) {
    return request(this.app)
      .get(`/${this.endpointMessage}`)
      .set("Authorization", `Bearer ${token}`);
  }
}
