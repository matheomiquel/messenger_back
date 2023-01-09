import request from "supertest";
import { app } from '@src/app'
import { endpointUser } from "@controller/routes";
export class UserHelper {
  async register({ name, email, password }: { name: string, email: string, password: string }) {
    return request(app)
      .post(`/${endpointUser}/register`)
      .send({
        name,
        email,
        password
      })
  }

  async login({ email, password }: { email: string, password: string }){
   
    return request(app)
      .post(`/${endpointUser}/login`)
      .send({
        email,
        password
      })
  }
  async getUserById({ token }: { token: string }){
    return request(app)
      .get(`/${endpointUser}/`)
      .set("Authorization", `Bearer ${token}`)
  }
}