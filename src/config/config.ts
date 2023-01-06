import {env} from './envType'

const config:env = {
    development :  {
        username: "root",
        password: "password",
        database: "messenger",
        host: "127.0.0.1",
        dialect: 'mysql'
    },
    test: {
        username: "root",
        password: "password",
        database: "messenger_test",
        host: "127.0.0.1",
        dialect: "mysql" 
    },
    production: {
        username: "root",
        password: "password",
        database: "database_production",
        host: "127.0.0.1",
        dialect: "mysql",
    }
}

export { config }
