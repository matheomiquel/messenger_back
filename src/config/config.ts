import { env } from './envType'

const config: env = {
    development: {
        username: "root",
        password: "password",
        database: "messenger",
        host: "127.0.0.1",
        dialect: 'mysql',
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
        password: "password",
        database: "database_production",
        host: "127.0.0.1",
        dialect: "mysql",
        logging: false
    }
}

export { config }
