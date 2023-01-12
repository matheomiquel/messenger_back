import request from "supertest";
import { app } from '@src/app'
import { endpointMessage } from "@controller/routes";

export class MessageHelper {
    async create({ token, content, conversationId }: { token: string, content: string, conversationId: number }) {
        return request(app)
            .post(`/${endpointMessage}`)
            .set("Authorization", `Bearer ${token}`)
            .send({
                content,
                conversationId
            })
    }
    async read({ token }: { token: string }) {
        return request(app)
            .get(`/${endpointMessage}`)
            .set("Authorization", `Bearer ${token}`)
    }
}