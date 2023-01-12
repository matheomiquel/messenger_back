import request from "supertest";
import { app } from '@src/app'
import { endpointConversation, endpointUser } from "@controller/routes";
import { User, UserWithToken } from "@src/domain/model";
export class CreateConversationHelper {
    async create({ userName, email, password, conversationName }:
        { userName: string, email: string, password: string, conversationName: string }) {
        const creator = await request(app)
            .post(`/${endpointUser}/register`)
            .send({
                name: userName,
                email,
                password
            }) as any
        const conversation = await request(app)
            .post(`/${endpointConversation}`)
            .set("Authorization", `Bearer ${creator.body.token}`)
            .send({
                name: conversationName,
            }) as any
        return { creator, conversation }
    }
}