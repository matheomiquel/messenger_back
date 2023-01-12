/* eslint-disable no-await-in-loop */
import { endpointConversation, endpointUser } from "@controller/routes";
import {
  afterAll,
  beforeEach, describe, expect, it
} from "@jest/globals";
import { app } from "@src/app";
import { ConversationHelper, reset, UserHelper } from "@test/helper";
import request from "supertest";
const userHelper = new UserHelper({ app, endpointUser });
const conversationHelper = new ConversationHelper({ app, endpointConversation });
beforeEach(async () => {
  await reset();
});

afterAll(async () => {
  await reset();
});
const userData = {
  name: "Matheo",
  email: "matheo.miquel@gmail.com",
  password: "password"
};

describe("user module", () => {
  describe("get all conversation from current user", () => {
    it("get all conversation from current user", async () => {
      const nbConversation = Math.floor(Math.random() * 10) + 1;
      const user = await userHelper.register(userData);
      for (let i = 0; i < nbConversation; i += 1) {
        await conversationHelper.create({ name: `conversation number ${i}`, token: user.body.token });
      }
      const conversation = await request(app)
        .get(`/${endpointUser}/conversations`)
        .set("Authorization", `Bearer ${user.body.token}`);
      expect(conversation.statusCode).toBe(200);
      expect(Array.isArray(conversation.body)).toBe(true);
      expect(conversation.body.length).toBe(nbConversation);
    });
  });
});
