import { describe, expect, beforeEach } from '@jest/globals';
import { app } from '@src/app'
import request from "supertest";
import { UserHelper, reset, CreateConversationHelper, ConversationHelper } from '@test/helper';
import { endpointConversation, endpointUser } from "@controller/routes";
const userHelper = new UserHelper();
const createConversationHelper = new CreateConversationHelper();
const conversationHelper = new ConversationHelper()
beforeEach(async () => {
    await reset()
})

afterAll(async () => {
    await reset();
})
const userData = {
    name: "Matheo",
    email: "matheo.miquel@gmail.com",
    password: "password"
}

describe('user module', () => {
    describe('get all conversation from current user', () => {
        it('get all conversation from current user', async () => {
            const nbConversation = Math.floor(Math.random() * 10) + 1
            const user = await userHelper.register(userData)
            for (let i = 0; i < nbConversation; i++) {
                conversationHelper.create({ name: `conversation number ${i}`, token: user.body.token })
            }
            const conversation = await request(app)
                .get(`/${endpointUser}/conversations`)
                .set("Authorization", `Bearer ${user.body.token}`)
            expect(conversation.statusCode).toBe(200)
        })
    })
})