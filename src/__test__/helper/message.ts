import request from "supertest";
import { app } from '@src/app'
import { endpointMessage } from "@controller/routes";

export class MessageHelper {
    async create({ token, content }: { token: string, content: string }) {
        return request(app)
            .post(`/${endpointMessage}`)
            .set("Authorization", `Bearer ${token}`)
            .send({
                content
            })
    }
    async read({ token }: { token: string }) {
        return request(app)
            .get(`/${endpointMessage}`)
            .set("Authorization", `Bearer ${token}`)
    }
}