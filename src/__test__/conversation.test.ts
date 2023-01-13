import { endpointConversation, endpointMessage, endpointUser } from "@controller/routes";
import {
  afterAll,
  beforeEach, describe, expect, it
} from "@jest/globals";
import { app } from "@src/app";
import {
  CreateConversationHelper, MessageHelper, MessageStory, reset, UserHelper
} from "@test/helper";
import request from "supertest";
const userHelper = new UserHelper({ app, endpointUser });
const createConversationHelper = new CreateConversationHelper({
  app, endpointConversation, endpointUser
});
const messageHelper = new MessageHelper({ app, endpointMessage });
const messageStory = new MessageStory({ createConversationHelper, messageHelper });
const firstUserData = {
  name: "Matheo",
  email: "matheo.miquel@gmail.com",
  password: "password"
};

const secondUserData = {
  name: "Matheo",
  email: "matheo.miquelsecond@gmail.com",
  password: "password"
};
const thirdUserData = {
  name: "Matheo",
  email: "matheo.miquelthird@gmail.com",
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
  describe("get conversation with user", () => {
    it("get conversation with all user inside", async () => {
      const { creator, conversation } = await createConversationHelper.create({
        ...firstUserData,
        ...conversationData,
        userName: firstUserData.name,
        conversationName: conversationData.name
      });
      const standardUser = await userHelper.register(secondUserData);
      await request(app)
        .post(`/${endpointConversation}/addUser`)
        .set("Authorization", `Bearer ${creator.body.token}`)
        .send({
          userId: standardUser.body.id,
          conversationId: conversation.body.id
        });
      const conversationWithUser = await request(app)
        .get(`/${endpointConversation}/user/${conversation.body.id}`)
        .set("Authorization", `Bearer ${creator.body.token}`);
      expect(conversationWithUser.statusCode).toBe(200);
      expect(conversationWithUser.body.users[1]).toMatchObject({
        id: standardUser.body.id,
        name: standardUser.body.name,
        email: standardUser.body.email
      });
    });
    it("get conversation with all user inside with user who is not in conversation.", async () => {
      const { conversation } = await createConversationHelper.create({
        ...firstUserData,
        ...conversationData,
        userName: firstUserData.name,
        conversationName: conversationData.name
      });
      const standardUser = await userHelper.register(secondUserData);
      const conversationWithUser = await request(app)
        .get(`/${endpointConversation}/user/${conversation.body.id}`)
        .set("Authorization", `Bearer ${standardUser.body.token}`);
      expect(conversationWithUser.statusCode).toBe(403);
    });
    it("get conversation with all user inside with bad conversation id.", async () => {
      await createConversationHelper.create({
        ...firstUserData,
        ...conversationData,
        userName: firstUserData.name,
        conversationName: conversationData.name
      });
      const standardUser = await userHelper.register(secondUserData);
      const conversationWithUser = await request(app)
        .get(`/${endpointConversation}/0`)
        .set("Authorization", `Bearer ${standardUser.body.token}`);
      expect(conversationWithUser.statusCode).toBe(404);
    });
  });

  describe("get conversation with message", () => {
    it("get conversation with message inside", async () => {
      const messageContent = "i'm a message";
      const { creator, conversation } = await messageStory.create({
        ...firstUserData,
        ...conversationData,
        userName: firstUserData.name,
        conversationName: conversationData.name,
        messageContent
      });
      const conversationWithMessage = await request(app)
        .get(`/${endpointConversation}/message/${conversation.body.id}`)
        .set("Authorization", `Bearer ${creator.body.token}`);
      expect(conversationWithMessage.statusCode).toBe(200);
      expect(conversationWithMessage.body).toMatchObject({
        id: conversation.body.id,
        name: conversationData.name,
        admin: creator.body.id,
        messages: [{
          id: conversationWithMessage.body.messages[0].id,
          content: messageContent
        }]
      });
    });
  });

  describe("add user to conversation", () => {
    it("add user to a conversation", async () => {
      const { creator, conversation } = await createConversationHelper.create({
        ...firstUserData,
        ...conversationData,
        userName: firstUserData.name,
        conversationName: conversationData.name
      });
      const standardUser = await userHelper.register(secondUserData);
      const addUser = await request(app)
        .post(`/${endpointConversation}/addUser`)
        .set("Authorization", `Bearer ${creator.body.token}`)
        .send({
          userId: standardUser.body.id,
          conversationId: conversation.body.id
        });
      expect(addUser.statusCode).toEqual(204);
    });
  });
  describe("add user to conversation", () => {
    it("add user to a conversation", async () => {
      const { creator, conversation } = await createConversationHelper.create({
        ...firstUserData,
        ...conversationData,
        userName: firstUserData.name,
        conversationName: conversationData.name
      });
      const standardUser = await userHelper.register(secondUserData);
      const addUser = await request(app)
        .post(`/${endpointConversation}/addUser`)
        .set("Authorization", `Bearer ${creator.body.token}`)
        .send({
          userId: standardUser.body.id,
          conversationId: conversation.body.id
        });
      expect(addUser.statusCode).toEqual(204);
    });
  });
  describe("remove user from conversation", () => {
    it("remove user from conversation with admin", async () => {
      const { creator, conversation } = await createConversationHelper.create({
        ...firstUserData,
        ...conversationData,
        userName: firstUserData.name,
        conversationName: conversationData.name
      });
      const standardUser = await userHelper.register(secondUserData);
      await request(app)
        .post(`/${endpointConversation}/addUser`)
        .set("Authorization", `Bearer ${creator.body.token}`)
        .send({
          userId: standardUser.body.id,
          conversationId: conversation.body.id
        });
      const removedUser = await request(app)
        .post(`/${endpointConversation}/removeUser`)
        .set("Authorization", `Bearer ${creator.body.token}`)
        .send({
          userId: standardUser.body.id,
          conversationId: conversation.body.id
        });
      expect(removedUser.status).toBe(204);
      const conversationWithUser = await request(app)
        .get(`/${endpointConversation}/user/${conversation.body.id}`)
        .set("Authorization", `Bearer ${creator.body.token}`);
      expect(conversationWithUser.status).toBe(200);
      expect(conversationWithUser.body.users.length).toBe(1);
    });
    it("quit conversation with user", async () => {
      const { creator, conversation } = await createConversationHelper.create({
        ...firstUserData,
        ...conversationData,
        userName: firstUserData.name,
        conversationName: conversationData.name
      });
      const standardUser = await userHelper.register(secondUserData);
      await request(app)
        .post(`/${endpointConversation}/addUser`)
        .set("Authorization", `Bearer ${creator.body.token}`)
        .send({
          userId: standardUser.body.id,
          conversationId: conversation.body.id
        });
      const removedUser = await request(app)
        .post(`/${endpointConversation}/removeUser`)
        .set("Authorization", `Bearer ${standardUser.body.token}`)
        .send({
          userId: standardUser.body.id,
          conversationId: conversation.body.id
        });
      expect(removedUser.status).toBe(204);
      const conversationWithUser = await request(app)
        .get(`/${endpointConversation}/user/${conversation.body.id}`)
        .set("Authorization", `Bearer ${creator.body.token}`);
      expect(conversationWithUser.status).toBe(200);
      expect(conversationWithUser.body.users.length).toBe(1);
    });
    it("remove another user from conversation without being admin, should return forbiden", async () => {
      const { creator, conversation } = await createConversationHelper.create({
        ...firstUserData,
        ...conversationData,
        userName: firstUserData.name,
        conversationName: conversationData.name
      });
      const standardUser = await userHelper.register(secondUserData);
      const secondStandardUser = await userHelper.register(thirdUserData);
      await request(app)
        .post(`/${endpointConversation}/addUser`)
        .set("Authorization", `Bearer ${creator.body.token}`)
        .send({
          userId: standardUser.body.id,
          conversationId: conversation.body.id
        });
      await request(app)
        .post(`/${endpointConversation}/addUser`)
        .set("Authorization", `Bearer ${creator.body.token}`)
        .send({
          userId: secondStandardUser.body.id,
          conversationId: conversation.body.id
        });
      const removedUser = await request(app)
        .post(`/${endpointConversation}/removeUser`)
        .set("Authorization", `Bearer ${secondStandardUser.body.token}`)
        .send({
          userId: standardUser.body.id,
          conversationId: conversation.body.id
        });
      expect(removedUser.status).toBe(403);
      const conversationWithUser = await request(app)
        .get(`/${endpointConversation}/user/${conversation.body.id}`)
        .set("Authorization", `Bearer ${creator.body.token}`);
      expect(conversationWithUser.status).toBe(200);
      expect(conversationWithUser.body.users.length).toBe(3);
    });
    it("remove another user from conversation without being in the conversation, should return forbiden", async () => {
      const { creator, conversation } = await createConversationHelper.create({
        ...firstUserData,
        ...conversationData,
        userName: firstUserData.name,
        conversationName: conversationData.name
      });
      const standardUser = await userHelper.register(secondUserData);
      const secondStandardUser = await userHelper.register(thirdUserData);
      await request(app)
        .post(`/${endpointConversation}/addUser`)
        .set("Authorization", `Bearer ${creator.body.token}`)
        .send({
          userId: standardUser.body.id,
          conversationId: conversation.body.id
        });
      const removedUser = await request(app)
        .post(`/${endpointConversation}/removeUser`)
        .set("Authorization", `Bearer ${secondStandardUser.body.token}`)
        .send({
          userId: standardUser.body.id,
          conversationId: conversation.body.id
        });
      expect(removedUser.status).toBe(403);
      const conversationWithUser = await request(app)
        .get(`/${endpointConversation}/user/${conversation.body.id}`)
        .set("Authorization", `Bearer ${creator.body.token}`);
      expect(conversationWithUser.status).toBe(200);
      expect(conversationWithUser.body.users.length).toBe(2);
    });
  });
});
