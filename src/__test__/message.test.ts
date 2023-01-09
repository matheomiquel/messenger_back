import { describe, expect, test, beforeEach } from '@jest/globals';
import { app } from '@src/app'
import request, { agent } from "supertest";
import { UserModel, MessageModel } from '@src/data/sequelizeModel';
import { MessageHelper, UserHelper } from '@test/helper';
import { endpointMessage } from "@controller/routes";
const userHelper = new UserHelper();
const messageHelper = new MessageHelper()
const userData = {
    name: "Matheo",
    email: "matheo.miquel@gmail.com",
    password: "password"
}
const content = "i'm the test"
beforeEach(async () => {
    await UserModel.destroy({
        where: {},
        truncate: false
    });
    await MessageModel.destroy({
        where: {},
        truncate: false
    });
})


describe('message module', () => {
    describe('create message', () => {
        it('create message', async () => {
            const createdUser = await userHelper.register(userData);
            const message = await messageHelper.create({ token: createdUser.body.token, content: content })
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
            const createdUser = await userHelper.register(userData);
            await messageHelper.create({ token: createdUser.body.token, content: content })
            const newMessage = await messageHelper.read({ token: createdUser.body.token })
            expect(newMessage.status).toEqual(200)
            expect(newMessage.body[0].content).toEqual(content)
        })
    })
    describe('update message', () => {
        it("Shoul update message", async () => {
            const newContent = "i'm a new content"
            const createdUser = await userHelper.register(userData);
            const messageCreated = await messageHelper.create({ token: createdUser.body.token, content: content })
            const message = await request(app)
                .put(`/${endpointMessage}/${messageCreated.body.id}`)
                .set("Authorization", `Bearer ${createdUser.body.token}`)
                .send({
                    content: newContent
                })
            expect(message.status).toEqual(204)
            const newMessage = await messageHelper.read({ token: createdUser.body.token })
            expect(newMessage.body[0].content).toEqual(newContent);
        })
        it("Try to update message without being the author", async () => {
            const createdUser = await userHelper.register(userData);
            const wrongUser = await userHelper.register({ ...userData, email: "wronguser@test.com" });
            const messageCreated = await messageHelper.create({ token: createdUser.body.token, content: content })
            const message = await request(app)
                .put(`/${endpointMessage}/${messageCreated.body.id}`)
                .set("Authorization", `Bearer ${wrongUser.body.token}`)
                .send({
                    content
                })
            expect(message.statusCode).toEqual(403);
        })
        it("Try to update message without token", async () => {
            const createdUser = await userHelper.register(userData);
            const messageCreated = await messageHelper.create({ token: createdUser.body.token, content: content })
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
            const createdUser = await userHelper.register(userData);
            const messageCreated = await messageHelper.create({ token: createdUser.body.token, content: content })
            const message = await request(app)
                .delete(`/${endpointMessage}/${messageCreated.body.id}`)
                .set("Authorization", `Bearer ${createdUser.body.token}`)
            expect(message.status).toEqual(204)
            const newMessage = await messageHelper.read({ token: createdUser.body.token })
            expect(newMessage.body.length).toEqual(0);
        })
        it("Try to delete message without being the author", async () => {
            const createdUser = await userHelper.register(userData);
            const wrongUser = await userHelper.register({ ...userData, email: "wronguser@test.com" });
            const messageCreated = await messageHelper.create({ token: createdUser.body.token, content: content })
            const message = await request(app)
                .delete(`/${endpointMessage}/${messageCreated.body.id}`)
                .set("Authorization", `Bearer ${wrongUser.body.token}`)
            expect(message.statusCode).toEqual(403);
        })
        it("Try to update message without token", async () => {
            const createdUser = await userHelper.register(userData);
            const messageCreated = await messageHelper.create({ token: createdUser.body.token, content: content })
            const message = await request(app)
                .delete(`/${endpointMessage}/${messageCreated.body.id}`)
            expect(message.statusCode).toEqual(401);
        })
    })
})