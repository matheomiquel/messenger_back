import { describe, expect, test, beforeEach } from '@jest/globals';
import { app } from '@src/app'
import request, { agent } from "supertest";
import { UserModel, MessageModel } from '@src/data/sequelizeModel';
import { MessageHelper, UserHelper, CreateConversationHelper, reset } from '@test/helper';
import { endpointMessage } from "@controller/routes";
const userHelper = new UserHelper();
const messageHelper = new MessageHelper()
const createConversationHelper = new CreateConversationHelper()
const userData = {
    name: "Matheo",
    email: "matheo.miquel@gmail.com",
    password: "password"
}
const conversationData = {
    ...userData,
    userName: userData.name,
    conversationName: "i'm a conversation name"
}
const content = "i'm the test"
beforeEach(async () => {
    await reset()
})

afterAll(async () => {
    await reset();
})

describe('message module', () => {
    describe('create message', () => {
        it('create message', async () => {
            const { creator, conversation } = await createConversationHelper.create({ ...conversationData })
            const message = await messageHelper.create({ token: creator.body.token, content: content, conversationId: conversation.body.id })
            expect(message.statusCode).toEqual(200);
            expect(message.body.content).toEqual(content);
        });
        it('create message without token', async () => {
            const message = await request(app)
                .post(`/${endpointMessage}`)
                .send({
                    content
                })
            expect(message.statusCode).toEqual(401);
        });
    });
    describe('read message', () => {
        it("Shoul read message", async () => {
            const { creator, conversation } = await createConversationHelper.create({ ...conversationData })
            await messageHelper.create({ token: creator.body.token, content: content, conversationId: conversation.body.id })
            const newMessage = await messageHelper.read({ token: creator.body.token })
            expect(newMessage.status).toEqual(200)
            expect(newMessage.body[0].content).toEqual(content)
        })
    })
    describe('update message', () => {
        it("Shoul update message", async () => {
            const newContent = "i'm a new content"
            const { creator, conversation } = await createConversationHelper.create({ ...conversationData })
            const messageCreated = await messageHelper.create({ token: creator.body.token, content: content, conversationId: conversation.body.id })
            const message = await request(app)
                .put(`/${endpointMessage}/${messageCreated.body.id}`)
                .set("Authorization", `Bearer ${creator.body.token}`)
                .send({
                    content: newContent
                })
            expect(message.status).toEqual(204)
            const newMessage = await messageHelper.read({ token: creator.body.token })
            expect(newMessage.body[0].content).toEqual(newContent);
        })
        it("Try to update message without being the author", async () => {
            const { creator, conversation } = await createConversationHelper.create({ ...conversationData })
            const wrongUser = await userHelper.register({ ...userData, email: "wronguser@test.com" });
            const messageCreated = await messageHelper.create({ token: creator.body.token, content: content, conversationId: conversation.body.id })

            const message = await request(app)
                .put(`/${endpointMessage}/${messageCreated.body.id}`)
                .set("Authorization", `Bearer ${wrongUser.body.token}`)
                .send({
                    content,
                })
            expect(message.statusCode).toEqual(403);
        })
        it("Try to update message without token", async () => {
            const { creator, conversation } = await createConversationHelper.create({ ...conversationData })
            const messageCreated = await messageHelper.create({ token: creator.body.token, content: content, conversationId: conversation.body.id })
            const message = await request(app)
                .put(`/${endpointMessage}/${messageCreated.body.id}`)
                .send({
                    content
                })
            expect(message.statusCode).toEqual(401);
        })
    })
    describe('delete message', () => {
        it("Shoul delete message", async () => {
            const { creator, conversation } = await createConversationHelper.create({ ...conversationData })
            const messageCreated = await messageHelper.create({ token: creator.body.token, content: content, conversationId: conversation.body.id })
            const message = await request(app)
                .delete(`/${endpointMessage}/${messageCreated.body.id}`)
                .set("Authorization", `Bearer ${creator.body.token}`)
            expect(message.status).toEqual(204)
            const newMessage = await messageHelper.read({ token: creator.body.token })
            expect(newMessage.body.length).toEqual(0);
        })
        it("Try to delete message without being the author", async () => {
            const { creator, conversation } = await createConversationHelper.create({ ...conversationData })
            const messageCreated = await messageHelper.create({ token: creator.body.token, content: content, conversationId: conversation.body.id })
            const wrongUser = await userHelper.register({ ...userData, email: "wronguser@test.com" });
            const message = await request(app)
                .delete(`/${endpointMessage}/${messageCreated.body.id}`)
                .set("Authorization", `Bearer ${wrongUser.body.token}`)
            expect(message.statusCode).toEqual(403);
        })
        it("Try to update message without token", async () => {
            const { creator, conversation } = await createConversationHelper.create({ ...conversationData })
            const messageCreated = await messageHelper.create({ token: creator.body.token, content: content, conversationId: conversation.body.id })
            const message = await request(app)
                .delete(`/${endpointMessage}/${messageCreated.body.id}`)
            expect(message.statusCode).toEqual(401);
        })
    })
})