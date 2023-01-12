import { Express } from "express";
import request from "supertest";
export class UserHelper {
  private readonly app: Express;

  private readonly endpointUser: string;

  constructor({ app, endpointUser }: { app: Express, endpointUser: string }) {
    this.app = app;
    this.endpointUser = endpointUser;
  }

  async register({ name, email, password }: { name: string, email: string, password: string }) {
    return request(this.app)
      .post(`/${this.endpointUser}/register`)
      .send({
        name,
        email,
        password
      });
  }

  async login({ email, password }: { email: string, password: string }) {
    return request(this.app)
      .post(`/${this.endpointUser}/login`)
      .send({
        email,
        password
      });
  }

  async getUserById({ token }: { token: string }) {
    return request(this.app)
      .get(`/${this.endpointUser}/`)
      .set("Authorization", `Bearer ${token}`);
  }
}
