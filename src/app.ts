import * as swaggerUI from 'swagger-ui-express';
import { config } from 'dotenv'
import cors from "cors";
import * as bodyParser from "body-parser";
import Express from 'express'
import { Request, Response } from 'express'
import { swaggerConfig } from './controller'
import { CreateRoute } from './controller'
import { UserService, MessageService } from './controller/services';
import { UserRoute, MessageRoute } from './controller/routes';
import { UserDomain, MessageDomain } from './domain/services';
import { UserData, MessageData } from './data/services';
import { CommonValidator, MessageValidator, UserValidator } from './controller/validator';

const app = Express()
app.use(cors());
app.use(bodyParser.json());
let path = ".env";
if (process.env.APP_ENV) {
    path = `${path}.${process.env.APP_ENV}`;
}

config({ path: path });
const PORT = process.env.PORT ?? 3000;

app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerConfig));
const createRoute = new CreateRoute({ app })

app.get('/health', async function (req: Request, res: Response) {
    res.status(204).send()
})

////////////////////////////////VALIDATOR/////////////////////////////////////////

const userValidator = new UserValidator();
const messageValidator = new MessageValidator()
const commonValidator = new CommonValidator()
////////////////////////////////DATA///////////////////////////////////////////////
const userProvider = new UserData()
const messageProvider = new MessageData()

////////////////////////////////DOMAIN/////////////////////////////////////////////
const userDomain = new UserDomain({ userProvider })
const messageDomain = new MessageDomain({ messageProvider })

////////////////////////////////CONTROLLER/////////////////////////////////////////

const userService = new UserService({ userDomain, userValidator })
const messageService = new MessageService({ messageDomain, userDomain, messageValidator, commonValidator })

new UserRoute({ createRoute, userService })
new MessageRoute({ createRoute, messageService })



app.all('*', async function (req: Request, res: Response) {
    res.status(404).send({
        message: 'route not found'
    })
})
if (process.env.NODE_ENV !== 'test') {
    app.listen(PORT, () => {
        console.log(`listen on port ${3000}`)
    })
}


export { app }