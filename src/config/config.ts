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
    password: "root",
    database: "messenger_test",
    host: "127.0.0.1",
    dialect: "mysql",
    logging: false
  },
  production: {
    username: "root",
    password: "root",
    database: "database_production",
    host: "127.0.0.1",
    dialect: "mysql",
    logging: false
  }
};

export { config };
