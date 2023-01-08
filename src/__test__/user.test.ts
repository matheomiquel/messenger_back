import { describe, expect, test, beforeEach } from '@jest/globals';
import { app } from '@src/app'
import request, { agent } from "supertest";
import { UserModel } from '@src/data/sequelizeModel';
import { UserHelper } from '@test/helper';
agent(app);
const userHelper = new UserHelper();
const userData = {
  name: "Matheo",
  email: "matheo.miquel@gmail.com",
  password: "password"
}
beforeEach(async () => {
  await UserModel.destroy({
    where: {},
    truncate: false
  });
})


describe('user module', () => {
  describe('get user', () => {
    it('get all users', async () => {
      const users = await request(app)
        .get("/user/getAll")
      expect(users.statusCode).toEqual(200);
      expect(users.body.length).toEqual(0)
    });
    it('get user by id', async () => {
      const createdUser = await userHelper.register(userData);
      const user = await request(app)
        .get(`/user/${createdUser.body.id}`)
      expect(user.statusCode).toEqual(200);
      expect(user.body.name).toEqual(userData.name)
      expect(user.body.email).toEqual(userData.email)
    });
  });


  describe('create user', () => {
    it('register user', async () => {
      const createdUser = await userHelper.register(userData);
      expect(createdUser.statusCode).toEqual(201);
      expect(createdUser.body.name).toEqual(userData.name)
      expect(createdUser.body.email).toEqual(userData.email)
      expect(createdUser.body.token).toBeDefined()
    });
    it('create 2 user with same email, should return conflict', async () => {
      await userHelper.register(userData);
      const createdUser = await userHelper.register(userData);
      expect(createdUser.statusCode).toEqual(409)
    })
    it('create  user with wrong email, should return bad request', async () => {
      const userWithBadEmail = {
        name: "Matheo",
        email: "matheo.miquelgmail.com",
        password: "password"
      }
      const createdUser = await userHelper.register(userWithBadEmail);
      expect(createdUser.statusCode).toEqual(400)
    })
  });
  describe('Login and get own information', () => {
    it('Should login', async () => {
      await userHelper.register(userData);
      const user = await userHelper.login(userData);
      expect(user.body.user.name).toEqual(userData.name)
      expect(user.body.user.email).toEqual(userData.email)
      expect(user.body.token).toBeDefined()
    })

    it('Should login and get own information', async () => {
      await userHelper.register(userData);
      const user = await userHelper.login(userData);
      const userByToken = await userHelper.getUserById({ token: user.body.token })
      expect(userByToken.status).toEqual(200)
      expect(userByToken.body.name).toEqual(userData.name)
      expect(userByToken.body.email).toEqual(userData.email)
    })
  })
})