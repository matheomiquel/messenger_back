import request from "supertest";
import { app } from '@src/app'
import { endpointConversation } from "@controller/routes";
export class ConversationHelper {
    async create({ name, token }: { name: string, token: string }) {
        return request(app)
            .post(`/${endpointConversation}`)
            .set("Authorization", `Bearer ${token}`)
            .send({
                name,
            })
    }
}