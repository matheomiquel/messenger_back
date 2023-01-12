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
const userData = {
  name: "Matheo",
  email: "matheo.miquel@gmail.com",
  password: "password"
};
const conversationData = {
  name: "Conversation name"
};
beforeEach(async () => {
  await reset();
});

afterAll(async () => {
  await reset();
});

describe("conversation module", () => {
  describe("create conversation", () => {
    it("create conversation", async () => {
      const createdUser = await userHelper.register(userData);
      const createdConversation = await conversationHelper.create({
        ...conversationData, token: createdUser.body.token
      });
      expect(createdConversation.statusCode).toEqual(201);
      expect(createdConversation.body.name);
      expect(createdConversation.body).toMatchObject(
        expect.objectContaining(conversationData)
      );
    });
  });

  describe("read conversation", () => {
    it("read all conversation", async () => {
      const createdUser = await userHelper.register(userData);
      await conversationHelper.create({ ...conversationData, token: createdUser.body.token });
      const conversation = await request(app)
        .get(`/${endpointConversation}`)
        .set("Authorization", `Bearer ${createdUser.body.token}`);
      expect(conversation.statusCode).toEqual(200);
      expect(Array.isArray(conversation.body)).toBe(true);
      expect(conversation.body[0]).toMatchObject({
        name: conversationData.name,
        admin: createdUser.body.id
      });
    });
  });
  describe("update conversation", () => {
    it("update conversation with admin of the conversation", async () => {
      const updatedName = "update conversation name";
      const createdUser = await userHelper.register(userData);
      const conversationCreated = await conversationHelper.create({
        ...conversationData, token: createdUser.body.token
      });
      const updatedConversation = await request(app)
        .put(`/${endpointConversation}/${conversationCreated.body.id}`)
        .set("Authorization", `Bearer ${createdUser.body.token}`)
        .send({
          name: updatedName
        });
      expect(updatedConversation.statusCode).toEqual(204);
      const conversation = await request(app)
        .get(`/${endpointConversation}`)
        .set("Authorization", `Bearer ${createdUser.body.token}`);
      expect(conversation.body[0]).toMatchObject({
        name: updatedName,
        admin: createdUser.body.id
      });
    });
    it("update conversation without admin of the conversation", async () => {
      const updatedName = "update conversation name";
      const createdUser = await userHelper.register(userData);
      const createdotherUser = await userHelper.register({ ...userData, email: "notAdmin@gmail.com" });
      const conversationCreated = await conversationHelper.create({
        ...conversationData, token: createdUser.body.token
      });
      const updatedConversation = await request(app)
        .put(`/${endpointConversation}/${conversationCreated.body.id}`)
        .set("Authorization", `Bearer ${createdotherUser.body.token}`)
        .send({
          name: updatedName
        });
      expect(updatedConversation.statusCode).toEqual(403);
    });
  });
  describe("delete conversation", () => {
    it("delete conversation with admin of the conversation", async () => {
      const createdUser = await userHelper.register(userData);
      const conversationCreated = await conversationHelper.create({
        ...conversationData, token: createdUser.body.token
      });
      const deletedConversation = await request(app)
        .delete(`/${endpointConversation}/${conversationCreated.body.id}`)
        .set("Authorization", `Bearer ${createdUser.body.token}`);
      expect(deletedConversation.statusCode).toEqual(204);
      const conversation = await request(app)
        .get(`/${endpointConversation}`)
        .set("Authorization", `Bearer ${createdUser.body.token}`);
      expect(Array.isArray(conversation.body)).toBe(true);
      expect(conversation.body.length).toBe(0);
    });
    it("update conversation without admin of the conversation", async () => {
      const updatedName = "update conversation name";
      const createdUser = await userHelper.register(userData);
      const createdotherUser = await userHelper.register({ ...userData, email: "notAdmin@gmail.com" });
      const conversationCreated = await conversationHelper.create({
        ...conversationData, token: createdUser.body.token
      });
      const deletedConversation = await request(app)
        .delete(`/${endpointConversation}/${conversationCreated.body.id}`)
        .set("Authorization", `Bearer ${createdotherUser.body.token}`)
        .send({
          name: updatedName
        });
      expect(deletedConversation.statusCode).toEqual(403);
      const conversation = await request(app)
        .get(`/${endpointConversation}`)
        .set("Authorization", `Bearer ${createdUser.body.token}`);
      expect(Array.isArray(conversation.body)).toBe(true);
      expect(conversation.body.length).toBe(1);
    });
  });
});
