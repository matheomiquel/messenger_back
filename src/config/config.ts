import { env } from "./envType";

const config: env = {
  development: {
    username: "root",
    password: "root",
    database: "messenger",
    host: "127.0.0.1",
    dialect: "mysql",
    logging: false
  },
  test: {
    username: "root",
    password: "password",
    database: "messenger_test",
    host: "127.0.0.1",
    dialect: "mysql",
    logging: false
  },
  production: {
    username: "root",
    password: "enNMNHWgOjyfoWF9ngQZ",
    database: "railway",
    host: "containers-us-west-27.railway.app",
    dialect: "mysql",
    port: 7071,
    logging: false
  }
};

export { config };
