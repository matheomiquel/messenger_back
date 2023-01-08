import request, { agent } from "supertest";
import { app } from '@src/app'
agent(app);
export class UserHelper {
  async register({ name, email, password }: { name: string, email: string, password: string }) {
    return request(app)
      .post("/user/register")
      .send({
        name,
        email,
        password
      })
  }

  async login({ email, password }: { email: string, password: string }){
   
    return request(app)
      .post("/user/login")
      .send({
        email,
        password
      })
  }
  async getUserById({ token }: { token: string }){
    return request(app)
      .get("/user/")
      .set("Authorization", `Bearer ${token}`)
  }
}